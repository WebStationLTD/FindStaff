import fs from "fs";
import path from "path";

const files = [
  "HotelStaffHiringForm.js",
  "RestaurantStaffHiringForm.js",
  "ConstructionWorkersHiringForm.js",
  "ProductionHiringForm.js",
  "ServiceStaffHiringForm.js",
];

for (const file of files) {
  const filePath = path.join(process.cwd(), "components", file);
  let source = fs.readFileSync(filePath, "utf8");
  const before = source;
  source = source.replace(
    'import { useLocale, useTranslations } from "next-intl";',
    'import { useTranslations } from "next-intl";'
  );
  source = source.replace("  const locale = useLocale();\n", "");
  if (source !== before) {
    fs.writeFileSync(filePath, source, "utf8");
    console.log("cleaned", file);
  } else {
    console.log("skip", file);
  }
}
