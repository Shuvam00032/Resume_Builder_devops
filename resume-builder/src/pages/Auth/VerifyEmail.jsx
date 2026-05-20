import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. No token provided.");
      return;
    }

    const verify = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.VERIFY_EMAIL, {
          params: { token },
        });
        setStatus("success");
        setMessage(response.data?.message || "Email verified successfully.");
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Verification failed. The link may be expired."
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {status === "loading" && (
          <>
            <h1 className="text-xl font-semibold text-slate-800">
              Verifying your email…
            </h1>
            <p className="text-sm text-slate-600 mt-2">Please wait.</p>
          </>
        )}
        {status === "success" && (
          <>
            <h1 className="text-xl font-semibold text-green-700">
              Email verified
            </h1>
            <p className="text-sm text-slate-600 mt-2">{message}</p>
            <Link
              to="/"
              className="inline-block mt-6 text-primary font-medium underline"
            >
              Go to login
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-xl font-semibold text-red-600">
              Verification failed
            </h1>
            <p className="text-sm text-slate-600 mt-2">{message}</p>
            <Link
              to="/"
              className="inline-block mt-6 text-primary font-medium underline"
            >
              Back to home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
