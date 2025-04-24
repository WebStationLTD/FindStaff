// import Link from "next/link";
// import LazyImageObserver from "./LazyImageObserver";

// export default function Hero() {
//   return (
//     <>
//       <LazyImageObserver />
//       <div className="bg-white">
//         {/* Мобилен Hero с изображение най-отгоре - ще бъде LCP елемент за мобилни */}
//         <div className="lg:hidden relative">
//           <div className="w-full">
//             {/* Директно използване на HTML img за максимална производителност на LCP */}
//             <img
//               src="/hero-image-mobile.jpg"
//               width={640}
//               height={400}
//               alt="Hero image"
//               className="w-full h-auto object-cover aspect-[4/3]"
//               loading="eager"
//               decoding="sync"
//               fetchPriority="high"
//               style={{
//                 objectFit: "cover",
//                 contentVisibility: "auto",
//                 containIntrinsicSize: "640px 400px",
//               }}
//               id="hero-mobile-lcp"
//             />
//           </div>

//           <div className="px-6 py-10">
//             <h1 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 font-display">
//               Агенция за персонал
//             </h1>
//             <p className="mt-4 text-2xl font-medium font-display">
//               от 3-ти страни
//             </p>
//             <p className="mt-6 text-sm font-medium text-pretty text-gray-500 font-display">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//               enim ad minim veniam, quis nostrud exercitation ullamco laboris
//               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//               reprehenderit in voluptate velit esse cillum dolore eu fugiat
//               nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//               sunt in culpa qui officia deserunt mollit anim id est laborum.
//             </p>
//             <div className="mt-8 flex items-center gap-x-4">
//               <Link
//                 href="/services"
//                 className="rounded-md bg-[#005e9e] hover:bg-gray-300 hover:text-[#000000] px-3 py-2 text-sm font-semibold text-black shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Услуги
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-sm font-semibold text-gray-900"
//               >
//                 Контакти <span aria-hidden="true">→</span>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Десктоп Hero с текст вляво и изображение вдясно */}
//         <div className="hidden lg:block relative">
//           <div className="mx-auto max-w-7xl">
//             <div className="relative z-10 pt-0 lg:w-full lg:max-w-2xl">
//               <svg
//                 viewBox="0 0 100 100"
//                 preserveAspectRatio="none"
//                 aria-hidden="true"
//                 className="absolute inset-y-0 right-8 h-full w-80 translate-x-1/2 transform fill-white"
//               >
//                 <polygon points="0,0 90,0 50,100 0,100" />
//               </svg>
//               <div className="relative px-6 py-12 lg:px-8 lg:py-14 lg:pr-0">
//                 <div className="ml-0 mr-auto max-w-2xl lg:mx-0 lg:max-w-xl">
//                   <div className="mt-2 mb-10 flex">
//                     <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
//                       Полезни статии и новини от нашия блог.{" "}
//                       <Link
//                         href="/blog"
//                         className="font-semibold whitespace-nowrap text-[#005e9e]"
//                       >
//                         <span aria-hidden="true" className="absolute inset-0" />
//                         Вижте повече <span aria-hidden="true">&rarr;</span>
//                       </Link>
//                     </div>
//                   </div>
//                   <h1 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl font-display">
//                     Агенция за персонал
//                   </h1>
//                   <p className="mt-8 text-4xl font-medium font-display">
//                     от 3-ти страни
//                   </p>
//                   <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 font-display">
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                     do eiusmod tempor incididunt ut labore et dolore magna
//                     aliqua. Ut enim ad minim veniam, quis nostrud exercitation
//                     ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                     Duis aute irure dolor in reprehenderit in voluptate velit
//                     esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
//                     occaecat cupidatat non proident, sunt in culpa qui officia
//                     deserunt mollit anim id est laborum.
//                   </p>
//                   <div className="mt-10 flex items-center gap-x-6">
//                     <Link
//                       href="/services"
//                       className="rounded-md text-[#000000] bg-[#005e9e] hover:bg-gray-300 hover:text-[#000000] px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                       Услуги
//                     </Link>
//                     <Link
//                       href="/contact"
//                       className="text-sm/6 font-semibold text-gray-900"
//                     >
//                       Контакти <span aria-hidden="true">→</span>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 absolute inset-y-0 right-0 w-1/2">
//             {/* Директно използване на HTML img за десктоп версията */}
//             <img
//               src="/hero-image-desktop.jpg"
//               width={955}
//               height={776}
//               alt="Hero image"
//               className="h-full w-full object-cover"
//               loading="eager"
//               decoding="sync"
//               fetchPriority="high"
//               style={{
//                 objectFit: "cover",
//                 contentVisibility: "auto",
//                 containIntrinsicSize: "955px 776px",
//               }}
//               id="hero-desktop-lcp"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

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
              className="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:pt-10 lg:px-8 lg:pt-12">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                    Агенция за подбор персонал
                  </h1>
                  <h2 className="mt-10 text-4xl font-bold tracking-tight text-black">
                    от 3-ти страни и други държави
                  </h2>
                  <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                    „Find Staff“ е надежден партньор в подбора на квалифицирани
                    служители, който свързва работодатели с най-подходящите
                    кандидати. Със стратегически подход, иновативни методи и
                    дългогодишен опит в човешките ресурси, ние помагаме на
                    компаниите да изграждат силни, мотивирани екипи, които
                    движат бизнеса напред.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <a
                      href="/services"
                      className="rounded-md bg-[#005e9e] hover:bg-gray-300 cursor-pointer hover:text-[#000000] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Услуги
                    </a>
                    <a
                      href="/contact"
                      className="text-sm/6 font-semibold text-gray-900"
                    >
                      Контакти <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
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
