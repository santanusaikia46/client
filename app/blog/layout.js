export const metadata = {
  title: "Heritage Blog — Stories & Insights | TatiAssam",
  description:
    "Explore the rich world of Assamese textiles — culture, craft, style guides, and the artisans who keep these traditions alive. Read stories from the looms of Assam.",
  keywords: [
    "Assam textile blog", "Mekhela Chador history", "Assamese weaving culture",
    "silk saree care guide", "TatiAssam stories", "handloom India blog",
    "Muga silk facts", "Sualkuchi weavers"
  ],
  openGraph: {
    title: "Heritage Blog — Stories & Insights | TatiAssam",
    description: "Dive into the world of Assamese textiles — culture, craft, and style.",
    url: "https://tatiassam.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heritage Blog | TatiAssam",
    description: "Stories and insights from the looms of Assam.",
  },
  alternates: {
    canonical: "https://tatiassam.com/blog",
  },
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
