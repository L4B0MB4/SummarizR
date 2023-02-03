import { ChatGPTAPI } from "chatgpt";
import { scrapeTodaysSpiegelHeadlines } from "./scrape.mjs";
import fs from "fs";
import crypto from "crypto";
import dotenv from "dotenv";
import { exec } from "node:child_process";

const summerizeArticles = async () => {
  dotenv.config();
  /*   const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  }); */

  const scrapeRes = await scrapeTodaysSpiegelHeadlines();
  console.log("requesting tldr");
  /* const res = await api.sendMessage(`TLDR in deutsch mit mehr als 300 Zeichen - Abitur: ${articles[0].content}
`); */
  for (let i = 0; i < scrapeRes.articlesWithContents.length; i++) {
    const article = scrapeRes.articlesWithContents[i];
    const dir = `./content/${scrapeRes.date}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const hash = crypto.createHash("sha256").update(article.url).digest("hex");
    fs.writeFileSync(`${dir}/${hash}`, "my text");
  }
  exec(
    `git add --all & git commit -m "Adding or updating ${new Date(scrapeRes.date).toDateString()} - ${scrapeRes.date}"`
  );
};
summerizeArticles();
