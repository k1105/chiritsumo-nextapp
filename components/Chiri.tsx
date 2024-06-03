import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Image from "next/image";
import styles from "./Chiri.module.css";

export const Chiri: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const [imagePath, setImagePath] = useState("/img/small/chiri-1.webp");
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (mainRef.current) mainRef.current.style.opacity = "0";
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
        opacity: 1,
      }}
    >
      <div className={styles.container}>
        <p
          style={{
            width: "60vh",
            marginTop: "60vh",
            marginBottom: "5vh",
            display: "block",
            fontWeight: "600",
            fontSize: "1.1rem",
          }}
        >
          Kanata Yamagishi / 山岸 奏大
        </p>
        <p>
          東京理科大学 工学部 情報工学科
          <br /> 情報科学芸術大学院大学 メディア表現研究科
        </p>
        <Image
          src="/img/profile_pic.jpeg"
          fill
          priority
          style={{ objectFit: "contain", zIndex: "-1" }}
          alt="chiri"
          onLoadingComplete={() => {
            if (mainRef.current) mainRef.current.style.opacity = "1";
          }}
        />
        {/* <Image
          src={imagePath}
          fill
          priority
          style={{ objectFit: "contain" }}
          alt="chiri"
          onLoadingComplete={() => {
            if (mainRef.current) mainRef.current.style.opacity = "1";
          }}
        /> */}
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
