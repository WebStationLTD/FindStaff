"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const URL_FORM =
  "https://findstaff.admin-panels.com/wp-json/contact-form-7/v1/contact-forms/621/feedback";

export default function RestaurantStaffHiringForm({ serviceId, serviceName }) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Scroll to the first error element when validation fails
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorFields = document.querySelectorAll('.error-field');
      if (errorFields.length > 0) {
        errorFields[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [errors]);

  const countryOptions = [
    "Филипини",
    "Индонезия",
    "Непал",
    "Индия",
    "Бангладеш",
    "Шри Ланка",
    "Киргизстан",
    "Узбекистан",
    "Туркменистан",
    "Египет",
    "Украйна",
    "Пакистан",
    "Казахстан",
    "Виетнам"
  ];

  const positionOptions = [
    "Готвачи - топла кухня",
    "Готвачи - студена кухня",
    "Сладкари",
    "Хлебари / Пицари",
    "Майстор суши",
    "Сервитьори",
    "Хигиенисти"
  ];

  // Helper function to determine if a field has error
  const hasError = (fieldName) => {
    return errors[fieldName] !== undefined;
  };

  // Helper function to get the appropriate class for an input field
  const getInputClassName = (fieldName) => {
    const baseClass = "mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm px-3 py-2 border transition-colors";
    return hasError(fieldName) 
      ? `${baseClass} border-red-500 bg-red-50 focus:border-red-500` 
      : `${baseClass} border-gray-300 focus:border-blue-500`;
  };

  // Create an error message component
  const ErrorMessage = ({ fieldName }) => {
    if (!hasError(fieldName)) return null;
    
    return (
      <p className="mt-1 text-sm text-red-600 font-medium flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {errors[fieldName]}
      </p>
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();

    // Contact info
    const fullName = e.target.fullName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const address = e.target.address.value;

    // Selected countries
    const selectedCountries = [];
    countryOptions.forEach(country => {
      if (e.target[`country-${country}`]?.checked) {
        selectedCountries.push(country);
      }
    });
    const otherCountry = e.target.otherCountry.value;
    if (otherCountry) {
      selectedCountries.push(`Друго: ${otherCountry}`);
    }

    // Languages
    const languages = e.target.languages.value;

    // Job positions
    const selectedPositions = [];
    positionOptions.forEach(position => {
      if (e.target[`position-${position}`]?.checked) {
        selectedPositions.push(position);
      }
    });
    const otherPosition = e.target.otherPosition.value;
    if (otherPosition) {
      selectedPositions.push(`Друго: ${otherPosition}`);
    }

    // Work hours
    const startTime = e.target.startTime.value;
    const endTime = e.target.endTime.value;
    const workDays = e.target.workDays.value;
    const weeklyHours = e.target.weeklyHours.value;

    // Days off
    const daysOff = e.target.daysOff.value;
    const paidLeave = e.target.paidLeave.value;

    // Accommodation
    const accommodation = e.target.accommodation.value;

    // Food
    const food = e.target.food.value;

    // Salary
    const monthlySalary = e.target.monthlySalary.value;
    const bonuses = e.target.bonuses.value;

    // Start date
    const startDate = e.target.startDate.value;

    // Additional requirements
    const additionalRequirements = e.target.additionalRequirements.value;

    // Append all values to formData
    formData.append("_wpcf7_unit_tag", "48");
    formData.append("your-name", fullName);
    formData.append("your-phone", phone);
    formData.append("your-email", email);
    formData.append("your-address", address);
    
    // Add subject using serviceName if available
    formData.append("your-subject", `Заявка за ${serviceName}`);
    
    // Use text fields instead of select fields
    formData.append("your-countries", selectedCountries.join(", "));
    formData.append("your-countries-other", otherCountry);
    
    formData.append("your-languages", languages);
    
    // Use text fields instead of select fields
    formData.append("your-positions", selectedPositions.join(", "));
    formData.append("your-positions-other", otherPosition);
    
    formData.append("your-start-time", startTime);
    formData.append("your-end-time", endTime);
    formData.append("your-work-days", workDays);
    formData.append("your-weekly-hours", weeklyHours);
    formData.append("your-days-off", daysOff);
    formData.append("your-paid-leave", paidLeave);
    formData.append("your-accommodation", accommodation);
    formData.append("your-food", food);
    formData.append("your-salary", monthlySalary);
    formData.append("your-bonuses", bonuses);
    formData.append("your-start-date", startDate);
    formData.append("your-additional-requirements", additionalRequirements);
    formData.append("your-service-id", serviceId || "");
    formData.append("your-service-name", serviceName || "");

    const reqOptions = {
      method: "POST",
      body: formData,
    };

    try {
      console.log("Form submission data:", Object.fromEntries(formData));
      
      const req = await fetch(URL_FORM, reqOptions);
      const response = await req.json();

      if (response.status === "validation_failed") {
        let fieldErrors = {};
        response.invalid_fields.forEach((field) => {
          fieldErrors[field.field] = field.message;
        });
        setErrors(fieldErrors);
      } else if (response.status === "mail_sent") {
        Swal.fire({
          icon: "success",
          title: "Успешно изпратено!",
          text: "Очаквайте отговор скоро : )",
          timer: 4000,
        });
        setErrors({});
        e.target.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Грешка при изпращане!",
          text: "Моля, опитайте отново по-късно.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Неуспешно изпращане!",
        text: "Проверете връзката с интернет и опитайте отново.",
      });
    }

    setLoading(false);
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-white z-10 pointer-events-none">
          <div className="w-12 h-12 border-4 border-gray-400 border-t-[#005e9e] rounded-full animate-spin"></div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={`px-6 pt-10 pb-16 lg:px-8 lg:py-16 ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="mx-auto max-w-2xl">
          {/* Hidden Service Fields */}
          <input type="hidden" id="serviceId" name="serviceId" value={serviceId || ""} />
          <input type="hidden" id="serviceName" name="serviceName" value={serviceName || ""} />
          
          {/* Contact Information */}
          <div className={`border-b border-gray-200 pb-6 mb-6 ${hasError("your-name") || hasError("your-phone") || hasError("your-email") || hasError("your-address") ? "error-field" : ""}`}>
            <h3 className="text-lg font-semibold mb-4">Контактна информация</h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-4">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Две имена*</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className={getInputClassName("your-name")}
                />
                <ErrorMessage fieldName="your-name" />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Телефон за връзка*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className={getInputClassName("your-phone")}
                />
                <ErrorMessage fieldName="your-phone" />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Имейл адрес*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={getInputClassName("your-email")}
                />
                <ErrorMessage fieldName="your-email" />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Адрес (квартал и град)*</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className={getInputClassName("your-address")}
                />
                <ErrorMessage fieldName="your-address" />
              </div>
            </div>
          </div>
          
          {/* Preferred Countries */}
          <div className={`border-b border-gray-200 pb-6 mb-6 ${hasError("your-countries") ? "error-field" : ""}`}>
            <h3 className="text-lg font-semibold mb-4">Предпочитания относно произход на кандидата</h3>
            <div className="grid grid-cols-2 gap-y-2 sm:grid-cols-3 mb-4">
              {countryOptions.map(country => (
                <div key={country} className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id={`country-${country}`}
                      name={`country-${country}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label htmlFor={`country-${country}`} className="font-medium text-gray-700">
                      {country}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="otherCountry" className="block text-sm font-medium text-gray-700">Друго</label>
              <input
                type="text"
                id="otherCountry"
                name="otherCountry"
                className={getInputClassName("your-countries-other")}
              />
            </div>
            <ErrorMessage fieldName="your-countries" />
          </div>
          
          {/* Languages */}
          <div className={`border-b border-gray-200 pb-6 mb-6 ${hasError("your-languages") ? "error-field" : ""}`}>
            <h3 className="text-lg font-semibold mb-4">Езици, които трябва да говори кандидатът</h3>
            <div>
              <input
                type="text"
                id="languages"
                name="languages"
                className={getInputClassName("your-languages")}
                placeholder="Например: английски, руски, български"
              />
              <ErrorMessage fieldName="your-languages" />
            </div>
          </div>
          
          {/* Job Positions */}
          <div className={`border-b border-gray-200 pb-6 mb-6 ${hasError("your-positions") ? "error-field" : ""}`}>
            <h3 className="text-lg font-semibold mb-4">Основни задължения</h3>
            <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 mb-4">
              {positionOptions.map(position => (
                <div key={position} className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id={`position-${position}`}
                      name={`position-${position}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label htmlFor={`position-${position}`} className="font-medium text-gray-700">
                      {position}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="otherPosition" className="block text-sm font-medium text-gray-700">Друго</label>
              <input
                type="text"
                id="otherPosition"
                name="otherPosition"
                className={getInputClassName("your-positions-other")}
              />
            </div>
            <ErrorMessage fieldName="your-positions" />
          </div>
          
          {/* Work Hours */}
          <div className={`border-b border-gray-200 pb-6 mb-6 ${hasError("your-start-time") || hasError("your-end-time") || hasError("your-work-days") || hasError("your-weekly-hours") ? "error-field" : ""}`}>
            <h3 className="text-lg font-semibold mb-4">Работно време</h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Начален час</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className={getInputClassName("your-start-time")}
                />
                <ErrorMessage fieldName="your-start-time" />
              </div>
              
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Краен час</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className={getInputClassName("your-end-time")}
                />
                <ErrorMessage fieldName="your-end-time" />
              </div>
              
              <div>
                <label htmlFor="workDays" className="block text-sm font-medium text-gray-700">Работни дни в седмицата</label>
                <input
                  type="number"
                  id="workDays"
                  name="workDays"
                  min="1"
                  max="7"
                  className={getInputClassName("your-work-days")}
                />
                <ErrorMessage fieldName="your-work-days" />
              </div>
              
              <div>
                <label htmlFor="weeklyHours" className="block text-sm font-medium text-gray-700">Общ брой работни часове на седмица</label>
                <input
                  type="number"
                  id="weeklyHours"
                  name="weeklyHours"
                  min="1"
                  className={getInputClassName("your-weekly-hours")}
                />
                <ErrorMessage fieldName="your-weekly-hours" />
              </div>
            </div>
          </div>
          
          {/* Days Off and Leave */}
          <div className={`border-b border-gray-200 pb-6 mb-6 ${hasError("your-days-off") || hasError("your-paid-leave") ? "error-field" : ""}`}>
            <h3 className="text-lg font-semibold mb-4">Почивни дни и отпуски</h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="daysOff" className="block text-sm font-medium text-gray-700">Брой почивни дни седмично</label>
                <input
                  type="number"
                  id="daysOff"
                  name="daysOff"
                  min="0"
                  max="7"
                  className={getInputClassName("your-days-off")}
                />
                <ErrorMessage fieldName="your-days-off" />
              </div>
              
              <div>
                <label htmlFor="paidLeave" className="block text-sm font-medium text-gray-700">Платен годишен отпуск (в дни)</label>
                <input
                  type="number"
                  id="paidLeave"
                  name="paidLeave"
                  min="0"
                  className={getInputClassName("your-paid-leave")}
                />
                <ErrorMessage fieldName="your-paid-leave" />
              </div>
            </div>
          </div>
          
          {/* Accommodation */}
          <div className={`border-b border-gray-200 pb-6 mb-6 ${hasError("your-accommodation") ? "error-field" : ""}`}>
            <h3 className="text-lg font-semibold mb-4">Настаняване</h3>
            <div>
              <select
                id="accommodation"
                name="accommodation"
                className={getInputClassName("your-accommodation")}
              >
                <option value="">Изберете опция</option>
                <option value="Осигурено от работодателя">Осигурено от работодателя</option>
                <option value="Самостоятелно настаняване">Самостоятелно настаняване</option>
                <option value="Споделено настаняване">Споделено настаняване</option>
                <option value="Друго">Друго</option>
              </select>
              <ErrorMessage fieldName="your-accommodation" />
            </div>
          </div>
          
          {/* Food */}
          <div className={`border-b border-gray-200 pb-6 mb-6 ${hasError("your-food") ? "error-field" : ""}`}>
            <h3 className="text-lg font-semibold mb-4">Храна</h3>
            <div>
              <select
                id="food"
                name="food"
                className={getInputClassName("your-food")}
              >
                <option value="">Изберете опция</option>
                <option value="Осигурена храна на място">Осигурена храна на място</option>
                <option value="Купони за храна">Купони за храна</option>
                <option value="Самостоятелно пазаруване">Самостоятелно пазаруване</option>
                <option value="Друго">Друго</option>
              </select>
              <ErrorMessage fieldName="your-food" />
            </div>
          </div>
          
          {/* Salary */}
          <div className={`border-b border-gray-200 pb-6 mb-6 ${hasError("your-salary") || hasError("your-bonuses") ? "error-field" : ""}`}>
            <h3 className="text-lg font-semibold mb-4">Заплащане</h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="monthlySalary" className="block text-sm font-medium text-gray-700">Месечна нетна заплата (лв.)</label>
                <input
                  type="number"
                  id="monthlySalary"
                  name="monthlySalary"
                  min="0"
                  className={getInputClassName("your-salary")}
                />
                <ErrorMessage fieldName="your-salary" />
              </div>
              
              <div>
                <label htmlFor="bonuses" className="block text-sm font-medium text-gray-700">Допълнителни бонуси/премии</label>
                <input
                  type="text"
                  id="bonuses"
                  name="bonuses"
                  className={getInputClassName("your-bonuses")}
                />
                <ErrorMessage fieldName="your-bonuses" />
              </div>
            </div>
          </div>
          
          {/* Start Date */}
          <div className={`border-b border-gray-200 pb-6 mb-6 ${hasError("your-start-date") ? "error-field" : ""}`}>
            <h3 className="text-lg font-semibold mb-4">Начална дата за започване на работа</h3>
            <div>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className={getInputClassName("your-start-date")}
              />
              <ErrorMessage fieldName="your-start-date" />
            </div>
          </div>
          
          {/* Additional Requirements */}
          <div className={`mb-6 ${hasError("your-additional-requirements") ? "error-field" : ""}`}>
            <h3 className="text-lg font-semibold mb-4">Допълнителни изисквания или предпочитания</h3>
            <div>
              <textarea
                id="additionalRequirements"
                name="additionalRequirements"
                rows="4"
                className={getInputClassName("your-additional-requirements")}
              ></textarea>
              <ErrorMessage fieldName="your-additional-requirements" />
            </div>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              className="w-full rounded-md bg-[#005e9e] px-3.5 py-2.5 text-center font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              Изпрати заявка
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 