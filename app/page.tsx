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
  const [requested, setRequested] = useState<boolean>(false);
  const mainRef = useRef<HTMLElement>(null);
  const requestContainerRef = useRef<HTMLDivElement>(null);
  const sketchContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef<boolean>(true);
  // const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (requestContainerRef.current) {
        if (requested) {
          requestContainerRef.current.style.opacity = "0";
          sketchContainerRef.current.style.opacity = "1";
        } else {
          requestContainerRef.current.style.opacity = "1";
        }
      }
    }
  }, [requested]);

  useEffect(() => {
    if (!navigator.userAgent.match(/iPhone/)) {
      setRequested(true);
    }
    // imageRef.current.src = "/img/large/chiri-80.webp";
  }, []);

  return (
    <main
      className={styles.main}
      ref={mainRef}
      style={{ transition: "all 1000ms ease", filter: "invert(1)" }}
    >
      <div
        ref={requestContainerRef}
        style={{
          transition: "all 1000ms ease",
          opacity: 0,
        }}
      >
        <RequestPermissionModal setRequested={setRequested} />
      </div>

      {requested ? (
        <Provider store={store}>
          <div
            ref={sketchContainerRef}
            style={{ transition: "all 1000ms ease", opacity: 0 }}
          >
            <div className={styles.sketch}>
              <SketchComponent />
            </div>
            <div className={styles.invertButton}>
              {/* <InvertButton mainRef={mainRef} /> */}
              <Chiri />
            </div>
            <GridTypography />
          </div>
        </Provider>
      ) : (
        <></>
      )}

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
    </main>
  );
}
