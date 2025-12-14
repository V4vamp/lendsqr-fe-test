"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { Login } from "@/types/types";
import { getStoredUser, saveSession } from "@/utils/auth";
import { generateAuthToken } from "@/utils/authToken";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    setError("");

    let error = "";
    if (name === "email") {
      if (!value) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email is invalid";
      }
    }
    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const isValid =
    loginData.email && loginData.password && !errors.email && !errors.password;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    setIsLoading(true);

    setTimeout(() => {
      const user = getStoredUser();
      if (!user) {
        setError("No account found. Please sign up.");
        setIsLoading(false);
        return;
      }

      if (
        user.email !== loginData.email ||
        user.password !== loginData.password
      ) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }
      const token = generateAuthToken();

      saveSession({
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
      });

      router.push("/");
    }, 800);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form} action="">
      <div className={styles.formText}>
        <h1>Welcome!</h1>
        <p>Enter your detials to login</p>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <label htmlFor="email">
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className={styles.errorText}>*{errors.email}</p>}
      </label>
      <label htmlFor="password">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <p className={styles.errorText}>*{errors.password}</p>
        )}
        <span onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? "Hide" : "Show"}
        </span>
      </label>
      <Link href={"/forgot-password"}>Forg0t Password?</Link>
      <button aria-busy={isLoading} type="submit" disabled={!isValid || isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
      </button>

      <span className={styles.signupLink}>Don't have an account? Sign Up <Link href={"/signup"}>here</Link></span>
    </form>
  );
};

export default Signin;
