import { JSDOM } from "jsdom";

export const scrapeTodaysSpiegelHeadlines = async () => {
  var text = await (await fetch("https://www.spiegel.de/schlagzeilen/")).text();
  var document = new JSDOM(text).window.document;
  const articlesToday = await getArticles(document);
  return articlesToday;
};

const getArticles = async (document: Document) => {
  const todaysArticles = document
    .getElementsByTagName("main")
    .item(0)
    ?.querySelector(`section[data-area="article-teaser-list"]`);
  const todaysDateStr = todaysArticles?.getElementsByTagName("h2").item(0)?.textContent!;
  const todaysDate = new Date(Date.parse(todaysDateStr));
  console.log(todaysDate.getTime());
  console.log(Date.parse(todaysDateStr));
  const articles = todaysArticles?.getElementsByTagName("article")!;
  const articlePromises: Array<Promise<IArticleContent>> = [];
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    if (article.querySelector(`[data-contains-flags="Spplus-paid"]`) == null) {
      articlePromises.push(
        getArticleContent(
          article.getElementsByTagName("header").item(0)?.getElementsByTagName("a").item(0)?.getAttribute("href")!
        )
      );
      break;
    }
  }
  const articlesWithContents = await Promise.all(articlePromises);
  return { articlesWithContents, date: todaysDate.getTime() };
};

interface IArticleContent {
  url: string;
  content: string;
}
const getArticleContent = async (articleUrl: string): Promise<IArticleContent> => {
  console.log("---- new article ----");
  console.log(articleUrl);
  const text = await (await fetch(articleUrl)).text();
  const document = new JSDOM(text).window.document;
  const article = document.getElementsByTagName("main").item(0)?.getElementsByTagName("article").item(0)!;
  //RichText
  const richTextelements = article.getElementsByClassName("RichText");
  let articleContent = "";
  for (let i = 0; i < richTextelements.length; i++) {
    const richTextelement = richTextelements[i];
    articleContent += richTextelement.textContent!;
  }
  articleContent = articleContent.replaceAll("\n", " ");
  return { url: articleUrl, content: articleContent };
};
