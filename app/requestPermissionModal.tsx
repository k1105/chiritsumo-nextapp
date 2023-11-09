import React, { SetStateAction } from "react";

type Props = {
  setRequested: React.Dispatch<SetStateAction<boolean>>;
};

export const RequestPermissionModal = ({ setRequested }: Props) => {
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
    setRequested(true);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "70vw",
        transform: "translateY(-50%) translateX(-50%)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "10rem",
          lineHeight: "1.4rem",
        }}
      >
        <p style={{ marginBottom: "1rem" }}>
          端末の回転情報を使用すると、
          <br />
          重力を意のままにできます。
        </p>
        <p style={{ fontSize: "0.8rem", lineHeight: "1rem", opacity: 0.6 }}>
          Using orientation information,
          <br />
          you can manipulate gravity freely.
        </p>
      </div>

      <div style={{ textAlign: "center" }}>
        <a onClick={requestDeviceOrientationPermission}>
          <span
            style={{
              display: "block",
              margin: "0 auto 3rem auto",
              border: "1px solid black",
              width: "6rem",
              padding: "0.5rem",
              borderRadius: "1.5rem",
              textAlign: "center",
            }}
          >
            <p style={{ textOverflow: "clip", userSelect: "none" }}>そうする</p>
          </span>
        </a>
        <a style={{ textAlign: "center" }} onClick={() => setRequested(true)}>
          スキップ / Skip
        </a>
      </div>
    </div>
  );
};
