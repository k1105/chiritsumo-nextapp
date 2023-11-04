"use client";
import React, { useEffect, useRef, useState } from "react";
import { SketchComponent } from "./sketch/sketch";
//@ts-ignore
import styles from "./page.module.css";
import { RequestPermissionModal } from "./requestPermissionModal";
import { InvertButton } from "../components/invertButton";

export default function Home() {
  const [requested, setRequested] = useState<boolean>(true);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navigator.userAgent.match(/iPhone/)) {
      setRequested(false);
    }
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
        <div>
          <div className={styles.sketch}>
            <SketchComponent />
          </div>
          <div className={styles.invertButton}>
            <InvertButton mainRef={mainRef} />
          </div>
        </div>
      )}
    </main>
  );
}
