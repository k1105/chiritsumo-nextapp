"use client";
import React, { useEffect, useRef, useState } from "react";
import { SketchComponent } from "./sketch/sketch";
import styles from "./page.module.css";
import { RequestPermissionModal } from "./requestPermissionModal";
import { InvertButton } from "../components/invertButton";
import { HeadingImage } from "@/components/HeadingImage";
import { Chiri } from "@/components/Chiri";
import { Provider } from "react-redux";
import { store } from "../store";

export default function Home() {
  const [requested, setRequested] = useState<boolean>(true);
  const mainRef = useRef<HTMLElement>(null);
  // const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (navigator.userAgent.match(/iPhone/)) {
      setRequested(false);
    }
    // imageRef.current.src = "/img/large/chiri-80.png";
  }, []);

  return (
    <main
      className={styles.main}
      ref={mainRef}
      style={{ transition: "all 1000ms ease", filter: "invert(0)" }}
    >
      {!requested ? (
        <RequestPermissionModal setRequested={setRequested} />
      ) : (
        <Provider store={store}>
          <div>
            <div className={styles.sketch}>
              <SketchComponent />
            </div>
            <div className={styles.invertButton}>
              {/* <InvertButton mainRef={mainRef} /> */}

              <Chiri />
            </div>
          </div>
        </Provider>
      )}
    </main>
  );
}
