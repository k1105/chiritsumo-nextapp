"use client";
import React, { useEffect, useRef, useState } from "react";
import { SketchComponent } from "./sketch/sketch";
//@ts-ignore
import styles from "./page.module.css";
import { RequestPermissionModal } from "./requestPermissionModal";

export default function Home() {
  const [requested, setRequested] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.userAgent.match(/iPhone/)) {
      setRequested(false);
    }
  }, []);

  return (
    <main className={styles.main}>
      {!requested ? (
        <RequestPermissionModal setRequested={setRequested} />
      ) : (
        <div className={styles.sketch}>
          <SketchComponent />
        </div>
      )}
    </main>
  );
}
