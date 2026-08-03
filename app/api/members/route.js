import { NextResponse } from "next/server";
import { getLocalizedMembers } from "../../../services/localized";

export async function GET(request) {
  const locale = request.nextUrl.searchParams.get("locale") || "bg";
  const members = await getLocalizedMembers(locale);
  return NextResponse.json(members || []);
}
