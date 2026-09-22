import { Metadata } from "next";
import { salonConfig } from "@/config/salon.config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hair & Beauty Tips | Hair Edge Salon Madhapur Blog",
  description: "Expert hair care tips, beauty trends, bridal guides, and salon insights from Hair Edge Unisex Salon Madhapur. Learn from our certified stylists.",
  openGraph: {
    title: "Hair & Beauty Tips | Hair Edge Salon Madhapur Blog",
    description: "Expert hair care tips, beauty trends, bridal guides, and salon insights from Hair Edge Unisex Salon Madhapur.",
  },
};

const blogPosts = [
  {
    slug: "best-hair-salon-madhapur-hyderabad",
    title: "How to Choose the Best Hair Salon in Madhapur, Hyderabad",
    excerpt: "Looking for the best hair salon in Madhapur? Discover what makes a salon stand out - from hygiene standards to stylist expertise and product quality.",
    category: "Guide",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/images/blog/choose-salon.jpg",
  },
  {
    slug: "keratin-treatment-vs-rebonding",
    title: "Keratin Treatment vs Hair Rebonding: Which is Right for You?",
    excerpt: "Confused between keratin treatment and hair rebonding? Our experts break down the differences, pros, cons, and help you choose the best option for your hair type.",
    category: "Hair Care",
    date: "2024-01-20",
    readTime: "7 min read",
    image: "/images/blog/keratin-vs-rebonding.jpg",
  },
  {
    slug: "bridal-makeup-packages-hyderabad",
    title: "Complete Bridal Makeup Guide: Packages, Trends & Tips for Hyderabad Brides",
    excerpt: "Planning your wedding look? Explore bridal makeup packages at Hair Edge Salon Madhapur. From pre-bridal to reception makeup - everything Hyderabad brides need to know.",
    category: "Bridal",
    date: "2024-01-25",
    readTime: "8 min read",
    image: "/images/blog/bridal-makeup.jpg",
  },
  {
    slug: "hair-colour-trends-2024",
    title: "Top Hair Colour Trends 2024: What's Hot in Hyderabad Salons",
    excerpt: "From caramel balayage to bold fashion colours - discover the hottest hair colour trends of 2024. Our colour experts share what's trending in Hyderabad.",
    category: "Trends",
    date: "2024-02-01",
    readTime: "6 min read",
    image: "/images/blog/hair-colour-trends.jpg",
  },
  {
    slug: "beard-grooming-tips-men",
    title: "Essential Beard Grooming Tips for Men: Madhapur Barber's Guide",
    excerpt: "Want a well-groomed beard? Our beard specialists at Hair Edge Salon share professional tips for beard styling, trimming, and maintenance.",
    category: "Men's Grooming",
    date: "2024-02-10",
    readTime: "5 min read",
    image: "/images/blog/beard-grooming.jpg",
  },
  {
    slug: "pre-bridal-skin-care-routine",
    title: "Pre-Bridal Skin Care Routine: 3-Month Timeline for Glowing Skin",
    excerpt: "Start your pre-bridal skincare journey early! Our beauty therapists share a month-by-month timeline for radiant bridal skin.",
    category: "Bridal",
    date: "2024-02-15",
    readTime: "7 min read",
    image: "/images/blog/pre-bridal-skincare.jpg",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-salon-primary">
      <Navbar />
      <section className="py-20 md:py-28 bg-salon-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-salon-white mb-6">
              Hair & Beauty <span className="text-salon-gold">Insights</span>
            </h1>
            <p className="text-salon-muted text-lg md:text-xl max-w-2xl mx-auto">
              Expert tips, trends, and guides from our certified stylists at Hair Edge Unisex Salon Madhapur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={post.slug}
                className="group bg-salon-primary border border-white/10 rounded-2xl overflow-hidden hover:border-salon-gold/50 transition-all duration-500 hover:shadow-lg hover:shadow-salon-gold/10 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-salon-gold text-salon-primary text-xs font-medium px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-salon-gold/90 text-salon-primary text-xs px-2 py-1 rounded">
                        {post.readTime}
                      </span>
                    </div>
                    <div className="w-full h-full bg-salon-surface flex items-center justify-center">
                      <svg className="w-24 h-24 text-salon-gold/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-salon-muted text-xs mb-3">
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</time>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="font-heading text-xl text-salon-white mb-3 group-hover:text-salon-gold transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-salon-muted text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-salon-gold text-sm font-medium hover:text-salon-gold-light transition-colors">
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-16 animate-fade-in-up">
            <a
              href={generateWhatsAppUrl(`Hello ${salonConfig.business.name}, I have a question about your blog article.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-salon-gold text-salon-gold px-8 py-3.5 rounded-lg font-medium tracking-wider hover:bg-salon-gold hover:text-salon-primary transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
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

function generateWhatsAppUrl(message: string) {
  const phone = "+916304884778";
  const normalized = phone.replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${encoded}`;
}