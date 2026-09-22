interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-salon-white mb-4">
        {title}
      </h2>
      <div className="w-20 h-0.5 bg-salon-gold mx-auto mb-6" />
      {subtitle && (
        <p className="text-salon-muted max-w-2xl mx-auto text-lg">{subtitle}</p>
      )}
    </div>
  );
}
