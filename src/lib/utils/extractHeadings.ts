export type ExtractedHeading = {
    id: string;
    text: string;
    level: 2 | 3;
  };
  
  function slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/<[^>]*>/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  
  /**
   * Walks HTML content, injects id="..." into every <h2>/<h3> tag (slugified
   * from its text, de-duplicated if needed), and returns both the augmented
   * HTML and a flat list of headings for building a Table of Contents.
   */
  export function extractHeadings(html: string): {
    html: string;
    headings: ExtractedHeading[];
  } {
    const headings: ExtractedHeading[] = [];
    const usedSlugs = new Set<string>();
  
    const augmented = html.replace(
      /<(h2|h3)([^>]*)>(.*?)<\/\1>/gi,
      (match, tag, attrs, innerHtml) => {
        const level = tag.toLowerCase() === "h2" ? 2 : 3;
        const text = innerHtml.replace(/<[^>]*>/g, "").trim();
  
        if (!text) return match;
  
        let slug = slugify(text) || `section-${headings.length + 1}`;
        let unique = slug;
        let i = 2;
        while (usedSlugs.has(unique)) {
          unique = `${slug}-${i}`;
          i++;
        }
        usedSlugs.add(unique);
  
        headings.push({ id: unique, text, level });
  
        // Strip any pre-existing id attribute, then inject ours
        const cleanedAttrs = attrs.replace(/\sid="[^"]*"/i, "");
        return `<${tag}${cleanedAttrs} id="${unique}">${innerHtml}</${tag}>`;
      }
    );
  
    return { html: augmented, headings };
  }