"use client";

import React, { useState } from "react";
import { saveUser, saveSession, getStoredUser } from "@/utils/auth";
import { generateAuthToken } from "@/utils/authToken";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  }>({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");

    let errorMsg = "";

    if (name === "firstName" && !value) errorMsg = "First name is required";
    if (name === "lastName" && !value) errorMsg = "Last name is required";

    if (name === "email") {
      if (!value) errorMsg = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = "Email is invalid";
    }

    if (name === "password") {
      if (!value) errorMsg = "Password is required";
      else if (value.length < 6)
        errorMsg = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const isValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    !Object.values(errors).some(Boolean);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    setIsLoading(true);

    setTimeout(() => {
      const existingUser = getStoredUser();

      if (existingUser?.email === formData.email) {
        setError("An account with this email already exists");
        setIsLoading(false);
        return;
      }

      saveUser(formData);

      const token = generateAuthToken();

      saveSession({
        user: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        token,
      });

      router.push("/signin");
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formText}>
        <h1>Create Account</h1>
        <p>Enter your details to sign up</p>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <label>
        First Name
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && (
          <p className={styles.errorText}>*{errors.firstName}</p>
        )}
      </label>

      <label>
        Last Name
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {errors.lastName && (
          <p className={styles.errorText}>*{errors.lastName}</p>
        )}
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className={styles.errorText}>*{errors.email}</p>}
      </label>

      <label>
        Password
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <p className={styles.errorText}>*{errors.password}</p>
        )}
        <span onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? "Hide" : "Show"}
        </span>
      </label>

      <button
        className={styles.signupButton}
        type="submit"
        disabled={!isValid || isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>

      <span className={styles.signinLink}>
        Already have an account? <Link href="/signin">Sign In</Link>
      </span>
    </form>
  );
};

export default SignUp;
