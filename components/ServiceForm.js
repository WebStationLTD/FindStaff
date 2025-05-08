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

    return formMapping[slug] || "contact"; // Default to contact form
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
        return <ContactForm />;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm">
      <div className="px-6 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {formType === "job-application"
              ? "Кандидатствай сега"
              : formType === "consultation"
              ? "Запазете консултация"
              : formType === "production-hiring"
              ? "Заявка за наемане на персонал за производство"
              : formType === "service-staff-hiring"
              ? "Заявка за наемане на персонал за фирма за услуги"
              : formType === "restaurant-staff-hiring"
              ? "Заявка за наемане на ресторантски персонал"
              : formType === "hotel-staff-hiring"
              ? "Заявка за наемане на хотелски персонал"
              : formType === "construction-workers-hiring"
              ? "Заявка за наемане на строителни работници"
              : "Свържете се с нас"}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {formType === "job-application"
              ? "Попълнете формата и ние ще се свържем с вас възможно най-скоро."
              : formType === "consultation"
              ? "Запазете час за консултация с нашите специалисти."
              : formType === "production-hiring"
              ? "Попълнете формуляра за заявка на персонал за производство или търговско дружество."
              : formType === "service-staff-hiring"
              ? "Попълнете формуляра за заявка на персонал за вашата фирма за услуги."
              : formType === "restaurant-staff-hiring"
              ? "Попълнете формуляра за заявка на персонал за вашия ресторант."
              : formType === "hotel-staff-hiring"
              ? "Попълнете формуляра за заявка на персонал за вашия хотел от трети държави."
              : formType === "construction-workers-hiring"
              ? "Попълнете формуляра за заявка на строителни работници от трети държави."
              : "Имате въпроси? Не се колебайте да се свържете с нас."}
          </p>
        </div>
        {renderForm()}
      </div>
    </div>
  );
}
