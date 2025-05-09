"use client";

import { useState, useEffect } from "react";
import useSubscribe from "../hooks/useSubscribe";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { getServicesNav } from "../services/services";

const navigation = {
  pages: [
    { name: "Начало", href: "/" },
    { name: "За нас", href: "/about" },
    { name: "Екип", href: "/team" },
    { name: "Блог", href: "/blog" },
    { name: "Контакти", href: "/contact" },
  ],
  legal: [{ name: "Политика за поверителност", href: "/privacy-policy" }],
  social: [
    {
      name: "Instagram",
      href: "#",
      icon: FaInstagram,
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ],
};

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState("");
  const { subscribe, loading } = useSubscribe();
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await subscribe(email, () => setEmail(""));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentYear = new Date().getFullYear();
      if (currentYear !== year) {
        setYear(currentYear);
      }
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [year]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const servicesData = await getServicesNav();
        if (servicesData && Array.isArray(servicesData)) {
          const formattedServices = servicesData.map((service) => ({
            name: service.title.rendered,
            href: `/services/${service.slug}`,
          }));
          setServices(formattedServices);
        }
        setServicesLoading(false);
      } catch (error) {
        console.error("Error fetching services for footer:", error);
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Function to chunk the services array into columns
  const getServiceColumns = (services, columns = 2) => {
    if (!services || !services.length) return [];

    const itemsPerColumn = Math.ceil(services.length / columns);
    const result = [];

    for (let i = 0; i < columns; i++) {
      const startIndex = i * itemsPerColumn;
      const columnServices = services.slice(
        startIndex,
        startIndex + itemsPerColumn
      );
      if (columnServices.length > 0) {
        result.push(columnServices);
      }
    }

    return result;
  };

  // Get service columns based on responsive layout
  const serviceColumns = getServiceColumns(services, 2);

  return (
    <footer className="relative bg-white border border-t-[#eaeaea]">
      <div className="absolute left-0 top-0 bottom-0 z-10 w-1/3 h-full flex items-center justify-center pointer-events-none">
        <svg
          className="absolute w-full h-full opacity-100 hidden md:block sm:viewBox-[-150_0_500_1000] md:viewBox-[-150_0_500_800] lg:viewBox-[0_0_500_800]"
          viewBox="0 0 500 800"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Абстрактен деликатен дизайн с линии */}
          <line
            x1="17"
            y1="0"
            x2="483"
            y2="800"
            stroke="#005e9e"
            strokeWidth="0.8"
            opacity="0.2"
          />
          <line
            x1="96"
            y1="0"
            x2="337"
            y2="800"
            stroke="#005e9e"
            strokeWidth="0.7"
            opacity="0.15"
          />
          <line
            x1="204"
            y1="0"
            x2="291"
            y2="800"
            stroke="#005e9e"
            strokeWidth="0.5"
            opacity="0.12"
          />
          <line
            x1="262"
            y1="0"
            x2="452"
            y2="800"
            stroke="#005e9e"
            strokeWidth="0.4"
            opacity="0.1"
          />
          <line
            x1="307"
            y1="0"
            x2="133"
            y2="800"
            stroke="#005e9e"
            strokeWidth="0.6"
            opacity="0.18"
          />
          <line
            x1="352"
            y1="0"
            x2="63"
            y2="800"
            stroke="#005e9e"
            strokeWidth="0.5"
            opacity="0.15"
          />
          <line
            x1="437"
            y1="0"
            x2="31"
            y2="800"
            stroke="#005e9e"
            strokeWidth="0.4"
            opacity="0.12"
          />
          <line
            x1="155"
            y1="0"
            x2="267"
            y2="800"
            stroke="#005e9e"
            strokeWidth="0.35"
            opacity="0.11"
          />
          <line
            x1="394"
            y1="0"
            x2="109"
            y2="800"
            stroke="#005e9e"
            strokeWidth="0.45"
            opacity="0.13"
          />

          {/* Хоризонтални линии за повече абстракция */}
          <line
            x1="9"
            y1="158"
            x2="427"
            y2="158"
            stroke="#005e9e"
            strokeWidth="0.3"
            opacity="0.08"
          />
          <line
            x1="38"
            y1="416"
            x2="389"
            y2="416"
            stroke="#005e9e"
            strokeWidth="0.3"
            opacity="0.06"
          />
          <line
            x1="112"
            y1="631"
            x2="372"
            y2="631"
            stroke="#005e9e"
            strokeWidth="0.3"
            opacity="0.07"
          />
          <line
            x1="68"
            y1="346"
            x2="402"
            y2="346"
            stroke="#005e9e"
            strokeWidth="0.25"
            opacity="0.05"
          />

          {/* Малко диагонали в другата посока */}
          <line
            x1="28"
            y1="800"
            x2="397"
            y2="0"
            stroke="#005e9e"
            strokeWidth="0.6"
            opacity="0.1"
          />
          <line
            x1="137"
            y1="800"
            x2="257"
            y2="0"
            stroke="#005e9e"
            strokeWidth="0.5"
            opacity="0.08"
          />
          <line
            x1="246"
            y1="800"
            x2="362"
            y2="0"
            stroke="#005e9e"
            strokeWidth="0.4"
            opacity="0.07"
          />

          {/* Няколко къси линии за повече абстракция */}
          <line
            x1="32"
            y1="289"
            x2="237"
            y2="383"
            stroke="#005e9e"
            strokeWidth="0.4"
            opacity="0.1"
          />
          <line
            x1="273"
            y1="481"
            x2="447"
            y2="323"
            stroke="#005e9e"
            strokeWidth="0.35"
            opacity="0.08"
          />
          <line
            x1="153"
            y1="147"
            x2="281"
            y2="291"
            stroke="#005e9e"
            strokeWidth="0.3"
            opacity="0.05"
          />
          <line
            x1="297"
            y1="734"
            x2="392"
            y2="576"
            stroke="#005e9e"
            strokeWidth="0.35"
            opacity="0.07"
          />
          <line
            x1="83"
            y1="553"
            x2="173"
            y2="429"
            stroke="#005e9e"
            strokeWidth="0.3"
            opacity="0.06"
          />
        </svg>
      </div>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div>
            <img
              alt="Find Staff"
              src="/find-staff-logo.svg"
              width={180}
              height={40}
            />
          </div>
          <div className="mt-16 grid xl:col-span-2 xl:mt-0">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Страници колона */}
              <div>
                <h3 className="text-sm/6 font-semibold text-gray-900">
                  Страници
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.pages.map((page) => (
                    <li key={page.name}>
                      <Link
                        href={page.href}
                        className="text-sm/6 text-gray-600 hover:text-gray-900"
                        prefetch={true}
                      >
                        {page.name}
                      </Link>
                    </li>
                  ))}

                  {/* Правна информация в същата колона */}
                  <li className="pt-6 mt-6 border-t border-gray-100">
                    <h3 className="text-sm/6 font-semibold text-gray-900">
                      Правна информация
                    </h3>
                  </li>
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm/6 text-gray-600 hover:text-gray-900"
                        prefetch={true}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Услуги колона */}
              <div>
                <h3 className="text-sm/6 font-semibold text-gray-900">
                  Услуги
                </h3>
                {servicesLoading ? (
                  <div className="mt-6 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-gray-400 border-t-[#005e9e] rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                    {serviceColumns.map((column, columnIndex) => (
                      <div key={columnIndex} className="space-y-4">
                        {column.map((service) => (
                          <div key={service.name}>
                            <Link
                              href={service.href}
                              className="text-sm/6 text-gray-600 hover:text-gray-900"
                              prefetch={true}
                            >
                              {service.name}
                            </Link>
                          </div>
                        ))}
                        {columnIndex === serviceColumns.length - 1 && (
                          <div className="pt-2">
                            <Link
                              href="/services"
                              className="text-sm/6 font-medium text-[#005e9e] hover:text-gray-900"
                              prefetch={true}
                            >
                              Всички услуги →
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm/6 font-semibold text-gray-900">
              Абонирайте се за нашия бюлетин
            </h3>
            <p className="mt-2 text-sm/6 text-gray-600">
              Получавайте ценни съвети, анализи и актуални новини директно във
              вашата поща.
            </p>
          </div>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-10 pointer-events-none">
              <div className="w-12 h-12 border-4 border-gray-400 border-t-[#005e9e] rounded-full animate-spin"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className={`mt-6 sm:flex sm:max-w-md lg:mt-0 ${
              loading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              required
              placeholder="Въведете Вашия имейл"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-w-0 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:w-56 sm:text-sm/6"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-[#005e9e] hover:bg-gray-300 cursor-pointer hover:text-[#000000] px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Абонирайте се
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.target}
                rel={item.rel}
                className="text-gray-600 hover:text-gray-800"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0">
            &copy; {year} Find Staff, Inc. All rights reserved. Powered by{" "}
            <a
              href="https://webstation.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#95161C]"
            >
              WebStation™
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
