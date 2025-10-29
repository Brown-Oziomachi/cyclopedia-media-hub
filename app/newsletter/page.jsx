import NewsletterForm from "@/components/NewsLetter";

export const metadata = {
  title: "Newsletter | The Cyclopedia",
  description:
    "Subscribe to The Cyclopedia newsletter. Get curated news, exclusive insights, and top stories delivered directly to your inbox.",
  referrer: "strict-origin-when-cross-origin",
};

export default function HomePage() {
  return (
    <div>
      <NewsletterForm />
    </div>
  );
}
