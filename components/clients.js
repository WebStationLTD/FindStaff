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
          <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-2 sm:gap-y-2 lg:mx-0 lg:max-w-none lg:pl-8">
            <Image
              alt="KFC"
              src="https://findstaff.admin-panels.com/wp-content/uploads/2025/04/kfc-logo.jpg"
              width={200}
              height={200}
              quality={80}
              loading="lazy"
              className="max-h-48 w-full object-contain object-left"
            />
            <Image
              alt="Action Aquapark Sunny Beach"
              src="https://findstaff.admin-panels.com/wp-content/uploads/2025/04/action-aquapark-sunny-beach-logo.jpg"
              width={200}
              height={200}
              quality={80}
              loading="lazy"
              className="max-h-48 w-full object-contain object-left"
            />
            <Image
              alt="Radina's Way"
              src="https://findstaff.admin-panels.com/wp-content/uploads/2025/04/radinas-way-logo.jpg"
              width={200}
              height={200}
              quality={80}
              loading="lazy"
              className="max-h-48 w-full object-contain object-left"
            />
            <Image
              alt="Venid Yacht"
              src="https://findstaff.admin-panels.com/wp-content/uploads/2025/04/venid-yacht-logo.jpg"
              width={200}
              height={200}
              quality={80}
              loading="lazy"
              className="max-h-48 w-full object-contain object-left"
            />
            <Image
              alt="Car Rent"
              src="https://findstaff.admin-panels.com/wp-content/uploads/2025/04/car-rent-logo.jpg"
              width={200}
              height={200}
              quality={80}
              loading="lazy"
              className="max-h-48 w-full object-contain object-left"
            />
            <Image
              alt="Avtoserviz"
              src="https://findstaff.admin-panels.com/wp-content/uploads/2025/04/avtoserviz-logo.jpg"
              width={200}
              height={200}
              quality={80}
              loading="lazy"
              className="max-h-48 w-full object-contain object-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
