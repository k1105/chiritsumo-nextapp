import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Image from "next/image";
import styles from "./Chiri.module.css";

export const Chiri: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const [imagePath, setImagePath] = useState("/img/small/chiri-1.webp");

  useEffect(() => {
    setImagePath("/img/large/chiri-" + count + ".webp");
  }, [count]);

  //   const dispatch: AppDispatch = useDispatch();

  return (
    <div
      style={{
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <div className={styles.container}>
        <Image
          src={imagePath}
          fill
          priority
          style={{ objectFit: "contain" }}
          alt="chiri"
        />
      </div>
      {/* <p
        style={{
          fontWeight: 600,
          fontSize: "2rem",
          marginTop: "50px",
          color: "black",
        }}
      >
        {count < 10 ? "0" + String(count) : count}
      </p> */}
      {/* <p style={{ fontWeight: 600, fontSize: "2rem" }}>Chiritsumo Challenge</p> */}
    </div>
  );
};
