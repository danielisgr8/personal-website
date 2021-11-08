import { useState } from "react";

interface ContactSvgProps {
  filename: string,
  hidden?: boolean
}

const ContactSvg = ({ filename, hidden = false }: ContactSvgProps) => (
  <div
    style={{
      flexGrow: 1,
      backgroundImage: `url(${process.env.PUBLIC_URL}/img/${filename})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center 25%",
      // Force pre-loading of SVG (display: "none" does not pre-load)
      opacity: hidden ? 0 : 1,
      position: hidden ? "absolute" : undefined
    }}
  />
);

interface ContactProps {
  smallScreen: boolean;
}

const Contact = ({ smallScreen }: ContactProps) => {
  const [mouseDown, setMouseDown] = useState(false);

  return (
    <div style={{
      flexGrow: smallScreen ? 1 : undefined,
      display: "flex",
      flexDirection: "column"
    }}>
      <h3>Give me a nod, wave, or wink: <a href="mailto:me@danielschubert.dev">me@danielschubert.dev</a></h3>

      <p>You can also contact me using international maritime signal flags on any water vessel within the Port of Seattle. I&apos;ll see it.</p>

      <div
        style={{ flexGrow: 1, display: "flex" }}
        onMouseDown={() => setMouseDown(true)}
        onTouchStart={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        onTouchEnd={() => setMouseDown(false)}
      >
        <ContactSvg
          filename="i-welcome-you.svg"
          hidden={mouseDown}
        />
        <ContactSvg
          filename="i-welcome-wink.svg"
          hidden={!mouseDown}
        />
      </div>
    </div>
  );
};

export default Contact;
