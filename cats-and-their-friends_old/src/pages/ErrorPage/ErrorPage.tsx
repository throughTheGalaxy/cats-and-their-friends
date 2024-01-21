import styles from "./ErrorPage.module.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={styles.ErrorPage}>
      <div className={styles.ErrorPage__wrap}>
        <h1 className={styles.ErrorPage__title}>404</h1>
        <p className={styles.ErrorPage__p}>Error page</p>
        <Link className={styles.ErrorPage__link} to="/">
          Go to main page
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
