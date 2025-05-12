"use client";

// Form components
import ContactForm from "./contactForm";
import ProductionHiringForm from "./ProductionHiringForm";
import ServiceStaffHiringForm from "./ServiceStaffHiringForm";
import RestaurantStaffHiringForm from "./RestaurantStaffHiringForm";
import HotelStaffHiringForm from "./HotelStaffHiringForm";
import ConstructionWorkersHiringForm from "./ConstructionWorkersHiringForm";

export default function ServiceForm({ serviceId, serviceSlug }) {
  // Map service slugs to form types
  const getFormTypeBySlug = (slug) => {
    const formMapping = {
      recruitment: "job-application",
      consultations: "consultation",
      "rabotnitsi-v-sektor-proizvodstvo": "production-hiring",
      "drugi-rabotnitsi": "service-staff-hiring",
      "restorantyorski-personal": "restaurant-staff-hiring",
      "hotelski-personal": "hotel-staff-hiring",
      "stroitelni-rabotnitsi": "construction-workers-hiring",
      // Add more mappings as needed
    };
    return formMapping[slug] || "construction-workers-hiring";
  };

  const formType = getFormTypeBySlug(serviceSlug);

  // Render the appropriate form based on the form type
  const renderForm = () => {
    switch (formType) {
      case "production-hiring":
        return <ProductionHiringForm serviceId={serviceId} />;
      case "service-staff-hiring":
        return <ServiceStaffHiringForm serviceId={serviceId} />;
      case "restaurant-staff-hiring":
        return <RestaurantStaffHiringForm serviceId={serviceId} />;
      case "hotel-staff-hiring":
        return <HotelStaffHiringForm serviceId={serviceId} />;
      case "construction-workers-hiring":
        return <ConstructionWorkersHiringForm serviceId={serviceId} />;
      default:
        return <ConstructionWorkersHiringForm />;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm">
      <div className="px-6 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Кандидатствай сега
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Попълнете формата и ние ще се свържем с вас възможно най-скоро.
          </p>
        </div>
        {renderForm()}
      </div>
    </div>
  );
}
