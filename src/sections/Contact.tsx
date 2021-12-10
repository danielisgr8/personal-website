interface ContactProps {
  smallScreen: boolean;
}

const Contact = ({ smallScreen }: ContactProps) => {
  return (
    <div style={{
      flexGrow: smallScreen ? 1 : undefined,
      display: "flex",
      flexDirection: "column",
      padding: "0.25rem 0.5rem"
    }}>
      <h3 style={{ margin: "0" }}>Give me a nod, wave, or wink: <a href="mailto:me@danielschubert.dev">me@danielschubert.dev</a></h3>
    </div>
  );
};

export default Contact;
