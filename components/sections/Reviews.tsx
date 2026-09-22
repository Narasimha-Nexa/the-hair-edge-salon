"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { salonConfig } from "@/config/salon.config";
import {
  generateWriteReviewUrl,
  generateReviewsUrl,
  generateWhatsAppUrl,
} from "@/lib/utils";
import { track } from "@/lib/analytics";
import { IconStar } from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import Loading from "@/components/ui/Loading";
import ErrorState from "@/components/ui/ErrorState";

interface Review {
  rating: number;
  text: string;
  authorName: string;
  authorPhoto: string;
  timeAgo: string;
  reviewUrl: string;
}

interface PlaceData {
  name: string;
  rating: number;
  ratingCount: number;
  reviews: Review[];
  mapsUrl: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(rating) ? "text-salon-gold" : "text-gray-600"}
          aria-hidden="true"
        >
          <IconStar className="w-4 h-4" />
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-salon-primary border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-4">
        {review.authorPhoto ? (
          <Image
            src={review.authorPhoto}
            alt={review.authorName}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-salon-surface rounded-full flex items-center justify-center">
            <span className="text-salon-gold font-medium">
              {review.authorName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="text-salon-white text-sm font-medium">
            {review.authorName}
          </p>
          {review.timeAgo && (
            <p className="text-salon-muted text-xs">{review.timeAgo}</p>
          )}
        </div>
      </div>
      <Stars rating={review.rating} />
      <p className="text-salon-muted text-sm mt-3 line-clamp-4">
        {review.text}
      </p>
      {review.reviewUrl && (
        <a
          href={review.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-salon-gold text-xs hover:text-salon-gold-light transition-colors"
        >
          View on Google Maps →
        </a>
      )}
    </div>
  );
}

function ReviewForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [hovered, setHovered] = useState(0);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; review?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; review?: string } = {};
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter your name";
    }
    if (!review.trim() || review.trim().length < 10) {
      newErrors.review = "Please write a review (at least 10 characters)";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const message = `Hello ${salonConfig.business.name},

I would like to share my feedback.

Name: ${name.trim()}
Rating: ${rating} / 5
Review: ${review.trim()}

Thank you.
Source: Website Review Form`;

    window.open(generateWhatsAppUrl(message), "_blank");
    track("whatsapp_click", { location: "review_form" });
    setSent(true);
  };

  const reset = () => {
    setName("");
    setRating(5);
    setReview("");
    setSent(false);
    setErrors({});
  };

  if (sent) {
    return (
      <div
        className="bg-salon-surface border border-salon-gold/30 rounded-2xl p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="w-12 h-12 bg-salon-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-salon-white mb-2 font-medium">
          Thank you for your feedback!
        </p>
        <p className="text-salon-muted text-sm mb-6">
          Please complete sending your review in WhatsApp.
        </p>
        <button
          onClick={reset}
          className="text-salon-gold text-sm font-medium hover:text-salon-gold-light transition-colors"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-salon-surface border border-white/10 rounded-2xl p-6 sm:p-8"
    >
      <h3 className="font-heading text-xl text-salon-white mb-1">
        Share Your Experience
      </h3>
      <p className="text-salon-muted text-sm mb-6">
        Your feedback helps us serve you better.
      </p>

      <div className="mb-5">
        <label htmlFor="review-name" className="block text-salon-muted text-sm mb-2">
          Your Name <span className="text-salon-gold">*</span>
        </label>
        <input
          id="review-name"
          type="text"
          autoComplete="name"
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          className="w-full bg-salon-primary border border-white/20 px-4 py-3 text-salon-white placeholder-salon-muted/50 focus:border-salon-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary transition-colors rounded-lg"
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>
        )}
      </div>

      <div className="mb-5">
        <span className="block text-salon-muted text-sm mb-2">Your Rating</span>
        <div className="flex gap-1 text-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className={`p-1.5 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-surface rounded ${
                star <= (hovered || rating) ? "text-salon-gold" : "text-gray-600"
              }`}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="review-text" className="block text-salon-muted text-sm mb-2">
          Your Review <span className="text-salon-gold">*</span>
        </label>
        <textarea
          id="review-text"
          rows={4}
          maxLength={1000}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          aria-invalid={!!errors.review}
          className="w-full bg-salon-primary border border-white/20 px-4 py-3 text-salon-white placeholder-salon-muted/50 focus:border-salon-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary transition-colors rounded-lg resize-y"
          placeholder="Tell us about your experience..."
        />
        {errors.review && (
          <p className="text-red-400 text-xs mt-1" role="alert">{errors.review}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-salon-gold text-salon-primary py-3.5 text-sm font-medium tracking-wider rounded-lg hover:bg-salon-gold-light transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-surface"
      >
        Send Review via WhatsApp
      </button>
      <p className="text-salon-muted/60 text-xs mt-3 text-center">
        Your review is sent to us via WhatsApp. We appreciate your feedback!
      </p>
    </form>
  );
}

export default function Reviews() {
  const [data, setData] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await fetch("/api/google-place");
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, []);

  if (!salonConfig.features.reviews) return null;

  const apiReviews: Review[] = data?.reviews ?? [];
  const curatedReviews: Review[] = salonConfig.reviews.all.map((r) => ({
    rating: r.rating,
    text: r.text,
    authorName: r.name,
    authorPhoto: "",
    timeAgo: r.date,
    reviewUrl: "",
  }));
  const curatedFeatured: Review[] = salonConfig.reviews.featured.map((r) => ({
    rating: r.rating,
    text: r.text,
    authorName: r.name,
    authorPhoto: "",
    timeAgo: r.date,
    reviewUrl: "",
  }));

  const allReviews = [...apiReviews, ...curatedReviews].slice(0, 23);
  const featuredReviews = (
    apiReviews.length > 0 ? apiReviews : curatedFeatured
  ).slice(0, 5);

  return (
    <section id="reviews" className="py-20 md:py-28 bg-salon-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Google Reviews"
          subtitle="See what our clients say about us"
        />

        {loading && <Loading text="Loading Google reviews..." />}

        {error && (
          <div className="text-center mb-12">
            <p className="font-heading text-4xl text-salon-white">
              4.6 <span className="text-salon-gold text-2xl">★</span>
            </p>
            <p className="text-salon-muted text-sm mt-1">
              Based on 1,152 Google reviews
            </p>
            <ErrorState
              message="Live reviews are temporarily unavailable."
              actionLabel="View Reviews on Google"
              actionHref={salonConfig.google.mapsUrl}
            />
          </div>
        )}

        {!loading && !error && data && (
          <>
            <div className="text-center mb-12">
              <p className="text-salon-gold text-2xl mb-3" aria-hidden="true">
                ★ ★ ★ ★ ★
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-heading text-5xl text-salon-white">
                  {data.rating}
                </span>
              </div>
              <p className="text-salon-muted mt-2">
                Based on {data.ratingCount.toLocaleString("en-IN")} Google reviews — updated in real time
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a
                href={generateWriteReviewUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("google_review_click", { action: "write" })}
                className="bg-salon-gold text-salon-primary px-8 py-4 sm:py-3 text-sm font-medium tracking-wider hover:bg-salon-gold-light transition-colors"
              >
                WRITE A REVIEW ON GOOGLE
              </a>
              <a
                href={generateReviewsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("google_review_click", { action: "view_all" })}
                className="border border-salon-gold text-salon-gold px-8 py-4 sm:py-3 text-sm tracking-wider hover:bg-salon-gold hover:text-salon-primary transition-colors"
              >
                VIEW ALL GOOGLE REVIEWS
              </a>
            </div>

            <div className="text-center mb-14">
              <a
                href={salonConfig.google.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-salon-muted text-sm hover:text-salon-gold transition-colors underline underline-offset-4"
              >
                View on Google Maps →
              </a>
            </div>

            {featuredReviews.length > 0 && (
              <div className="mb-14">
                <h3 className="font-heading text-2xl text-salon-white text-center mb-8">
                  Top Reviews
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredReviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))}
                </div>
              </div>
            )}

            {allReviews.length > 0 && (
              <div className="mb-14">
                <h3 className="font-heading text-2xl text-salon-white text-center mb-8">
                  More Google Reviews
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allReviews.slice(0, 23).map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex items-start">
                <ReviewForm />
              </div>
              <div className="flex flex-col gap-4 lg:pt-2">
                <p className="text-salon-muted text-sm leading-relaxed">
                  Our Google rating reflects real feedback from our clients. To
                  read or write reviews on Google, use the buttons above — the
                  same rating and reviews shown there are what we display here.
                </p>
              </div>
            </div>
          </>
        )}

        {!loading && !error && !data && (
          <ErrorState message="Google reviews are currently unavailable." />
        )}
      </div>
    </section>
  );
}