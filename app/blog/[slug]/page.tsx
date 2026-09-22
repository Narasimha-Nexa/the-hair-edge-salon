import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { salonConfig } from "@/config/salon.config";
import { blogPosts } from "@/lib/blog-posts";
import { serializeJsonLd } from "@/lib/jsonld";
import { generateWhatsAppUrl } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hairedgesalon.in";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts[params.slug];
  if (!post) {
    return { title: "Post Not Found" };
  }
  const canonical = `/blog/${params.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: `${post.title} | ${salonConfig.business.name}`,
      description: post.excerpt,
      publishedTime: post.date,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/images/og-image.jpg"],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug];
  if (!post) {
    notFound();
  }

  const canonicalUrl = `${siteUrl}/blog/${params.slug}`;

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: `${siteUrl}/images/og-image.jpg`,
    author: {
      "@type": "Organization",
      name: salonConfig.business.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "BeautySalon",
      name: salonConfig.business.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.png`,
      },
    },
    mainEntityOfPage: canonicalUrl,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    inLanguage: "en-IN",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-salon-primary">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <section className="py-20 md:py-28 bg-salon-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-salon-muted">
              <li>
                <Link
                  href="/"
                  className="hover:text-salon-gold transition-colors py-1"
                >
                  Home
                </Link>
              </li>
              <li className="text-salon-muted/50">/</li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-salon-gold transition-colors py-1"
                >
                  Blog
                </Link>
              </li>
              <li className="text-salon-muted/50">/</li>
              <li
                className="text-salon-white font-medium"
                aria-current="page"
              >
                {post.category}
              </li>
            </ol>
          </nav>

          <article>
            <header className="mb-10 animate-fade-in-up">
              <span className="inline-block bg-salon-gold text-salon-primary text-xs font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-salon-white mt-5 mb-5 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-salon-muted">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>By {salonConfig.business.name}</span>
              </div>
            </header>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 animate-fade-in-up delay-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>

            <div
              className="blog-content animate-fade-in-up delay-200"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <a
                href={generateWhatsAppUrl(
                  `Hello ${salonConfig.business.name}, I read your article "${post.title}" and would like to book.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-salon-gold text-salon-primary py-3.5 px-6 rounded-lg font-medium tracking-wider text-center hover:bg-salon-gold-light transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
              >
                Book via WhatsApp
              </a>
              <Link
                href="/services"
                className="flex-1 border border-salon-gold text-salon-gold py-3.5 px-6 rounded-lg font-medium tracking-wider text-center hover:bg-salon-gold hover:text-salon-primary transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 text-sm text-salon-muted flex flex-wrap items-center gap-2">
              <span>
                Written by{" "}
                <span className="text-salon-white">
                  {salonConfig.business.name}
                </span>
              </span>
              <span aria-hidden="true" className="text-salon-muted/40">
                ·
              </span>
              <Link
                href="/blog"
                className="text-salon-gold hover:text-salon-gold-light transition-colors py-1"
              >
                ← All articles
              </Link>
            </div>
          </article>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
