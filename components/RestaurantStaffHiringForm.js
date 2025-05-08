"use client";

import { useState } from "react";
import Swal from "sweetalert2";

const URL_FORM =
  "https://findstaff.admin-panels.com/wp-json/contact-form-7/v1/contact-forms/48/feedback";

export default function RestaurantStaffHiringForm({ serviceId }) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

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
    formData.append("your-countries", selectedCountries.join(", "));
    formData.append("your-languages", languages);
    formData.append("your-positions", selectedPositions.join(", "));
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

    const reqOptions = {
      method: "POST",
      body: formData,
    };

    try {
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
          {/* Contact Information */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Контактна информация</h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-4">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Две имена*</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
                {errors["your-name"] && <p className="mt-1 text-sm text-red-600">{errors["your-name"]}</p>}
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Телефон за връзка*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
                {errors["your-phone"] && <p className="mt-1 text-sm text-red-600">{errors["your-phone"]}</p>}
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Имейл адрес*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
                {errors["your-email"] && <p className="mt-1 text-sm text-red-600">{errors["your-email"]}</p>}
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Адрес (квартал и град)*</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
                {errors["your-address"] && <p className="mt-1 text-sm text-red-600">{errors["your-address"]}</p>}
              </div>
            </div>
          </div>
          
          {/* Preferred Countries */}
          <div className="border-b border-gray-200 pb-6 mb-6">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>
          </div>
          
          {/* Languages */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Езици, които трябва да говори кандидатът</h3>
            <div>
              <input
                type="text"
                id="languages"
                name="languages"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                placeholder="Например: английски, руски, български"
              />
              {errors["your-languages"] && <p className="mt-1 text-sm text-red-600">{errors["your-languages"]}</p>}
            </div>
          </div>
          
          {/* Job Positions */}
          <div className="border-b border-gray-200 pb-6 mb-6">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>
          </div>
          
          {/* Work Hours */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Работно време</h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Начален час</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
              </div>
              
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Краен час</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
              </div>
              
              <div>
                <label htmlFor="workDays" className="block text-sm font-medium text-gray-700">Работни дни в седмицата</label>
                <input
                  type="number"
                  id="workDays"
                  name="workDays"
                  min="1"
                  max="7"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
              </div>
              
              <div>
                <label htmlFor="weeklyHours" className="block text-sm font-medium text-gray-700">Общ брой работни часове на седмица</label>
                <input
                  type="number"
                  id="weeklyHours"
                  name="weeklyHours"
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
              </div>
            </div>
          </div>
          
          {/* Days Off and Leave */}
          <div className="border-b border-gray-200 pb-6 mb-6">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
              </div>
              
              <div>
                <label htmlFor="paidLeave" className="block text-sm font-medium text-gray-700">Платен годишен отпуск (в дни)</label>
                <input
                  type="number"
                  id="paidLeave"
                  name="paidLeave"
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
              </div>
            </div>
          </div>
          
          {/* Accommodation */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Настаняване</h3>
            <div>
              <select
                id="accommodation"
                name="accommodation"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              >
                <option value="">Изберете опция</option>
                <option value="Осигурено от работодателя">Осигурено от работодателя</option>
                <option value="Самостоятелно настаняване">Самостоятелно настаняване</option>
                <option value="Споделено настаняване">Споделено настаняване</option>
                <option value="Друго">Друго</option>
              </select>
              {errors["your-accommodation"] && <p className="mt-1 text-sm text-red-600">{errors["your-accommodation"]}</p>}
            </div>
          </div>
          
          {/* Food */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Храна</h3>
            <div>
              <select
                id="food"
                name="food"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              >
                <option value="">Изберете опция</option>
                <option value="Осигурена храна на място">Осигурена храна на място</option>
                <option value="Купони за храна">Купони за храна</option>
                <option value="Самостоятелно пазаруване">Самостоятелно пазаруване</option>
                <option value="Друго">Друго</option>
              </select>
              {errors["your-food"] && <p className="mt-1 text-sm text-red-600">{errors["your-food"]}</p>}
            </div>
          </div>
          
          {/* Salary */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Заплащане</h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="monthlySalary" className="block text-sm font-medium text-gray-700">Месечна нетна заплата (лв.)</label>
                <input
                  type="number"
                  id="monthlySalary"
                  name="monthlySalary"
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
                {errors["your-salary"] && <p className="mt-1 text-sm text-red-600">{errors["your-salary"]}</p>}
              </div>
              
              <div>
                <label htmlFor="bonuses" className="block text-sm font-medium text-gray-700">Допълнителни бонуси/премии</label>
                <input
                  type="text"
                  id="bonuses"
                  name="bonuses"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
              </div>
            </div>
          </div>
          
          {/* Start Date */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Начална дата за започване на работа</h3>
            <div>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
              {errors["your-start-date"] && <p className="mt-1 text-sm text-red-600">{errors["your-start-date"]}</p>}
            </div>
          </div>
          
          {/* Additional Requirements */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Допълнителни изисквания или предпочитания</h3>
            <div>
              <textarea
                id="additionalRequirements"
                name="additionalRequirements"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              ></textarea>
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