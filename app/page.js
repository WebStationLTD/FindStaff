import HeroSection from "../components/hero";
import { WebVitals } from "./web-vitals";
import dynamic from "next/dynamic";

// Динамично зареждане на компоненти с lazy loading
const Incentives = dynamic(() => import("../components/incentives"), {
  ssr: true,
});
const Team = dynamic(() => import("../components/team"), { ssr: true });
const CTA = dynamic(() => import("../components/cta"), { ssr: true });
const Clients = dynamic(() => import("../components/clients"), { ssr: true });
const Newsletter = dynamic(() => import("../components/newsletter"), {
  ssr: true,
});
const Testimonial = dynamic(() => import("../components/testimonial"), {
  ssr: true,
});
const Lastestposts = dynamic(() => import("../components/latestposts"), {
  ssr: true,
});

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

// Добавяне на метаданни за главната страница
export const metadata = {
  title: "FindStaff Bulgaria | Набиране на персонал от трети държави",
  description:
    "Легална процедура за наемане на персонал от трети държави. Осигуряваме пълно съдействие при подбор, документи и трудови договори за работници от Украйна, Молдова, Азербайджан и др.",
  keywords: [
    "персонал от трети държави",
    "наемане на чуждестранни работници",
    "подбор на персонал",
    "работници от чужбина",
    "работна виза България",
    "синя карта ЕС",
  ],
  openGraph: {
    title: "FindStaff Bulgaria | Набиране на персонал от трети държави",
    description:
      "Легална процедура за наемане на персонал от трети държави. Осигуряваме пълно съдействие при подбор и трудови договори.",
    images: [
      {
        url: "/hero-image-desktop-new.jpg",
        width: 1200,
        height: 630,
        alt: "FindStaff Bulgaria",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FindStaff Bulgaria | Набиране на персонал от трети държави",
    description:
      "Легална процедура за наемане на персонал от трети държави. Осигуряваме пълно съдействие при подбор и трудови договори.",
    images: ["/hero-image-desktop-new.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <WebVitals />
      <HeroSection />
      <Incentives />
      <Team />
      <CTA />
      <Clients />
      <Newsletter />
      <Testimonial />
      <Lastestposts />
    </>
  );
}
