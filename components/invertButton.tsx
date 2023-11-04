import React, { RefObject } from "react";

type Props = {
  mainRef: RefObject<HTMLElement>;
};

export const InvertButton = ({ mainRef }: Props) => {
  return (
    <button
      onClick={() => {
        if (mainRef.current!.style.filter == "invert(0)") {
          mainRef.current!.style.filter = "invert(1)";
        } else {
          mainRef.current!.style.filter = "invert(0)";
        }
      }}
    >
      invert
    </button>
  );
};
