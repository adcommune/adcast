const cheerio = require("cheerio");

const imageContentTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/bmp",
  "image/vnd.microsoft.icon",
  "image/tiff",
  "image/x-icon",
  "image/x-jng",
  "image/x-ms-bmp",
  "image/x-portable-bitmap",
  "image/x-windows-bmp",
  "image/x-xbitmap",
];

export type ContentType = "image" | "web";

export async function fetchContentType(
  url: string
): Promise<{ type: ContentType }> {
  const res = await fetch(url, { method: "HEAD" });

  const contentType = res.headers.get("content-type");

  if (contentType) {
    if (imageContentTypes.includes(contentType)) {
      return { type: "image" };
    } else if (contentType.startsWith("text/html")) {
      return { type: "web" };
    }
  }

  return { type: "web" };
}

export async function fetchMetaTags(
  url: string
): Promise<Record<string, string>> {
  const res = await fetch(url).then((res) => res.text());

  console.log(res);

  const $ = cheerio.load(res);

  return {
    title: $('meta[property="og:title"]').attr("content") || $("title").text(),
    description:
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content"),
    image: $('meta[property="og:image"]').attr("content"),
    video:
      $('meta[property="og:video"]').attr("content") ||
      $('meta[property="og:video:url"]').attr("content"),
    type: $('meta[property="og:type"]').attr("content"),
  };
}
