import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "components");
const files = [
  "DefaultHiringForm.js",
  "HotelStaffHiringForm.js",
  "RestaurantStaffHiringForm.js",
  "ConstructionWorkersHiringForm.js",
  "ProductionHiringForm.js",
  "ServiceStaffHiringForm.js",
  "ServiceForm.js",
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let source = fs.readFileSync(filePath, "utf8");
  const before = source;

  source = source.replace(
    /(\s+)Изпрати заявка(\s*)\n/g,
    '$1{loading ? t("submitting") : t("submit")}$2\n'
  );
  source = source.replace(
    /(\s+)Изпратете заявка(\s*)\n/g,
    '$1{t("requestTitle")}$2\n'
  );
  source = source.replace(
    /formData\.append\(\s*\n\s*"your-subject",\s*\n\s*locale === "it" \? `Richiesta per \$\{serviceName\}` : `Заявка за \$\{serviceName\}`\s*\n\s*\);/,
    'formData.append("your-subject", t("requestSubject", { service: serviceName }));'
  );

  if (file === "ServiceForm.js" && !source.includes('useTranslations("forms")')) {
    source = source.replace(
      '"use client";\n\n',
      '"use client";\n\nimport { useTranslations } from "next-intl";\n\n'
    );
    source = source.replace(
      "export default function ServiceForm({ serviceId, serviceSlug, serviceName }) {\n",
      `export default function ServiceForm({ serviceId, serviceSlug, serviceName }) {
  const t = useTranslations("forms");
`
    );
  }

  if (source !== before) {
    fs.writeFileSync(filePath, source, "utf8");
    console.log("fixed", file);
  } else {
    console.log("no change", file);
  }
}
