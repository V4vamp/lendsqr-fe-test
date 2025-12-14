import React from 'react';
import styles from "./styles.module.scss";
import Image from "next/image";


interface PageProps {
 children: React.ReactNode;
}

const FormPage = ({children} : PageProps) => {
  return (
    <div className={styles.page}>
      <section className={styles.pageImage}>
        <div className={styles.logoContainer}>
          <Image src={"/images/logo.png"} alt="lendsqr logo" fill />
        </div>
        <div className={styles.backgroundImage}>
          <Image src={"/images/bg-image.png"} alt="bg-image" fill />
        </div>
      </section>
      <section className={styles.formArea}>
        {children}
      </section>
    </div>
  )
}

export default FormPage
