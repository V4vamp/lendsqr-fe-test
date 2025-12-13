"use client";

import React, { useState } from "react";
// import Navbar from "@/components/Navbar/Navbar";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
// import { useMutation } from "@tanstack/react-query";
// import api from "@/lib/api";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

//   const mutation = useMutation({
//     mutationFn: async () => {
//       const res = await api.post("/auth/signup", formData);
//       return res.data;
//     },
//     onSuccess: () => {
//       router.push("/login");
//     },
//   });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    let error = "";
    if (name === "email") {
      if (!value) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email is invalid";
      }
    }
    if (name === "firstName") {
      if (!value) {
        error = "First name is required";
      }
    }

    if (name === "lastName") {
      if (!value) {
        error = "Last name is required";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // mutation.mutate();
  };
  return (
    <div className={styles.signUp}>
        <h1>Create Account</h1>
        <p>Enter your details to sign up</p>
        <form action="">
            <label htmlFor="firstName">
                First Name
                <input type="text" name="firstName" value={formData.firstName} />
            </label>
            <label htmlFor="lastName">
                Last Name
                <input type="text" name="lastName" value={formData.lastName}  />
            </label>
            <label htmlFor="email">
                Email
                <input type="email" name="email" value={formData.email}  />
            </label>
            <label htmlFor="password">
                Password
                <input type="password" name="password" value={formData.password}  />
            </label>
            <button type="submit">Create Account</button>
            <p>Already have an account? <Link href="/login">Login</Link></p>
        </form>
    </div>
  );
};

export default Page;