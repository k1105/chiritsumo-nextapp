import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import Image from "next/image";
import styles from "./Chiri.module.css";

export const Chiri: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const [imagePath, setImagePath] = useState("/img/large/chiri-1.webp");
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 画像のプリロード
    for (let i = 1; i <= 90; i++) {
      const img = document.createElement("img");
      img.src = `/img/large/chiri-${i}.webp`;
    }
  }, []);

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
    </div>
  );
};
