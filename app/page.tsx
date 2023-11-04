"use client";
import React, { useEffect, useRef } from "react";
import { SketchComponent } from "./sketch/sketch";
//@ts-ignore
import styles from "./page.module.css";

export default function Home() {
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const requestDeviceOrientationPermission = () => {
    if (
      DeviceOrientationEvent &&
      //@ts-ignore
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      // iOS 13+ の Safari
      // 許可を取得
      //@ts-ignore
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            // 許可を得られた場合、deviceorientationをイベントリスナーに追加
            window.addEventListener("deviceorientation", (e) => {
              // deviceorientationのイベント処理
            });
          } else {
            // 許可を得られなかった場合の処理
          }
        })
        .catch(console.error); // https通信でない場合などで許可を取得できなかった場合
    } else {
      // 上記以外のブラウザ
    }
  };

  useEffect(() => {
    if (navigator.userAgent.match(/iPhone/)) {
      //startButtonRef.current!.style.display = "default";
      // ボタンクリックでrequestDeviceOrientationPermission実行
      startButtonRef.current!.addEventListener(
        "click",
        requestDeviceOrientationPermission,
        false
      );
    } else {
      startButtonRef.current!.style.display = "none";
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.sketch}>
        <button ref={startButtonRef}>Start</button>
        <SketchComponent />
      </div>
    </main>
  );
}
