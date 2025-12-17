import React from "react";
import styles from "./styles.module.scss";
import { User } from "@/types/types";

interface DetailsProps {
  user: User;
}

const Details = ({ user }: DetailsProps) => {
  return (
    <div className={styles.details}>
      <section className={styles.personalInformations}>
        <header className={styles.headerText}>Personal Information</header>
        <div className={styles.informations}>
          <span className={styles.info}>
            <p>Full name</p>
            <h4>{user.profile.fullName}</h4>
          </span>
          <span className={styles.info}>
            <p>phone number</p>
            <h4>0{user.phone}</h4>
          </span>
          <span className={styles.info}>
            <p>email Address</p>
            <h4>{user.email}</h4>
          </span>
          <span className={styles.info}>
            <p>bvn</p>
            <h4>{user.profile.bvn}</h4>
          </span>
          <span className={styles.info}>
            <p>gender</p>
            <h4>{user.profile.gender}</h4>
          </span>
          <span className={styles.info}>
            <p>marital status</p>
            <h4>{user.profile.maritalStatus}</h4>
          </span>
          <span className={styles.info}>
            <p>children</p>
            <h4>{user.profile.children}</h4>
          </span>
          <span className={styles.info}>
            <p>type of residence</p>
            <h4>{user.profile.residence}</h4>
          </span>
        </div>
      </section>
      <section className={styles.educationEmployment}>
        <header className={styles.headerText}>Education and Employment</header>
        <div className={styles.informations}>
          <span className={styles.info}>
            <p>level of education</p>
            <h4>{user.education.level}</h4>
          </span>
          <span className={styles.info}>
            <p>employment status</p>
            <h4>{user.education.employmentStatus}</h4>
          </span>
          <span className={styles.info}>
            <p>sector of employment</p>
            <h4>{user.education.sector}</h4>
          </span>
          <span className={styles.info}>
            <p>duration of employment</p>
            <h4>{user.education.duration}</h4>
          </span>
          <span className={styles.info}>
            <p>office email</p>
            <h4>{user.education.officeEmail}</h4>
          </span>
          <span className={styles.info}>
            <p>monthly income</p>
            <h4>{user.education.monthlyIncome}</h4>
          </span>
          <span className={styles.info}>
            <p>loan repayment</p>
            <h4>{user.education.loanRepayment}</h4>
          </span>
        </div>
      </section>
      <section className={styles.socials}>
        <header className={styles.headerText}>
            Socials
        </header>
        <div className={styles.informations}>
            <span className={styles.info}>
                <p>Twitter</p>
                <h4>
                    {user.socials.twitter}
                </h4>
            </span>
            <span className={styles.info}>
                <p>Facebook</p>
                <h4>
                    {user.socials.facebook}
                </h4>
            </span>
            <span className={styles.info}>
                <p>instagram</p>
                <h4>
                    {user.socials.instagram}
                </h4>
            </span>
        </div>
      </section>
      {user.guarantors.map((item, idx) => (
        <section key={idx} className={styles.guarantor}>
            <header className={styles.headerText}>
                Guarantor
            </header>
            <div className={styles.informations}>
                <span className={styles.info}>
                    <p>full name</p>
                    <h4>
                        {item.fullName}
                    </h4>
                </span>
                <span className={styles.info}>
                    <p>phone number</p>
                    <h4>
                        0{item.phone}
                    </h4>
                </span>
                <span className={styles.info}>
                    <p>email address</p>
                    <h4>
                        {item.email}
                    </h4>
                </span>
                <span className={styles.info}>
                    <p>relationship</p>
                    <h4>
                        {item.relationship}
                    </h4>
                </span>
            </div>
        </section>
      ))}
    </div>
  );
};

export default Details;
