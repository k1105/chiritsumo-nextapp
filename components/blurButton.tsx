import React, { RefObject } from "react";

type Props = {
  mainRef: RefObject<HTMLElement>;
};

export const BlurButton = ({ mainRef }: Props) => {
  return (
    <button
      onClick={() => {
        if (mainRef.current!.style.filter == "blur(0px)") {
          mainRef.current!.style.filter = "blur(10px)";
        } else {
          mainRef.current!.style.filter = "blur(0px)";
        }
      }}
    >
      invert
    </button>
  );
};
