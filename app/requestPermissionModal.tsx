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
    <>
      <p>端末の回転情報を使用すると、重力を意のままにできます。</p>
      <div>
        <a onClick={requestDeviceOrientationPermission}>
          <span
            style={{
              display: "block",
              border: "1px solid black",
              width: "6rem",
              padding: "0.5rem",
              borderRadius: "1.5rem",
              textAlign: "center",
            }}
          >
            <p style={{ textOverflow: "clip", userSelect: "none" }}>使用する</p>
          </span>
        </a>
        <a onClick={() => setRequested(true)}>スキップ</a>
      </div>
    </>
  );
};
