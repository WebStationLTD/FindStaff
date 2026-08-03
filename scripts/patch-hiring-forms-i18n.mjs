import fs from "fs";
import path from "path";

const root = process.cwd();
const componentsDir = path.join(root, "components");

const forms = [
  {
    file: "DefaultHiringForm.js",
    positionsKey: null,
  },
  {
    file: "HotelStaffHiringForm.js",
    positionsKey: "positionsHotel",
  },
  {
    file: "RestaurantStaffHiringForm.js",
    positionsKey: "positionsRestaurant",
  },
  {
    file: "ConstructionWorkersHiringForm.js",
    positionsKey: "positionsConstruction",
  },
  {
    file: "ProductionHiringForm.js",
    positionsKey: "positionsProduction",
  },
  {
    file: "ServiceStaffHiringForm.js",
    positionsKey: "positionsService",
  },
];

const replacements = [
  [
    'selectedCountries.push(`Друго: ${otherCountry}`);',
    'selectedCountries.push(`${t("otherPrefix")}: ${otherCountry}`);',
  ],
  [
    'selectedPositions.push(`Друго: ${otherPosition}`);',
    'selectedPositions.push(`${t("otherPrefix")}: ${otherPosition}`);',
  ],
  [
    'formData.append("your-subject", `Заявка за ${serviceName}`);',
    'formData.append("your-subject", t("requestSubject", { service: serviceName }));',
  ],
  [
    `formData.append(
      "your-subject",
      locale === "it" ? \`Richiesta per \${serviceName}\` : \`Заявка за \${serviceName}\`
    );`,
    'formData.append("your-subject", t("requestSubject", { service: serviceName }));',
  ],
  [
    '<h3 className="text-lg font-semibold mb-4">Контактна информация</h3>',
    '<h3 className="text-lg font-semibold mb-4">{t("contactInfo")}</h3>',
  ],
  [
    '<label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Две имена*</label>',
    '<label htmlFor="fullName" className="block text-sm font-medium text-gray-700">{t("fullName")}</label>',
  ],
  [
    '<label htmlFor="phone" className="block text-sm font-medium text-gray-700">Телефон за връзка*</label>',
    '<label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t("phone")}</label>',
  ],
  [
    '<label htmlFor="email" className="block text-sm font-medium text-gray-700">Имейл адрес*</label>',
    '<label htmlFor="email" className="block text-sm font-medium text-gray-700">{t("email")}</label>',
  ],
  [
    '<label htmlFor="address" className="block text-sm font-medium text-gray-700">Адрес (квартал и град)*</label>',
    '<label htmlFor="address" className="block text-sm font-medium text-gray-700">{t("address")}</label>',
  ],
  [
    '<h3 className="text-lg font-semibold mb-4">Предпочитания относно произход на кандидата</h3>',
    '<h3 className="text-lg font-semibold mb-4">{t("candidateOrigin")}</h3>',
  ],
  [
    '<label htmlFor="otherCountry" className="block text-sm font-medium text-gray-700">Друго</label>',
    '<label htmlFor="otherCountry" className="block text-sm font-medium text-gray-700">{t("other")}</label>',
  ],
  [
    '<h3 className="text-lg font-semibold mb-4">Езици, които трябва да говори кандидатът</h3>',
    '<h3 className="text-lg font-semibold mb-4">{t("languagesTitle")}</h3>',
  ],
  [
    'placeholder="Например: английски, руски, български"',
    'placeholder={t("languagesPlaceholder")}',
  ],
  [
    '<h3 className="text-lg font-semibold mb-4">Основни задължения</h3>',
    '<h3 className="text-lg font-semibold mb-4">{t("dutiesTitle")}</h3>',
  ],
  [
    '<label htmlFor="otherPosition" className="block text-sm font-medium text-gray-700">Друго</label>',
    '<label htmlFor="otherPosition" className="block text-sm font-medium text-gray-700">{t("other")}</label>',
  ],
  [
    '<h3 className="text-lg font-semibold mb-4">Работно време</h3>',
    '<h3 className="text-lg font-semibold mb-4">{t("workHoursTitle")}</h3>',
  ],
  [
    '<label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Начален час</label>',
    '<label htmlFor="startTime" className="block text-sm font-medium text-gray-700">{t("startTime")}</label>',
  ],
  [
    '<label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Краен час</label>',
    '<label htmlFor="endTime" className="block text-sm font-medium text-gray-700">{t("endTime")}</label>',
  ],
  [
    '<label htmlFor="workDays" className="block text-sm font-medium text-gray-700">Работни дни в седмицата</label>',
    '<label htmlFor="workDays" className="block text-sm font-medium text-gray-700">{t("workDays")}</label>',
  ],
  [
    '<label htmlFor="weeklyHours" className="block text-sm font-medium text-gray-700">Общ брой работни часове на седмица</label>',
    '<label htmlFor="weeklyHours" className="block text-sm font-medium text-gray-700">{t("weeklyHours")}</label>',
  ],
  [
    '<h3 className="text-lg font-semibold mb-4">Почивни дни и отпуски</h3>',
    '<h3 className="text-lg font-semibold mb-4">{t("daysOffTitle")}</h3>',
  ],
  [
    '<label htmlFor="daysOff" className="block text-sm font-medium text-gray-700">Брой почивни дни седмично</label>',
    '<label htmlFor="daysOff" className="block text-sm font-medium text-gray-700">{t("daysOff")}</label>',
  ],
  [
    '<label htmlFor="paidLeave" className="block text-sm font-medium text-gray-700">Платен годишен отпуск (в дни)</label>',
    '<label htmlFor="paidLeave" className="block text-sm font-medium text-gray-700">{t("paidLeave")}</label>',
  ],
  [
    '<h3 className="text-lg font-semibold mb-4">Настаняване</h3>',
    '<h3 className="text-lg font-semibold mb-4">{t("accommodationTitle")}</h3>',
  ],
  [
    '<option value="">Изберете опция</option>',
    '<option value="">{t("selectOption")}</option>',
  ],
  [
    '<option value="Осигурено от работодателя">Осигурено от работодателя</option>',
    '<option value={t("accommodationEmployer")}>{t("accommodationEmployer")}</option>',
  ],
  [
    '<option value="Самостоятелно настаняване">Самостоятелно настаняване</option>',
    '<option value={t("accommodationSelf")}>{t("accommodationSelf")}</option>',
  ],
  [
    '<option value="Споделено настаняване">Споделено настаняване</option>',
    '<option value={t("accommodationShared")}>{t("accommodationShared")}</option>',
  ],
  [
    '<option value="Друго">Друго</option>',
    '<option value={t("other")}>{t("other")}</option>',
  ],
  [
    '<h3 className="text-lg font-semibold mb-4">Храна</h3>',
    '<h3 className="text-lg font-semibold mb-4">{t("foodTitle")}</h3>',
  ],
  [
    '<option value="Осигурена храна на място">Осигурена храна на място</option>',
    '<option value={t("foodOnSite")}>{t("foodOnSite")}</option>',
  ],
  [
    '<option value="Купони за храна">Купони за храна</option>',
    '<option value={t("foodVouchers")}>{t("foodVouchers")}</option>',
  ],
  [
    '<option value="Самостоятелно пазаруване">Самостоятелно пазаруване</option>',
    '<option value={t("foodSelf")}>{t("foodSelf")}</option>',
  ],
  [
    '<h3 className="text-lg font-semibold mb-4">Заплащане</h3>',
    '<h3 className="text-lg font-semibold mb-4">{t("salaryTitle")}</h3>',
  ],
  [
    '<label htmlFor="monthlySalary" className="block text-sm font-medium text-gray-700">Месеция нетна заплата (лв.)</label>',
    '<label htmlFor="monthlySalary" className="block text-sm font-medium text-gray-700">{t("monthlySalary")}</label>',
  ],
  [
    '<label htmlFor="monthlySalary" className="block text-sm font-medium text-gray-700">Месечна нетна заплата (лв.)</label>',
    '<label htmlFor="monthlySalary" className="block text-sm font-medium text-gray-700">{t("monthlySalary")}</label>',
  ],
  [
    '<label htmlFor="bonuses" className="block text-sm font-medium text-gray-700">Допълнителни бонуси/премии</label>',
    '<label htmlFor="bonuses" className="block text-sm font-medium text-gray-700">{t("bonuses")}</label>',
  ],
  [
    '<h3 className="text-lg font-semibold mb-4">Начална дата за започване на работа</h3>',
    '<h3 className="text-lg font-semibold mb-4">{t("startDateTitle")}</h3>',
  ],
  [
    '<h3 className="text-lg font-semibold mb-4">Допълнителни изисквания или предпочитания</h3>',
    '<h3 className="text-lg font-semibold mb-4">{t("additionalTitle")}</h3>',
  ],
  [
    `              Изпрати заявка
`,
    `              {loading ? t("submitting") : t("submit")}
`,
  ],
];

function replacePositionsArray(source, positionsKey) {
  if (!positionsKey) return source;

  const re =
    /const positionOptions = \[[\s\S]*?\];/;
  if (!re.test(source)) {
    throw new Error(`positionOptions array not found for ${positionsKey}`);
  }
  return source.replace(
    re,
    `const positionOptions = t.raw("${positionsKey}");`
  );
}

for (const { file, positionsKey } of forms) {
  const filePath = path.join(componentsDir, file);
  let source = fs.readFileSync(filePath, "utf8");
  source = replacePositionsArray(source, positionsKey);

  for (const [from, to] of replacements) {
    if (source.includes(from)) {
      source = source.split(from).join(to);
    }
  }

  // Remove unused locale if subject no longer needs it and locale is unused elsewhere
  if (
    source.includes("const locale = useLocale();") &&
    !source.includes("locale ===") &&
    !source.includes("locale !==") &&
    !/\blocale\b/.test(source.replace("const locale = useLocale();", ""))
  ) {
    source = source.replace(
      "import { useLocale, useTranslations } from \"next-intl\";\n",
      "import { useTranslations } from \"next-intl\";\n"
    );
    source = source.replace("  const locale = useLocale();\n", "");
  }

  fs.writeFileSync(filePath, source, "utf8");
  console.log(`Patched ${file}`);
}

// ServiceForm title
const serviceFormPath = path.join(componentsDir, "ServiceForm.js");
let serviceForm = fs.readFileSync(serviceFormPath, "utf8");
if (!serviceForm.includes('useTranslations("forms")')) {
  serviceForm = serviceForm.replace(
    '"use client";\n\n',
    '"use client";\n\nimport { useTranslations } from "next-intl";\n'
  );
  serviceForm = serviceForm.replace(
    "export default function ServiceForm({ serviceId, serviceSlug, serviceName }) {\n",
    `export default function ServiceForm({ serviceId, serviceSlug, serviceName }) {
  const t = useTranslations("forms");
`
  );
}
serviceForm = serviceForm.replace(
  "            Изпратете заявка\n",
  "            {t(\"requestTitle\")}\n"
);
serviceForm = serviceForm.replace(
  ': "Заявка";',
  ': t("requestTitle");'
);
fs.writeFileSync(serviceFormPath, serviceForm, "utf8");
console.log("Patched ServiceForm.js");

console.log("Done.");
