import { ReactNode, useState } from "react";
import { getRandomContrastingHex } from "./color-util";
import { getRandomInt } from "./util";

interface ColumnTextProps {
  text: string;
  top?: number;
  left?: number;
  visible?: boolean;
}

const ColumnText = ({
  text,
  top = 0,
  left = 0,
  visible = true,
}: ColumnTextProps) => {
  return (
    <h1
      style={
        visible
          ? { position: "absolute", top: `${top}px`, left: `${left}px` }
          : { visibility: "hidden" }
      }
    >
      {text}
    </h1>
  );
};

interface ColumnProps {
  text: string;
  topPath: Array<number>;
  leftPath: Array<number>;
  marginRight?: "random" | number;
  floating?: boolean;
  visible?: boolean;
  onClick?: () => void;
}

const calculateMargin = (value?: ColumnProps["marginRight"]) =>
  value
    ? value === "random"
      ? `${25 + getRandomInt(0, 10)}px`
      : `${value}px`
    : "";

const Column = ({
  text,
  topPath,
  leftPath,
  marginRight,
  floating = false,
  visible = true,
  onClick
}: ColumnProps) => {
  const [color, setColor] = useState("");
  const [hovering, setHovering] = useState(false);
  const [marginRightString] = useState(calculateMargin(marginRight));

  // TODO: in the future, find some way to not re-initialize these components on every render
  const repeatCount = topPath.length;
  const textElements = new Array<ReactNode>(repeatCount);
  for (let i = 0; i < repeatCount; i++) {
    textElements[i] = (
      <ColumnText key={i} text={text} top={topPath[i]} left={leftPath[i]} />
    );
  }

  return (
    <div
      className="noselect column"
      style={{
        color,
        cursor: hovering ? "pointer" : "",
        marginRight: marginRightString,
        position: floating ? "fixed" : "relative",
        visibility: visible ? undefined : "hidden"
      }}
      onMouseEnter={() => {
        setHovering(true);
        setColor(getRandomContrastingHex([0, 0, 0]));
      }}
      onMouseLeave={() => {
        setHovering(false);
        setColor("");
      }}
      onClick={() => { if (onClick) onClick() }}
    >
      <ColumnText text={text} visible={false} />
      {textElements}
    </div>
  );
};

export default Column;
