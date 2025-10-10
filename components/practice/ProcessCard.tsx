// components/cards/ProcessCard.tsx
interface ProcessCardProps {
  number: string;
  title: string;
  description: string;
}

export function ProcessCard({ number, title, description }: ProcessCardProps) {
  return (
    <div className="text-center p-5 rounded-none border">
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 font-georgia text-2xl bg-primary-gold text-white"
      >
        {number}
      </div>
      <h3
        className="font-georgia text-2xl mb-4"
        style={{ color: "var(--text-dark)" }}
      >
        {title}
      </h3>
      <p
        className="text-base leading-relaxed"
        style={{ color: "var(--text-medium)" }}
      >
        {description}
      </p>
    </div>
  );
}
