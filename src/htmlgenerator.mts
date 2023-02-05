import { IArticleContent } from "./scrape.mjs";
import fs from "fs";

const escapeHTML = (str) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[tag])
  );
export const htmlGeneration = (dir: string, dateStr: string) => {
  const articles: string[] = [];
  const testFolder = dir + "/../content/" + dateStr;
  fs.readdirSync(testFolder).forEach((file) => {
    articles.push(fs.readFileSync(testFolder + "/" + file).toString());
  });

  const articlesHtml = articles.map((item) => `<li>${escapeHTML(item)}</li></br>`).join(" ");
  const html = `<div> <h1>${dateStr}</h1>
    <ul>
   ${articlesHtml}
    </ul>
    </div>`;
  const file = dir + "/../docs/" + dateStr + ".html";

  fs.writeFileSync(file, html);

  const articleFile = dir + "/../docs/" + dateStr + ".json";

  const articleInfos = {
    articles: [],
  };
  articles.forEach((article) => {
    try {
      const json = JSON.parse(article) as { summary: string; originalUrl: string };
      articleInfos.articles.push(json);
    } catch (ex) {
      console.error("couldnt parse json from summary");
    }
  });

  fs.writeFileSync(articleFile, JSON.stringify(articleInfos));
};

export const htmlGenerationIndex = (dir: string) => {
  const testFolder = dir + "/../content/";
  let files: string[] = [];
  fs.readdirSync(testFolder).forEach((file) => {
    files.push(file);
    console.log(file, new Date(parseInt(file)).toLocaleDateString());
  });
  files = files.filter((x) => x !== "file");
  console.log(files);
  const filesHtml = files.map((item) => `<li><a href="./${item}.html">${escapeHTML(item)}</a></li></br>`).join(" ");
  const html = `<div>
      <ul>
     ${filesHtml}
      </ul>
      </div>`;
  const file = dir + "/../docs/index.html";

  fs.writeFileSync(file, html);

  const metaFile = dir + "/../docs/index.json";
  const metaInfo = {
    folders: files,
  };
  fs.writeFileSync(metaFile, JSON.stringify(metaInfo));
};
