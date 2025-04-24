import Image from "next/image";

export default function Clients() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Надеждни партньорства
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Нашата агенция си сътрудничи с престижни международни организации
              и доказани бизнес лидери, които ни се доверяват за подбора на
              висококвалифициран персонал. Изградили сме стратегически
              партньорства в множество индустрии, включително производство,
              хотелиерство, IT сектор и здравеопазване. Благодарение на тези
              сътрудничества имаме уникалната възможност да свържем най-добрите
              таланти от развиващите се пазари с водещи компании, които търсят
              професионалисти, готови да допринесат за техния растеж и иновации.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
            <Image
              alt="Tuple"
              src="https://tailwindui.com/plus-assets/img/logos/tuple-logo-gray-900.svg"
              width={105}
              height={48}
              quality={80}
              loading="lazy"
              className="max-h-12 w-full object-contain object-left"
            />
            <Image
              alt="Reform"
              src="https://tailwindui.com/plus-assets/img/logos/reform-logo-gray-900.svg"
              width={104}
              height={48}
              quality={80}
              loading="lazy"
              className="max-h-12 w-full object-contain object-left"
            />
            <Image
              alt="SavvyCal"
              src="https://tailwindui.com/plus-assets/img/logos/savvycal-logo-gray-900.svg"
              width={140}
              height={48}
              quality={80}
              loading="lazy"
              className="max-h-12 w-full object-contain object-left"
            />
            <Image
              alt="Laravel"
              src="https://tailwindui.com/plus-assets/img/logos/laravel-logo-gray-900.svg"
              width={136}
              height={48}
              quality={80}
              loading="lazy"
              className="max-h-12 w-full object-contain object-left"
            />
            <Image
              alt="Transistor"
              src="https://tailwindui.com/plus-assets/img/logos/transistor-logo-gray-900.svg"
              width={158}
              height={48}
              quality={80}
              loading="lazy"
              className="max-h-12 w-full object-contain object-left"
            />
            <Image
              alt="Statamic"
              src="https://tailwindui.com/plus-assets/img/logos/statamic-logo-gray-900.svg"
              width={147}
              height={48}
              quality={80}
              loading="lazy"
              className="max-h-12 w-full object-contain object-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
