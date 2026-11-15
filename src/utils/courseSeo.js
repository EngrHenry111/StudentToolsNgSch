// Shared by CoursePage (Helmet) and seoFallback.js (crawler HTML) so the
// browser and Google always get the same description and Course schema.
const SITE = "https://studenttoolsng.com";

const flat = (s) => String(s || "").replace(/\s+/g, " ").trim();

export const courseDescription = (course, lessonCount = 0) => {
  const base = flat(course.tagline) || flat(course.description) ||
    `Recorded video course: ${course.title}`;
  const extra = lessonCount ? ` ${lessonCount} video lesson${lessonCount === 1 ? "" : "s"}, lifetime access.` : "";
  const text = `${base}${base.endsWith(".") ? "" : "."}${extra}`;
  return text.length <= 160 ? text : `${text.slice(0, 157).replace(/\s+\S*$/, "")}…`;
};

// 7260 → "PT2H1M" (ISO 8601 duration, what courseWorkload expects).
const isoDuration = (seconds) => {
  const m = Math.max(1, Math.round((seconds || 0) / 60));
  const h = Math.floor(m / 60);
  return `PT${h ? `${h}H` : ""}${m % 60 ? `${m % 60}M` : ""}`;
};

// Course + Course info fields Google uses: offers, hasCourseInstance.
// course.price is in naira (as the public API returns it).
export const courseJsonLd = (course, lessons = []) => {
  const url = `${SITE}/courses/${course.slug}`;
  const totalSeconds = lessons.reduce((s, l) => s + (l.durationSeconds || 0), 0);
  const free = !(course.price > 0);
  const anyPreview = lessons.some((l) => l.isFreePreview);

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: flat(course.description).slice(0, 500) || courseDescription(course, lessons.length),
    url,
    ...(course.coverImageUrl ? { image: course.coverImageUrl } : {}),
    inLanguage: "en",
    provider: { "@type": "Organization", name: "StudentToolsNG", sameAs: SITE },
    ...(course.instructor
      ? { creator: { "@type": "Person", name: course.instructor } }
      : {}),
    offers: {
      "@type": "Offer",
      category: free ? "Free" : anyPreview ? "Partially Free" : "Paid",
      price: free ? 0 : course.price,
      priceCurrency: "NGN",
      url
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: isoDuration(totalSeconds)
    }
  };
};
