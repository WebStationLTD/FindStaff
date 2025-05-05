"use client";

import { useState } from "react";
import Swal from "sweetalert2";

const URL_FORM =
  "https://findstaff.admin-panels.com/wp-json/contact-form-7/v1/contact-forms/44/feedback";

export default function JobApplicationForm({ serviceId }) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phoneNumber = e.target["phone-number"].value;
    const position = e.target.position.value;
    const experience = e.target.experience.value;
    const message = e.target.message.value;
    const cv = e.target.cv.files[0];

    formData.append("_wpcf7_unit_tag", "44");
    formData.append("your-name", name);
    formData.append("your-email", email);
    formData.append("your-tel", phoneNumber);
    formData.append("your-position", position);
    formData.append("your-experience", experience);
    formData.append("your-message", message);
    formData.append("your-service-id", serviceId || "");
    if (cv) {
      formData.append("your-cv", cv);
    }

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
            <div className="sm:col-span-2">
              <label
                htmlFor="position"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Позиция*
              </label>
              <div className="mt-2.5">
                <input
                  id="position"
                  name="position"
                  type="text"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
              {errors["your-position"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["your-position"]}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="experience"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Опит (години)*
              </label>
              <div className="mt-2.5">
                <select
                  id="experience"
                  name="experience"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                  <option value="">Изберете</option>
                  <option value="0-1">По-малко от 1 година</option>
                  <option value="1-3">1-3 години</option>
                  <option value="3-5">3-5 години</option>
                  <option value="5+">Над 5 години</option>
                </select>
              </div>
              {errors["your-experience"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["your-experience"]}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="cv"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Автобиография (CV)*
              </label>
              <div className="mt-2.5">
                <input
                  id="cv"
                  name="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
              {errors["your-cv"] && (
                <p className="text-red-600 text-sm mt-1">{errors["your-cv"]}</p>
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
              Изпрати кандидатура
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 