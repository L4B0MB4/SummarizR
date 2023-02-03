import { ChatGPTAPI } from "chatgpt";
import { scrapeTodaysSpiegelHeadlines } from "./scrape.mjs";
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
  /*   const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  }); */

  const scrapeRes = await scrapeTodaysSpiegelHeadlines();
  console.log("requesting tldr");

  for (let i = 0; i < scrapeRes.articlesWithContents.length; i++) {
    const article = scrapeRes.articlesWithContents[i];
    const urlHash = crypto.createHash("sha256").update(article.url).digest("hex");
    const dir = `${__dirname}/../content/${scrapeRes.date}`;
    const fullArticlePath = `${dir}/${urlHash}`;
    if (!fs.existsSync(fullArticlePath)) {
      /*   const res = await api.sendMessage(`Zusammenfassung deutsch mehr als 400 Zeichen: ${article.content}
`); */
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      fs.writeFileSync(fullArticlePath, /* res.text + "\n\n\n" +  */ "summariz");
      break;
    }
  }
  exec(
    `git add --all & git commit -m "Adding or updating ${new Date(scrapeRes.date).toDateString()} - ${
      scrapeRes.date
    } && git push https://${process.env.GITHUB_TOKEN}@github.com/L4B0MB4/SummarizR.git`,
    (error, stdout, stderr) => {
      console.log("error:" + error);
      console.log("stderr:" + stderr);
      console.log("stdout:" + stdout);
    }
  );
};
summerizeArticles();
