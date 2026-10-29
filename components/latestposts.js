"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";

export default function LatestPosts() {
  const t = useTranslations("latestPosts");
  const locale = useLocale();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchLatestPosts = async () => {
      try {
        const res = await fetch(`/api/latest-posts?locale=${locale}`);
        const postsData = await res.json();
        setPosts(Array.isArray(postsData) ? postsData : []);
      } catch (error) {
        console.error("Failed to load latest posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, [locale]);

  const dateLocale = locale === "it" ? "it-IT" : "bg-BG";

  return (
    <div className="bg-white">
      <div className="mx-auto w-full py-0 sm:px-6 sm:py-0 lg:px-0">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:px-16">
          <h3 className="text-4xl text-white">{t("title")}</h3>
          {loading && (
            <div className="flex justify-center mt-10">
              <div className="w-12 h-12 border-4 border-gray-500 border-t-[#005e9e] rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && (
            <div className="mx-auto mt-16 grid !max-w-[80%] grid-cols-1 gap-x-8 gap-y-20 lg:mx-auto lg:max-w-none lg:grid-cols-3">
              {posts.length > 0 ? (
                posts.map((post, index) => {
                  const rawTitle = post.title?.rendered ?? post.title;
                  const title =
                    typeof rawTitle === "string" && rawTitle.trim()
                      ? rawTitle
                      : "";
                  const rawContent = post.content?.rendered ?? post.content;
                  const content =
                    typeof rawContent === "string" ? rawContent : "";
                  const ogImage =
                    post.ogImage ||
                    post.yoast_head_json?.og_image?.[0]?.url ||
                    "/placeholder.webp";

                  return (
                    <Link
                      href={`/blog/${post.slug}`}
                      key={post.id || post.slug || index}
                      prefetch={true}
                    >
                      <article className="flex flex-col items-start justify-between">
                        <div className="relative w-full">
                          <Image
                            width={400}
                            height={225}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={85}
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            alt={title || "FindStaff"}
                            src={ogImage}
                            className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                          />
                          <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                        </div>
                        <div className="max-w-xl">
                          <div className="mt-8 flex items-center gap-x-4 text-xs">
                            <time dateTime={post.date} className="text-white">
                              {post.date
                                ? new Date(post.date).toLocaleDateString(
                                    dateLocale
                                  )
                                : ""}
                            </time>
                          </div>
                          <div className="group relative text-left">
                            <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-300">
                              <span className="absolute inset-0" />
                              {title}
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm/6 text-white">
                              {content
                                ? content
                                    .replace(/<\/?[^>]+(>|$)/g, "")
                                    .substring(0, 150) + "..."
                                : ""}
                            </p>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })
              ) : (
                <p className="text-white col-span-3">{t("description")}</p>
              )}
            </div>
          )}
          {!loading && posts.length > 0 && (
            <div className="mt-12">
              <Link
                href="/blog"
                className="text-sm font-semibold text-white hover:text-gray-300"
              >
                {t("viewAll")} →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
