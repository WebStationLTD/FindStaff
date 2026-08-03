import { NextResponse } from "next/server";
import { getLocalizedLatestPosts } from "../../../services/localized";

export async function GET(request) {
  const locale = request.nextUrl.searchParams.get("locale") || "bg";
  const posts = await getLocalizedLatestPosts(locale);
  return NextResponse.json(posts || []);
}
