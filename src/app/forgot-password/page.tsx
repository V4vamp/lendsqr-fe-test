"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/utils/auth";
import { saveResetToken } from "@/utils/passwordReset";
import FormArea from "@/components/FormPage/FormPage";
import styles from "./page.module.scss";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setEmail(value);
    setError("");

    if (!value) {
      setErrors("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setErrors("Email is invalid");
    } else {
      setErrors("");
    }
  };

  const isValid = email && !errors;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    setIsLoading(true);

    setTimeout(() => {
      const user = getStoredUser();

      if (!user || user.email !== email) {
        setError("No account found with this email");
        setIsLoading(false);
        return;
      }

      const token = crypto.randomUUID();

      saveResetToken({
        token,
        email,
        expiresAt: Date.now() + 10 * 60 * 1000,
      });

      router.push(`/reset-password?token=${token}`);
    }, 3000);
  };

  return (
    <FormArea>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formText}>
          <h1>Forgot Password</h1>
          <p>Enter your email address to reset your password</p>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <label htmlFor="email">
          <input
            type="email"
            placeholder="Enter your email"
            onChange={handleInputChange}
            value={email}
          />
          {errors && <p className={styles.errorText}>*{errors}</p>}
        </label>
        <button
          disabled={isLoading}
          style={{
            opacity: `${isLoading && !isValid ? "50%" : "100%"}`,
            cursor: `${isLoading && !isValid ? "not-allowed" : ""}`,
          }}
          className={styles.resetButton}
          type="submit"
        >
          {isLoading ? "Reseting Password.." : "Reset Password"}
        </button>
      </form>
    </FormArea>
  );
}
