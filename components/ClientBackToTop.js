"use client";

import dynamic from "next/dynamic";

// Динамично зареждаме BackToTop компонента само на клиентска страна
const BackToTop = dynamic(() => import("./BackToTop"), {
  ssr: false,
});

export default function ClientBackToTop() {
  return <BackToTop />;
}
