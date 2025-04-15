import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import Image from "next/image";
import styles from "./Chiri.module.css";

export const Chiri: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const [imagePath, setImagePath] = useState("/img/small/chiri-1.webp");
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) mainRef.current.style.opacity = "0";
    setTimeout(() => {
      setImagePath("/img/large/chiri-" + count + ".webp");
    }, 300);
  }, [count]);

  //   const dispatch: AppDispatch = useDispatch();

  return (
    <div
      ref={mainRef}
      style={{
        userSelect: "none",
        pointerEvents: "none",
        transition: "all 300ms ease",
        opacity: 0,
      }}
    >
      <div className={styles.container}>
        <Image
          src={imagePath}
          fill
          sizes="300px"
          priority
          style={{objectFit: "contain"}}
          alt="chiri"
          onLoad={() => {
            if (mainRef.current) mainRef.current.style.opacity = "1";
          }}
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
