const incentives = [
  {
    name: "Глобален обхват",
    imageSrc: "/icons/cta-icon-1.svg",
    description:
      "Достъп до квалифицирани кадри от целия свят с доказан опит в разнообразни индустрии, готови да допринесат незабавно към вашия екип.",
  },
  {
    name: "Правна експертиза",
    imageSrc: "/icons/cta-icon-2.svg",
    description:
      "Пълно съдействие при всички правни и административни процедури за наемане на персонал от трети страни, със спазване на всички международни регулации.",
  },
  {
    name: "Персонализиран подход",
    imageSrc: "/icons/cta-icon-3.svg",
    description:
      "Индивидуално разработена стратегия за всеки клиент, отчитаща спецификите на вашия бизнес, корпоративна култура и нужди от специфични умения.",
  },
];

export default function Incentives() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white">
                Международни таланти на ваше разположение
              </h2>
              <p className="mt-4 text-white">
                Find Staff предлага цялостно решение за компании, търсещи
                висококвалифицирани специалисти от международния пазар на труда.
                Специализирани сме в идентифицирането и привличането на
                професионалисти от бившите съветски републики, Филипините, Непал
                и други развиващи се пазари, където има богат набор от таланти,
                търсещи нови възможности. Нашият екип от експерти не само
                подбира подходящите кандидати, но и осигурява плавен преход с
                пълна административна и юридическа подкрепа в целия процес на
                наемане и интеграция.
              </p>
            </div>
            <img
              alt=""
              src="https://findstaff.admin-panels.com/wp-content/uploads/2025/04/find-staff-agency.jpg"
              className="aspect-3/2 w-full rounded-lg bg-gray-100 object-cover"
            />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:shrink-0">
                  <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#005e9e]">
                    <img
                      alt=""
                      src={incentive.imageSrc}
                      className="h-10 w-10"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-medium text-white">
                    {incentive.name}
                  </h3>
                  <p className="mt-2 text-sm text-white">
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
