"use client";

import { Toaster } from "react-hot-toast";

export function AdminToastProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={10}
      containerStyle={{
        top: 18,
        zIndex: 2147483647,
      }}
      toastOptions={{
        duration: 4200,
        style: {
          direction: "rtl",
          border: "1px solid var(--dnh-border)",
          background: "color-mix(in srgb, white 92%, var(--dnh-bg-soft))",
          color: "var(--dnh-text)",
          boxShadow:
            "0 22px 70px color-mix(in srgb, var(--dnh-primary) 18%, transparent)",
          backdropFilter: "blur(18px)",
          borderRadius: 0,
          padding: "12px 14px",
          minWidth: "min(360px, calc(100vw - 32px))",
          maxWidth: "min(460px, calc(100vw - 32px))",
          fontSize: 12,
          fontWeight: 800,
          lineHeight: 1.9,
        },
        success: {
          iconTheme: {
            primary: "var(--dnh-primary)",
            secondary: "var(--dnh-text-on-brand)",
          },
          style: {
            borderColor:
              "color-mix(in srgb, var(--dnh-primary) 34%, transparent)",
          },
        },
        error: {
          iconTheme: {
            primary: "#dc2626",
            secondary: "#ffffff",
          },
          style: {
            borderColor: "color-mix(in srgb, #dc2626 28%, transparent)",
            color: "#7f1d1d",
          },
        },
        loading: {
          iconTheme: {
            primary: "var(--dnh-accent)",
            secondary: "color-mix(in srgb, var(--dnh-accent) 14%, white)",
          },
          style: {
            borderColor:
              "color-mix(in srgb, var(--dnh-accent) 34%, transparent)",
          },
        },
      }}
    />
  );
}
