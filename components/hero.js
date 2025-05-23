"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white overflow-hidden">
      <main>
        <div className="relative isolate">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          >
            <div
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
              className="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-[#005e9e] to-[#ffffff] opacity-80"
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-8 pb-24 sm:pt-10 lg:px-8 lg:pt-12">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 flex flex-col-reverse lg:flex-row lg:max-w-none lg:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl mt-8 lg:mt-0">
                  <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                    Агенция за подбор на персонал
                  </h1>
                  <h2 className="mt-10 text-4xl font-bold tracking-tight text-black">
                    от 3-ти страни и други държави
                  </h2>
                  <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                    „Find Staff" е надежден партньор в подбора на квалифицирани
                    служители, който свързва работодатели с най-подходящите
                    кандидати. Със стратегически подход, иновативни методи и
                    дългогодишен опит в човешките ресурси, ние помагаме на
                    компаниите да изграждат силни, мотивирани екипи, които
                    движат бизнеса напред.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link
                      href="/services"
                      className="rounded-md bg-[#005e9e] hover:bg-gray-300 cursor-pointer hover:text-[#000000] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Услуги
                    </Link>
                    <Link
                      href="/contact"
                      className="text-sm/6 font-semibold text-gray-900"
                    >
                      Контакти <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>

                {/* Мобилна версия със снимки (абстрактно подреждане) */}
                <div
                  className="flex flex-wrap lg:hidden w-full mx-auto relative"
                  style={{ height: "420px", width: "100%" }}
                >
                  <div
                    className="absolute"
                    style={{ left: "10px", top: "0px", width: "130px" }}
                  >
                    <img
                      alt=""
                      src="детегледачки-hero.jpg"
                      className="h-[176px] w-[264px] rounded-lg bg-gray-900/5 object-cover shadow-lg"
                    />
                  </div>

                  <div
                    className="absolute"
                    style={{ right: "10px", top: "0", width: "130px" }}
                  >
                    <img
                      alt=""
                      src="хотелски-персонал-hero.jpg"
                      className="h-[176px] w-[264px] rounded-lg bg-gray-900/5 object-cover shadow-lg"
                    />
                  </div>

                  <div
                    className="absolute"
                    style={{ left: "10px", bottom: "20px", width: "130px" }}
                  >
                    <img
                      alt=""
                      src="ресторантьорски-персонал-hero.jpg"
                      className="h-[176px] w-[264px] rounded-lg bg-gray-900/5 object-cover shadow-lg"
                    />
                  </div>

                  <div
                    className="absolute sm-block hidden"
                    style={{ right: "40px", top: "230px", width: "100px" }}
                  >
                    <img
                      alt=""
                      src="hero-4.jpg"
                      className="h-[176px] w-[264px] rounded-lg bg-gray-900/5 object-cover shadow-lg"
                    />
                  </div>

                  <div
                    className="absolute"
                    style={{ right: "10px", bottom: "20px", width: "130px" }}
                  >
                    <img
                      alt=""
                      src="строителни-работници-hero.jpg"
                      className="h-[176px] w-[264px] rounded-lg bg-gray-900/5 object-cover shadow-lg"
                    />
                  </div>
                </div>

                {/* Десктоп версия със снимки */}
                <div className="hidden lg:flex mt-14 justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        alt=""
                        src="детегледачки-hero.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        alt=""
                        src="хотелски-персонал-hero.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src="ресторантьорски-персонал-hero.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        alt=""
                        src="hero-4.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src="строителни-работници-hero.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
