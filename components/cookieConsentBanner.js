"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";

const CookieConsent = dynamic(() => import("react-cookie-consent"), {
  ssr: false,
});

const CookieConsentBanner = () => {
  const t = useTranslations("cookie");

  return (
    <CookieConsent
      location="bottom"
      cookieName="brdLawCookieConsent"
      expires={365}
      buttonText={t("accept")}
      declineButtonText={t("decline")}
      enableDeclineButton
      style={{
        background: "#2B373B",
        color: "#FFF",
        padding: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
      buttonWrapperClasses="flex gap-4 mt-3 md:mt-0"
      buttonStyle={{
        backgroundColor: "#4CAF50",
        color: "#000000",
        fontSize: "14px",
        padding: "8px 16px",
        borderRadius: "6px",
      }}
      declineButtonStyle={{
        backgroundColor: "#f44336",
        color: "#000000",
        fontSize: "14px",
        padding: "8px 16px",
        borderRadius: "6px",
      }}
    >
      <p className="text-sm md:text-base">
        {t("message")}{" "}
        <Link href="/privacy-policy" className="underline">
          {t("learnMore")}
        </Link>
        .
      </p>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
