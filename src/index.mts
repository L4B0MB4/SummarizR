import { ChatGPTAPI } from "chatgpt";
import { scrapeTodaysSpiegelHeadlines } from "./scrape.mjs";

const summerizeArticles = async () => {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const articles = await scrapeTodaysSpiegelHeadlines();
  console.log("requesting tldr");
  const res = await api.sendMessage(`TLDR in deutsch mit mehr als 300 Zeichen - Abitur: ${articles[0].content}
`);
  console.log(res.text);
};
summerizeArticles();
