import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Column from "./Column";

describe("<Column />", () => {
  test("renders the given text", () => {
    const path = [1];
  
    render(<Column text={"test text"} topPath={path} leftPath={path} />);
    const visibleTextList = screen.getAllByText(/test text/i)
      .filter((el) => el.style.visibility !== "hidden");
  
    expect(visibleTextList).toHaveLength(1);
  });

  test("renders text a number of times equal to the length of the provided paths", () => {
    const pathLength = 10 + Math.floor(Math.random() * 100);
    const path = new Array(pathLength).fill(123);
  
    render(<Column text={"test text"} topPath={path} leftPath={path} />);
    const visibleTextList = screen.getAllByText(/test text/i)
      .filter((el) => el.style.visibility !== "hidden");
  
    expect(visibleTextList).toHaveLength(pathLength);
  });

  test("text positioning reflects path values", () => {
    const topPath = [1, 2, 3];
    const leftPath = [4, 5, 6];

    render(<Column text={"test text"} topPath={topPath} leftPath={leftPath} />);
    screen.getAllByText(/test text/i)
      .filter((el) => el.style.visibility !== "hidden")
      .forEach((el, i) => {
        expect(el).toHaveStyle({
          "top": `${topPath[i]}px`,
          "left": `${leftPath[i]}px`
        })
      });
  });

  test("no text is visible if 'visible' prop is false", () => {
    const path = new Array(100).fill(123);
  
    render(<Column text={"test text"} topPath={path} leftPath={path} visible={false} />);
    screen.getAllByText(/test text/i)
      .forEach((el) => expect(el).not.toBeVisible());
  });

  test("'onClick' prop is called when rendered text is clicked", () => {
    const path = [1];
    const onClick = jest.fn();

    render(<Column text={"test text"} topPath={path} leftPath={path} onClick={onClick} />);
    const visibleTextList = screen.getAllByText(/test text/i)
      .filter((el) => el.style.visibility !== "hidden");
    userEvent.click(visibleTextList[0]);
  
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe("hovering over text", () => {
    let visibleText: HTMLElement;

    beforeEach(() => {
      const path = [1];
    
      render(<Column text={"test text"} topPath={path} leftPath={path} />);
      const visibleTextList = screen.getAllByText(/test text/i)
        .filter((el) => el.style.visibility !== "hidden");
      visibleText = visibleTextList[0];
      userEvent.hover(visibleText);
    });

    test("hovering over text sets its color to a non-default value", () => {
      if (visibleText.parentElement === null) {
        fail();
      } else {
        expect(visibleText.parentElement).not.toHaveStyle({ color: "" });
      }
    });
  
    test("hovering over then leaving the text returns its color to the default value", () => {
      userEvent.unhover(visibleText);

      if (visibleText.parentElement === null) {
        fail();
      } else {
        expect(visibleText.parentElement).toHaveStyle({ color: "" });
      }
    });
  });

  test("text color is set to a non-default value if it is the default value and the mouse moves within it", () => {
    const path = [1];
    
    render(<Column text={"test text"} topPath={path} leftPath={path} />);
    const visibleTextList = screen.getAllByText(/test text/i)
      .filter((el) => el.style.visibility !== "hidden");
    const visibleText = visibleTextList[0];
    if (visibleText.parentElement === null) {
      fail();
    }
    expect(visibleText.parentElement).toHaveStyle({ color: "" });

    fireEvent["mouseMove"](visibleText);

    expect(visibleText.parentElement).not.toHaveStyle({ color: "" });
  });
});
