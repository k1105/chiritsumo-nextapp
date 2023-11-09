"use client";
import React, { useEffect, useRef, useState } from "react";
import { SketchComponent } from "./sketch/sketch";
import styles from "./page.module.css";
import { RequestPermissionModal } from "./requestPermissionModal";
import { Chiri } from "@/components/Chiri";
import { Provider } from "react-redux";
import { store } from "../store";
import { GridTypography } from "@/components/GridTypography";

export default function Home() {
  const [requested, setRequested] = useState<boolean>(true);
  const mainRef = useRef<HTMLElement>(null);
  // const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (navigator.userAgent.match(/iPhone/)) {
      setRequested(false);
    }
    // imageRef.current.src = "/img/large/chiri-80.webp";
  }, []);

  return (
    <main
      className={styles.main}
      ref={mainRef}
      style={{ transition: "all 1000ms ease", filter: "invert(1) blur(0px)" }}
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

            <footer className={styles.footer}>
              <a
                onClick={() => {
                  if (mainRef.current!.style.filter == "invert(0)") {
                    mainRef.current!.style.filter = "invert(1)";
                  } else {
                    mainRef.current!.style.filter = "invert(0)";
                  }
                }}
              >
                <GridTypography />
                <p
                  style={{
                    // borderTop: "1px solid black",
                    textAlign: "right",
                    paddingRight: "2.5vw",
                    lineHeight: "5vh",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                    userSelect: "none",
                  }}
                >
                  ChiritsumoChallenge
                </p>
              </a>
            </footer>
          </div>
        </Provider>
      )}
    </main>
  );
}
