import { asciiInterpolator } from "@/lib/asciiInterpolator";
import React, { RefObject, useRef, useState } from "react";

type Props = {
  mainRef: RefObject<HTMLElement>;
};

export const InvertButton = ({ mainRef }: Props) => {
  const intervalId = useRef<NodeJS.Timeout>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const elapsedTime = useRef<number>(0);
  const deltatime = 10; //ms
  const textConverter = (begin: string, end: string) => {
    intervalId.current = setInterval(() => {
      elapsedTime.current = Math.min(
        elapsedTime.current + (deltatime * 10) / 1000,
        1
      );

      textRef.current.innerText = asciiInterpolator(
        elapsedTime.current,
        begin,
        end
      );
      if (elapsedTime.current == 1) {
        clearInterval(intervalId.current);
        elapsedTime.current = 0;
      }
    }, deltatime);
  };
  return (
    <a
      onClick={() => {
        if (mainRef.current!.style.filter == "invert(0)") {
          mainRef.current!.style.filter = "invert(1)";
          // textRef.current.innerText = "あかるく";
          textConverter("くらく", "あかるく");
        } else {
          mainRef.current!.style.filter = "invert(0)";
          textConverter("あかるく", "くらく");
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
        <p ref={textRef} style={{ textOverflow: "clip", userSelect: "none" }}>
          くらく
        </p>
      </span>
    </a>
  );
};
