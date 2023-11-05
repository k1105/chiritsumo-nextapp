import React, { RefObject, useRef } from "react";

type Props = {
  mainRef: RefObject<HTMLElement>;
};

export const InvertButton = ({ mainRef }: Props) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  return (
    <a
      onClick={() => {
        if (mainRef.current!.style.filter == "invert(0)") {
          mainRef.current!.style.filter = "invert(1)";
          textRef.current.innerText = "あかるく";
        } else {
          mainRef.current!.style.filter = "invert(0)";
          textRef.current.innerText = "くらく";
        }
      }}
    >
      <span
        style={{
          display: "block",
          border: "1px solid black",
          width: "6rem",
          padding: "0.5rem",
          borderRadius: "1.5rem",
          textAlign: "center",
        }}
      >
        <p ref={textRef}>くらく</p>
      </span>
    </a>
  );
};
