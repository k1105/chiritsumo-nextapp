import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Image from "next/image";

export const Chiri: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const [imagePath, setImagePath] = useState("/img/small/chiri-1.png");

  useEffect(() => {
    setImagePath("/img/large/chiri-" + count + ".png");
  }, [count]);

  //   const dispatch: AppDispatch = useDispatch();

  return (
    <div
      style={{
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <div style={{ height: "25vh", width: "25vh" }}>
        <Image src={imagePath} layout="fill" objectFit="contain" alt="chiri" />
      </div>
      {/* <p
        style={{
          fontWeight: 600,
          fontSize: "1rem",
          marginTop: "50px",
          color: "black",
        }}
      >
        {count < 10 ? "0" + String(count) : count}
        <br />
        2021.11.05
      </p> */}
      {/* <p style={{ fontWeight: 600, fontSize: "2rem" }}>Chiritsumo Challenge</p> */}
    </div>
  );
};
