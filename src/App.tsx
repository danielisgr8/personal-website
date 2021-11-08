import { ReactNode, useEffect, useState } from "react";

import Column from "./Column";
import { generatePaths, scalePath } from "./path";
import { Title, titles } from "./constants";

import "./styles.css";
import Contact from "./pages/Contact";

const placeholderText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rhoncus nisi sed orci porttitor auctor. Suspendisse tempus eget sapien fermentum elementum. In ut luctus tortor. Aenean faucibus risus odio. Vivamus in viverra lorem, a gravida odio. Proin et rhoncus tortor. Integer feugiat urna sem, vitae molestie tellus posuere vitae. Nullam justo nisi, ultricies facilisis malesuada et, sollicitudin sit amet dolor. Cras id scelerisque orci, in aliquet neque. In nunc libero, tincidunt nec eros quis, laoreet dignissim metus. Curabitur aliquet lectus aliquet orci ornare, eu vulputate nisi dapibus. Sed ut tempus elit, at tempus quam. Suspendisse et malesuada ante. Donec auctor placerat ipsum non dictum. Morbi scelerisque erat sed porttitor mollis.

Etiam sagittis, diam fermentum euismod hendrerit, lorem felis hendrerit lacus, in fermentum felis ante non enim. Cras sed sem justo. Proin metus ipsum, accumsan auctor felis nec, viverra pellentesque odio. Phasellus nulla nisi, semper at bibendum et, venenatis cursus eros. Mauris porttitor tincidunt sollicitudin. Mauris odio massa, ultricies quis nisi sit amet, ullamcorper pharetra sapien. Sed sed iaculis odio. Donec ante dolor, aliquet at neque ac, egestas tincidunt ligula.

Sed aliquam ligula nunc, nec suscipit ex consequat eu. Curabitur est augue, hendrerit id ipsum id, porta pretium turpis. Vestibulum dapibus.
`.trim();

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
      return <p>{placeholderText}</p>
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
    <div className="App">
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

      {
        selectedItem && (
          <div className="modal" style={{ flexDirection: smallScreen ? "column" : "row"}}>
            <Column
              text={selectedItem}
              topPath={smallScreen ? scalePath(topPath, 0.25) : topPath}
              leftPath={smallScreen ? scalePath(leftPath, 7) : new Array(repeatCount).fill(0)}
              marginRight="random"
              floating
              onClick={() => setSelectedItem(null)}
            />
            {columnTitleToNode(selectedItem, smallScreen)}
          </div>
        )
      }
    </div>
  );
}
