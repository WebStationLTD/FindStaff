"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Функция за проверка на позицията при скролване
  const toggleVisibility = () => {
    // Показваме бутона, когато скролнем на 300px надолу
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Функция за плавно скролване нагоре
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Добавяме event listener за скролване
    window.addEventListener("scroll", toggleVisibility);

    // Почистваме event listener при unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-[#005e9e] text-white rounded-full shadow-lg hover:bg-[#004c7f] transition-all duration-300 transform hover:scale-110 focus:outline-none"
          aria-label="Скролни нагоре"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
