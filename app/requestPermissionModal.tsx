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
      <p>
        本ページはデバイスの回転情報を使用します。許可する場合、「OK」を押してください。
      </p>
      <div>
        <button onClick={requestDeviceOrientationPermission}>OK</button>
        <a onClick={() => setRequested(true)}>Skip</a>
      </div>
    </>
  );
};
