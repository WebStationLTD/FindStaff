import { NextResponse } from "next/server";
import { getLocalizedServicesNav } from "../../../services/localized";

export async function GET(request) {
  const locale = request.nextUrl.searchParams.get("locale") || "bg";
  const services = await getLocalizedServicesNav(locale);
  return NextResponse.json(services || []);
}
