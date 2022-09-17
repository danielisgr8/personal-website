interface ContentDivProps {
  children: React.ReactNode;
}

const ContentDiv = ({ children }: ContentDivProps) => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    padding: "0.1rem 0"
  }}>
    {children}
  </div>
);

export default ContentDiv;
