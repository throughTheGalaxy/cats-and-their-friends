import logoSvg from "../../assets/img/cat-log.png";
import styles from "./Kolonticyl.module.scss";

export const Kolontikyl = () => {
  return (
    <div className={styles.colonticyl}>
      <h3 className={styles.colonticyl__title}>Cats and their friends</h3>
      <img
        className={styles.colonticyl__img}
        width="38"
        src={logoSvg}
        alt="Cat logo"
      />
    </div>
  );
};
