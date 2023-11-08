import styles from "./GridTypography.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const GridTypography = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  return (
    <>
      <p className={`${styles.gridText} ${styles.chiri}`}>
        塵（Chiri）{count >= 10 ? count : "0" + String(count)}
      </p>

      <p className={`${styles.gridText} ${styles.yama}`}>山（Mountain）</p>
    </>
  );
};
