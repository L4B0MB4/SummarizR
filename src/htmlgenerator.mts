import { IArticleContent } from "./scrape.mjs";
import fs from "fs";
export const htmlGeneration = (dir: string, dateStr: string) => {
  const articles: string[] = [];
  const testFolder = dir + "/../content/" + dateStr;
  fs.readdirSync(testFolder).forEach((file) => {
    articles.push(fs.readFileSync(testFolder + "/" + file).toString());
  });

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

  const metaFile = dir + "/../docs/index.json";
  const metaInfo = {
    folders: files,
  };
  fs.writeFileSync(metaFile, JSON.stringify(metaInfo));
};
