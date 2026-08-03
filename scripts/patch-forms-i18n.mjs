import fs from "fs";

const files = [
  "components/HotelStaffHiringForm.js",
  "components/RestaurantStaffHiringForm.js",
  "components/ConstructionWorkersHiringForm.js",
  "components/ProductionHiringForm.js",
  "components/ServiceStaffHiringForm.js",
];

for (const f of files) {
  let c = fs.readFileSync(f, "utf8");

  if (!c.includes("useTranslations(")) {
    c = c.replace(
      /(export default function \w+\(\{ serviceId, serviceName \}\) \{\r?\n)/,
      `$1  const t = useTranslations("forms");
  const tForm = useTranslations("contactForm");
  const locale = useLocale();
`
    );
  }

  c = c.replace(
    /const countryOptions = \[[\s\S]*?\];/,
    'const countryOptions = t.raw("countryList");'
  );

  c = c.replace(/title: "Успешно изпратено!"/g, 'title: t("successTitle")');
  c = c.replace(
    /text: "Очаквайте отговор скоро : \)"/g,
    'text: t("successText")'
  );
  c = c.replace(/title: "Грешка при изпращане!"/g, 'title: t("errorTitle")');
  c = c.replace(
    /text: "Моля, опитайте отново по-късно\."/g,
    'text: t("errorText")'
  );
  c = c.replace(
    /title: "Неуспешно изпращане!"/g,
    'title: tForm("failTitle")'
  );
  c = c.replace(
    /text: "Проверете връзката с интернет и опитайте отново\."/g,
    'text: tForm("failText")'
  );

  fs.writeFileSync(f, c);
  console.log(
    "updated",
    f,
    "hooks=",
    c.includes('useTranslations("forms")'),
    "countries=",
    c.includes('t.raw("countryList")')
  );
}
