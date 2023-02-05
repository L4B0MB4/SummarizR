import { useEffect, useState } from "react";
import { getRequest } from "../utils/fetchhelper";
import { CardContent, Centered, Clickable, DefaultPadding, NavbarClickable } from "../utils/styled";
import { INewsDay } from "./NewsOverview";

export interface IArticlesForDayProps {
  setClickedDay: (d: string) => void;
  newsDay: INewsDay;
}

interface IArticle {
  summary: string;
  originalUrl: string;
}

export const ArticlesForDay = ({ setClickedDay, newsDay }: IArticlesForDayProps) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    getRequest<{ articles: IArticle[] }>("https://l4b0mb4.github.io/SummarizR/" + newsDay.originalName + ".json").then(
      (res) => {
        setArticles(res.articles);
      }
    );
  }, [newsDay.originalName]);
  return (
    <div>
      <NavbarClickable onClick={() => setClickedDay("")}>
        <Centered>
          <h4>←back</h4>
        </Centered>
      </NavbarClickable>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        {articles.map((article) => {
          return (
            <Clickable key={article.originalUrl}>
              <CardContent>
                <Centered>
                  <DefaultPadding>
                    <p>
                      <span>{article.summary}</span>
                    </p>
                    <p>
                      <a href={article.originalUrl}>Hier gehts zur Quelle</a>
                    </p>
                  </DefaultPadding>
                </Centered>
              </CardContent>
              <br />
              <br />
            </Clickable>
          );
        })}
      </div>
    </div>
  );
};
