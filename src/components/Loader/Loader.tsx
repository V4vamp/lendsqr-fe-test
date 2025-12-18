import React from "react";
import Image from "next/image";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Image
        src={"/images/logo.png"}
        alt="lendsqr"
        width={144}
        height={30}
        className={styles.logo}
      />
      <div className={styles.loading}></div>
    </div>
  );
};

export default Loader;
