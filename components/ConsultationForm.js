"use client";

import { useState } from "react";
import Swal from "sweetalert2";

const URL_FORM =
  "https://findstaff.admin-panels.com/wp-json/contact-form-7/v1/contact-forms/45/feedback";

export default function ConsultationForm({ serviceId }) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phoneNumber = e.target["phone-number"].value;
    const date = e.target.date.value;
    const time = e.target.time.value;
    const consultationType = e.target["consultation-type"].value;
    const message = e.target.message.value;

    formData.append("_wpcf7_unit_tag", "45");
    formData.append("your-name", name);
    formData.append("your-email", email);
    formData.append("your-tel", phoneNumber);
    formData.append("your-date", date);
    formData.append("your-time", time);
    formData.append("your-consultation-type", consultationType);
    formData.append("your-message", message);
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
          text: "Очаквайте потвърждение скоро : )",
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
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-10 pointer-events-none">
          <div className="w-12 h-12 border-4 border-gray-400 border-t-[#005e9e] rounded-full animate-spin"></div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={`px-6 pt-10 pb-16 sm:pb-16 lg:px-8 lg:py-16 ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Име*
              </label>
              <div className="mt-2.5">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
              {errors["your-name"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["your-name"]}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Имейл*
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
              {errors["your-email"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["your-email"]}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Телефон*
              </label>
              <div className="mt-2.5">
                <input
                  id="phone-number"
                  name="phone-number"
                  type="tel"
                  autoComplete="tel"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
              {errors["your-tel"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["your-tel"]}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Дата*
              </label>
              <div className="mt-2.5">
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
              {errors["your-date"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["your-date"]}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Час*
              </label>
              <div className="mt-2.5">
                <select
                  id="time"
                  name="time"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                  <option value="">Изберете час</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                </select>
              </div>
              {errors["your-time"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["your-time"]}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="consultation-type"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Тип консултация*
              </label>
              <div className="mt-2.5">
                <select
                  id="consultation-type"
                  name="consultation-type"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                  <option value="">Изберете тип</option>
                  <option value="онлайн">Онлайн</option>
                  <option value="на място">На място</option>
                  <option value="телефонна">Телефонна</option>
                </select>
              </div>
              {errors["your-consultation-type"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["your-consultation-type"]}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Допълнителна информация
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-[#005e9e] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-gray-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading}
            >
              Запазете час
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 