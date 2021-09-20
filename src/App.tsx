import { useState } from "react";

import Column from "./Column";
import { generatePaths } from "./path";

import data from "./data.json";

import "./styles.css";

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

interface ColumnData {
  title: string;
  notes: Array<string>
}

export default function App() {
  const [[topPath, leftPath]] = useState(() =>
    generatePaths(limits, repeatCount)
  );
  const [selectedItem, setSelectedItem] = useState<ColumnData | null>(null);

  return (
    <div className="App">
      {(data as Array<ColumnData>).map((el, i) => (
        <Column
          key={i}
          text={el.title}
          topPath={topPath}
          leftPath={leftPath}
          marginRight="random"
          visible={selectedItem === null}
          onClick={() => setSelectedItem(el)}
        />
      ))}

      {
        selectedItem && (
          <Column
            text={selectedItem.title}
            topPath={topPath}
            leftPath={new Array(repeatCount).fill(0)}
            marginRight="random"
            floating
            onClick={() => setSelectedItem(null)}
          />
        )
      }
    </div>
  );
}
