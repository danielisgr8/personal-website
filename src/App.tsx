import { ReactNode, useEffect, useState } from "react";

import Column from "./Column";
import { generatePaths, scalePath } from "./path";
import { Title, titles } from "./constants";

import "./styles.css";
import Contact from "./sections/Contact";

const limits = {
  top: {
    min: 10,
    max: 40
  },
  left: {
    min: 5,
    max: 25
  }
};
const repeatCount = 100;

const mql = window.matchMedia('(max-width: 600px)');

const columnTitleToNode = (title: Title, smallScreen: boolean): ReactNode => {
  switch (title) {
    case Title.Aws:
      return <p>AWS</p>
    case Title.Personal:
      return <p>Personal</p>
    case Title.Contact:
      return <Contact smallScreen={smallScreen} />
    default:
      return <p>{title}</p>
  }
};

export default function App() {
  const [[topPath, leftPath]] = useState(() =>
    generatePaths(limits, repeatCount)
  );
  const [selectedItem, setSelectedItem] = useState<Title | null>(null);
  const [smallScreen, setSmallScreen] = useState(mql.matches);

  useEffect(() => {
    const onMqlChange = (event: MediaQueryListEvent) => {
      setSmallScreen(event.matches);
    };
    mql.addEventListener("change", onMqlChange);
    return () => {
      mql.removeEventListener("change", onMqlChange);
    }
  }, []);

  return (
    <div className="app">
      <h3 className="header">Daniel Schubert</h3>
      <div className="content">
        {(titles).map((title, i) => (
          <Column
            key={i}
            text={title}
            topPath={topPath}
            leftPath={leftPath}
            marginRight="random"
            visible={selectedItem === null}
            onClick={() => setSelectedItem(title)}
          />
        ))}

        {/* TODO: use History API to have routing (e.g. danielschubert.dev/contact) */}
        {/* TODO: animate selected item moving to the left, then render this (should line up exactly) */}
        {
          selectedItem && (
            <div className="modal">
              <h3 className="header">Daniel Schubert</h3>

              <div style={{ display: "flex", flexDirection: smallScreen ? "column" : "row"}}>
                <Column
                  text={selectedItem}
                  topPath={smallScreen ? scalePath(topPath, 0.25) : topPath}
                  leftPath={smallScreen ? scalePath(leftPath, 7) : new Array(repeatCount).fill(0)}
                  marginRight="random"
                  onClick={() => setSelectedItem(null)}
                />

                {columnTitleToNode(selectedItem, smallScreen)}
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
