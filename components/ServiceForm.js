"use client";

import { useTranslations } from "next-intl";
import ProductionHiringForm from "./ProductionHiringForm";
import ServiceStaffHiringForm from "./ServiceStaffHiringForm";
import RestaurantStaffHiringForm from "./RestaurantStaffHiringForm";
import HotelStaffHiringForm from "./HotelStaffHiringForm";
import ConstructionWorkersHiringForm from "./ConstructionWorkersHiringForm";
import DefaultHiringForm from "./DefaultHiringForm";
import { serviceSlugMapReverse } from "../lib/i18n/config";

export default function ServiceForm({ serviceId, serviceSlug, serviceName }) {
  const t = useTranslations("forms");

  const getFormTypeBySlug = (slug) => {
    const sourceSlug = serviceSlugMapReverse[slug] || slug;
    const formMapping = {
      recruitment: "job-application",
      consultations: "consultation",
      "rabotnitsi-v-sektor-proizvodstvo": "production-hiring",
      "drugi-rabotnitsi": "service-staff-hiring",
      "restorantyorski-personal": "restaurant-staff-hiring",
      "hotelski-personal": "hotel-staff-hiring",
      "stroitelni-rabotnitsi": "construction-workers-hiring",
      // Italian slugs also resolve via reverse map above
      "operai-produzione": "production-hiring",
      "altri-lavoratori": "service-staff-hiring",
      "personale-di-ristorazione": "restaurant-staff-hiring",
      "personale-alberghiero": "hotel-staff-hiring",
      "operai-edili": "construction-workers-hiring",
    };
    return formMapping[sourceSlug] || formMapping[slug] || "default-hiring";
  };

  const formType = getFormTypeBySlug(serviceSlug);

  // Ensure serviceName is a string and strip HTML tags if present
  const sanitizedServiceName = serviceName
    ? String(serviceName).replace(/<[^>]*>/g, "")
    : t("requestTitle");

  // Render the appropriate form based on the form type
  const renderForm = () => {
    switch (formType) {
      case "production-hiring":
        return (
          <ProductionHiringForm
            serviceId={serviceId}
            serviceName={sanitizedServiceName}
          />
        );
      case "service-staff-hiring":
        return (
          <ServiceStaffHiringForm
            serviceId={serviceId}
            serviceName={sanitizedServiceName}
          />
        );
      case "restaurant-staff-hiring":
        return (
          <RestaurantStaffHiringForm
            serviceId={serviceId}
            serviceName={sanitizedServiceName}
          />
        );
      case "hotel-staff-hiring":
        return (
          <HotelStaffHiringForm
            serviceId={serviceId}
            serviceName={sanitizedServiceName}
          />
        );
      case "construction-workers-hiring":
        return (
          <ConstructionWorkersHiringForm
            serviceId={serviceId}
            serviceName={sanitizedServiceName}
          />
        );
      default:
        return (
          <DefaultHiringForm
            serviceId={serviceId}
            serviceName={sanitizedServiceName}
          />
        );
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm">
      <div className="px-6 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("requestTitle")}
          </h2>
        </div>
        {renderForm()}
      </div>
    </div>
  );
}
