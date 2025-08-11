import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { getContactInfo } from "../../services/contacts";
import ContactForm from "../../components/contactForm"; // Вкарваме клиентската форма
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Контакти | FindStaff - Свържете се с нас за персонал от чужбина",
    description:
      "Имате нужда от квалифицирани или неквалифицирани работници от трети държави? Свържете се с FindStaff за професионално съдействие при наемане на персонал от Украйна, Молдова, Азербайджан и др.",
    keywords: [
      "контакти FindStaff",
      "наемане на персонал",
      "работници от трети държави",
      "легална процедура",
      "консултация чужди работници",
    ],
    openGraph: {
      title: "Контакти | FindStaff - Свържете се с нас за персонал от чужбина",
      description:
        "Имате нужда от квалифицирани или неквалифицирани работници от трети държави? Свържете се с FindStaff за професионално съдействие.",
      locale: "bg_BG",
      type: "website",
    },
    alternates: {
      canonical: "/contact",
    },
  };
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo();

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="px-6 pt-24 pb-20 sm:pt-24 lg:static lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Свържете се с нас
            </h2>
            {/* <p className="mt-6 text-lg/8 text-gray-600">
              Proin volutpat consequat porttitor cras nullam gravida at. Orci
              molestie a eu arcu. Sed ut tincidunt integer elementum id sem.
              Arcu sed malesuada et magna.
            </p> */}
            <dl className="mt-10 space-y-4 text-base text-gray-600">
              {contactInfo && (
                <>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <BuildingOffice2Icon className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd>{contactInfo.address}</dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <PhoneIcon className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd>
                      <Link
                        href={`tel:${contactInfo.phone_number}`}
                        className="hover:text-gray-900"
                      >
                        {contactInfo.phone_number}
                      </Link>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <EnvelopeIcon className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd>
                      <Link
                        href={`mailto:${contactInfo.email}`}
                        className="hover:text-gray-900"
                      >
                        {contactInfo.email}
                      </Link>
                    </dd>
                  </div>
                </>
              )}
            </dl>
            <p className="mt-6 text-lg/8 text-gray-600">
              Заявка за персонал можете да направите в раздел услуги, след като
              изберете какъв тип работник желаете да наемете.
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
      <section className="w-full mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Намерете ни на картата
          </h2>
        </div>
        <div className="w-full h-[400px] lg:h-[500px]">
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.221054290747!2d23.324329976615665!3d42.69903991361762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fed461f3b2cd243%3A0xe5368cce4a029938!2z0JDQtNCy0L7QutCw0YLRgdC60L4g0LTRgNGD0LbQtdGB0YLQstC-ICLQkdGD0YDQutC-0LIsINCg0LDQtNC10LIsINCU0Y7Qu9Cz0LXRgNGB0LrQsCIgfCBCdXJrb3YsIFJhZGV2LCBEanVsZ2Vyc2thIExhdyBGaXJt!5e0!3m2!1sen!2sbg!4v1744186340903!5m2!1sen!2sbg"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe> */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.5963883611207!2d23.320293276615335!3d42.691091214122935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa850d5311e96b%3A0x31970a5b87bf5fe9!2sSofia%20Center%2C%20ul.%20%22Racho%20Dimchev%22%202%2C%201000%20Sofia!5e0!3m2!1sen!2sbg!4v1745564254379!5m2!1sen!2sbg"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
