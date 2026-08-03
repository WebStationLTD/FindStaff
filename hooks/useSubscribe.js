"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

export default function useSubscribe() {
  const t = useTranslations("subscribe");
  const [loading, setLoading] = useState(false);

  const subscribe = async (email, clearInput) => {
    setLoading(true);

    if (!email) {
      Swal.fire({
        icon: "error",
        title: t("errorTitle"),
        text: t("errorEmail"),
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        clearInput();
        Swal.fire({
          icon: "success",
          title: t("successTitle"),
          text: t("successText"),
          timer: 4000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t("retryTitle"),
          text: t("retryText"),
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("failTitle"),
        text: t("failText"),
      });
    }
    setLoading(false);
  };

  return { subscribe, loading };
}
