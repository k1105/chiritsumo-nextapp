"use client";
import React from "react";
import { SketchComponent } from "./sketch/sketch";
//@ts-ignore
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.sketch}>
        <SketchComponent />
      </div>
    </main>
  );
}
