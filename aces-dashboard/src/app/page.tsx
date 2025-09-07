"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://aces-utky.onrender.com/api/admin/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }
      const loginData = await res.json();
      const token = loginData.token;
      if (!token) throw new Error("No token returned from login");

      // Verify token (GET request)
      const verifyRes = await fetch(
        "https://aces-utky.onrender.com/api/admin/auth/verify-token",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!verifyRes.ok) {
        // Try to parse JSON error, fallback to status text
        let message = "Token verification failed";
        const contentType = verifyRes.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const verifyData = await verifyRes.json();
          message = verifyData.message || message;
        } else {
          message = verifyRes.statusText || message;
        }
        throw new Error(message);
      }
      // Success: store token and redirect
      localStorage.setItem("adminToken", token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/sign-in-background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Signup Form */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md z-10 relative mx-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Image
              src="/logo.png"
              alt="ACES Logo"
              width={40}
              height={40}
              className="object-contain mr-3"
            />
            <h1 className="text-2xl font-semibold text-gray-800">
              Sign in as an Admin
            </h1>
          </div>
          <p className="text-gray-500 text-sm text-center">
            Enter your Email and Password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-600 text-sm text-center font-semibold">
              {error}
            </div>
          )}
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all duration-200"
              style={
                {
                  borderColor: "#D1D5DB",
                  "--tw-ring-color": "#166D86",
                  "--tw-border-opacity": "1",
                } as React.CSSProperties
              }
              onFocus={(e) => {
                e.target.style.borderColor = "#166D86";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#D1D5DB";
              }}
              placeholder=""
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all duration-200"
              style={
                {
                  borderColor: "#D1D5DB",
                  "--tw-ring-color": "#166D86",
                  "--tw-border-opacity": "1",
                } as React.CSSProperties
              }
              onFocus={(e) => {
                e.target.style.borderColor = "#166D86";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#D1D5DB";
              }}
              placeholder=""
              required
            />
          </div>

          {/* Forgot Password Link removed */}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg disabled:opacity-50"
            style={
              {
                backgroundColor: "#166D86",
                "--tw-ring-color": "#166D86",
              } as React.CSSProperties
            }
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
