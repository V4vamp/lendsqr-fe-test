"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { getResetToken, clearResetToken } from "@/utils/passwordReset";
import { getStoredUser, saveUser } from "@/utils/auth";
import FormArea from "@/components/FormPage/FormPage";
import styles from "./page.module.scss";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");
  const storedToken = getResetToken();

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");

    let errorMsg = "";

    if (name === "password") {
      if (!value) errorMsg = "Password is required";
      else if (value.length < 6)
        errorMsg = "Password must be at least 6 characters";
    }

    if (name === "confirmPassword") {
      if (!value) errorMsg = "Please confirm your password";
      else if (value !== passwordData.password)
        errorMsg = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !storedToken ||
      storedToken.token !== token ||
      storedToken.expiresAt < Date.now()
    ) {
      setError("Invalid or expired reset link");
      return;
    }

    const user = getStoredUser();

    const { password } = passwordData;

    if (!user || user.email !== storedToken.email) {
      setError("User not found");
      return;
    }

    saveUser({ ...user, password });
    clearResetToken();

    router.push("/signin");
  };

  return (
    <FormArea>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formText}>
          <h1>Reset Password</h1>
          <p>Enter a new password for your account</p>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <label className={styles.labelItem} htmlFor="password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={passwordData.password}
            onChange={handlePasswordChange}
            name="password"
          />
          {errors.password && <p className={styles.errorText}>*{errors.password}</p>}
        </label>

        <label htmlFor="confirmPassword" className={styles.labelItem}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            name="confirmPassword"
          />
            {errors.confirmPassword && <p className={styles.errorText}>*{errors.confirmPassword}</p>}
        </label>

        <label className={styles.showPassword}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          Show password
        </label>

        <button className={styles.resetButton} type="submit">
          Update Password
        </button>
      </form>
    </FormArea>
  );
}
