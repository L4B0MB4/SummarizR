import { ChatGPTAPI } from "chatgpt";
import { scrapeTodaysSpiegelHeadlines } from "./scrape.mjs";
import { htmlGeneration, htmlGenerationIndex } from "./htmlgenerator.mjs";
import { buildWebsite } from "./buildwebsite.mjs";
import fs from "fs";
import crypto from "crypto";
import dotenv from "dotenv";
import { exec } from "node:child_process";
import path from "path";
import { fileURLToPath } from "url";

const summerizeArticles = async () => {
  dotenv.config();
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename); //https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const scrapeRes = await scrapeTodaysSpiegelHeadlines();
  for (let i = 0; i < scrapeRes.articlesWithContents.length; i++) {
    const article = scrapeRes.articlesWithContents[i];
    const urlHash = crypto.createHash("sha256").update(article.url).digest("hex");
    const dir = `${__dirname}/../content/${scrapeRes.date}`;
    const fullArticlePath = `${dir}/${urlHash}.json`;
    if (!fs.existsSync(fullArticlePath)) {
      try {
        console.log("requesting tldr");
        const res = await api.sendMessage(`Zusammenfassung deutsch mehr als 400 Zeichen: ${article.content}
`);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        const metaInformation = {
          summary: res.text,
          originalUrl: article.url,
        };
        fs.writeFileSync(fullArticlePath, JSON.stringify(metaInformation));
      } catch (ex) {
        console.error(ex);
      }
    }
  }
  htmlGeneration(__dirname, scrapeRes.date);
  htmlGenerationIndex(__dirname);
  await buildWebsite(__dirname);
  exec(
    `rm -f ./.git/index.lock && git config --global user.name "L4B0MB4" && git config --global user.email "L4B0MB4" ` +
      `&&  git add --all && git commit -m "Adding or updating ${scrapeRes.date}" && git push https://L4B0MB4:${process.env.GITHUB_TOKEN}@github.com/L4B0MB4/SummarizR.git`,
    (error, stdout, stderr) => {
      console.log("error:" + error);
      console.log("stderr:" + stderr);
      console.log("stdout:" + stdout);
    }
  );
};
summerizeArticles();
