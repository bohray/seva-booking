import React from "react";
import styles from "./styles/SevaCard.module.css";
import loaderStyles from "./styles/SevaCardLoader.module.css";

const SevaCardLoader = () => {
  return (
    <div className={`${styles.card} ${loaderStyles.skeleton}`}>
      <div className={loaderStyles.image}></div>
      <div className={loaderStyles.info}>
        <div className={loaderStyles.line + " " + loaderStyles.title}></div>
        <div
          className={loaderStyles.line + " " + loaderStyles.description}
        ></div>
        <div className={loaderStyles.tags}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.prices}>
          <div className={loaderStyles.line + " " + loaderStyles.price}></div>
          <div className={loaderStyles.line + " " + loaderStyles.price}></div>
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={loaderStyles.btn}></div>
        <div className={loaderStyles.btn}></div>
      </div>
    </div>
  );
};

export default SevaCardLoader;
