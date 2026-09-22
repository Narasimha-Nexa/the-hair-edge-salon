import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { salonConfig } from "@/config/salon.config";
import { blogPosts } from "@/lib/blog-posts";
import { serializeJsonLd } from "@/lib/jsonld";
import { generateWhatsAppUrl } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hairedgesalon.in";

export const metadata: Metadata = {
  title: "Hair & Beauty Tips & Guides",
  description: `Expert hair care tips, beauty trends, bridal makeup guides and grooming advice from ${salonConfig.business.name}, Madhapur, Hyderabad - written by certified stylists.`,
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    description:
      "Expert hair care tips, beauty trends, bridal makeup guides and grooming advice from Hair Edge Unisex Salon Madhapur, Hyderabad.",
  },
};

const posts = Object.entries(blogPosts).map(([slug, post]) => ({
  slug,
  ...post,
}));

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
  ],
};

export default function BlogIndexPage() {
  return (
    <main id="main-content" className="min-h-screen bg-salon-primary">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <section className="py-20 md:py-28 bg-salon-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-salon-white mb-6">
              Hair & Beauty <span className="text-salon-gold">Insights</span>
            </h1>
            <p className="text-salon-muted text-lg md:text-xl max-w-2xl mx-auto">
              Expert tips, trends and guides from our certified stylists at{" "}
              {salonConfig.business.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={post.slug}                 className="group bg-salon-primary border border-white/10 rounded-2xl overflow-hidden hover:border-salon-gold/50 transition-[border-color,box-shadow] duration-500 hover:shadow-lg hover:shadow-salon-gold/10 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-salon-surface">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-salon-gold text-salon-primary text-xs font-medium px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-salon-muted text-xs mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="font-heading text-xl text-salon-white mb-3 group-hover:text-salon-gold transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-salon-muted text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-salon-gold text-sm font-medium hover:text-salon-gold-light transition-colors">
                      Read More
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-16 animate-fade-in-up">
            <a
              href={generateWhatsAppUrl(
                `Hello ${salonConfig.business.name}, I have a question about your blog articles.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-salon-gold text-salon-gold px-8 py-3.5 rounded-lg font-medium tracking-wider hover:bg-salon-gold hover:text-salon-primary transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            >
              Ask Our Experts a Question
            </a>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
