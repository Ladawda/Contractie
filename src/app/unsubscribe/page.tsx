"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { GuildLogo } from "@/components/guild-logo";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <div className="min-h-screen bg-snow flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-8">
          <GuildLogo height={28} />
        </div>

        <div className="glass-strong rounded-2xl p-8">
          {status === "loading" && (
            <>
              <div className="w-12 h-12 rounded-full bg-guild-blue-wash flex items-center justify-center mx-auto mb-4">
                <div className="w-5 h-5 border-2 border-guild-blue border-t-transparent rounded-full animate-spin" />
              </div>
              <h1 className="font-display text-lg font-bold text-gray-900 mb-2">
                Unsubscribing...
              </h1>
              <p className="text-sm text-gray-500">Just a moment.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-12 h-12 rounded-full bg-guild-teal-soft flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">✓</span>
              </div>
              <h1 className="font-display text-lg font-bold text-gray-900 mb-2">
                You've been unsubscribed
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                You won't receive any more emails from us. Your waitlist spot is
                still safe — we'll never remove you.
              </p>
              <a
                href="/"
                className="text-sm text-guild-blue hover:underline"
              >
                ← Back to joinguild.app
              </a>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">✕</span>
              </div>
              <h1 className="font-display text-lg font-bold text-gray-900 mb-2">
                Something went wrong
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                We couldn't process your unsubscribe request. The link may be
                invalid or expired.
              </p>
              <a
                href="/"
                className="text-sm text-guild-blue hover:underline"
              >
                ← Back to joinguild.app
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-snow flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-guild-blue border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
