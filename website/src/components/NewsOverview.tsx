import { useEffect, useRef, useState } from "react";
import { getRequest } from "../utils/fetchhelper";
import { CardContent, CardsContainer, Centered, ClickableCard } from "../utils/styled";
import { ArticlesForDay } from "./ArticlesForDay";

export interface INewsDay {
  date: Date;
  originalName: string;
}
export const NewsOverview = () => {
  const [newsDays, setNewsDays] = useState<INewsDay[]>([]);
  const [clickedDay, setClickedDay] = useState<string>("");
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  let showOverview = true;
  let showDay = false;
  let currentDay = undefined;
  if (clickedDay) {
    if (newsDays.find((x) => x.originalName === clickedDay) !== undefined) {
      showDay = true;
      showOverview = false;
      currentDay = newsDays.find((x) => x.originalName === clickedDay);
    }
  }
  useEffect(() => {
    if (cardsContainerRef) {
      const wrapper = cardsContainerRef.current;

      wrapper?.addEventListener("mousemove", function (e) {
        const event = e as MouseEvent;
        wrapper.childNodes.forEach((c) => {
          const card = c as HTMLElement;
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          card.style.setProperty("--xPos", `${x}px`);
          card.style.setProperty("--yPos", `${y}px`);
        });
      });
    }
  }, [showOverview, newsDays, cardsContainerRef]);

  useEffect(() => {
    getRequest<{ folders: string[] }>("https://l4b0mb4.github.io/SummarizR/index.json").then((res) => {
      const foldersAsDates = res.folders
        .map((item) => {
          const year = item.substring(0, 4);
          const month = item.substring(4, 6);
          const day = item.substring(6);
          const d = new Date();
          d.setFullYear(parseInt(year));
          d.setMonth(parseInt(month) - 1);
          d.setDate(parseInt(day));
          return { date: d, originalName: item };
        })
        .sort((a, b) => b.date.getTime() - a.date.getTime());
      setNewsDays(foldersAsDates);
    });
  }, []);

  if (showOverview)
    return (
      <CardsContainer ref={cardsContainerRef}>
        {newsDays.map((newsDay) => {
          return (
            <ClickableCard className="card" onClick={() => setClickedDay(newsDay.originalName)}>
              <CardContent className="card-content" key={newsDay.originalName}>
                <Centered>
                  <h1>{newsDay.date.toLocaleDateString()}</h1>
                </Centered>
              </CardContent>
            </ClickableCard>
          );
        })}
      </CardsContainer>
    );
  if (showDay) {
    return <ArticlesForDay setClickedDay={setClickedDay} newsDay={currentDay!} />;
  } else {
    return <div> unkown state</div>;
  }
};
