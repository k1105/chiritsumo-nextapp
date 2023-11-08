import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Image from "next/image";
import { DynamicImageComponent } from "./DynamicImage";

export const Chiri: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  //   const dispatch: AppDispatch = useDispatch();

  return (
    <div style={{ userSelect: "none" }}>
      <div style={{ height: "25vh", width: "25vh" }}>
        <Image
          src={"/img/small/chiri-" + count + ".png"}
          layout="fill"
          objectFit="contain"
          alt="chiri"
        />
      </div>
      <DynamicImageComponent />
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
