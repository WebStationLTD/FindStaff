"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

// Form components
import ContactForm from "./contactForm";
import JobApplicationForm from "./JobApplicationForm";
import ConsultationForm from "./ConsultationForm";

export default function ServiceForm({ serviceId, serviceSlug }) {
  // Map service slugs to form types
  const getFormTypeBySlug = (slug) => {
    const formMapping = {
      "recruitment": "job-application",
      "consultations": "consultation",
      "service-1": "consultation",
      "service-2": "job-application",
      "service-3": "consultation",
      "service-4": "job-application",
      "service-5": "consultation",
      "service-6": "job-application",
      "service-7": "consultation",
      // Add more mappings as needed
    };
    
    return formMapping[slug] || "contact"; // Default to contact form
  };
  
  const formType = getFormTypeBySlug(serviceSlug);
  
  // Render the appropriate form based on the form type
  const renderForm = () => {
    switch (formType) {
      case "job-application":
        return <JobApplicationForm serviceId={serviceId} />;
      case "consultation":
        return <ConsultationForm serviceId={serviceId} />;
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
                : "Свържете се с нас"}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {formType === "job-application"
              ? "Попълнете формата и ние ще се свържем с вас възможно най-скоро."
              : formType === "consultation"
                ? "Запазете час за консултация с нашите специалисти."
                : "Имате въпроси? Не се колебайте да се свържете с нас."}
          </p>
        </div>
        {renderForm()}
      </div>
    </div>
  );
} 