import React from 'react';

const features = [
  {
    icon: "🌙",
    title: "Dream Journaling",
    description: "Securely capture and revisit your dreams with a sacred digital journal.",
  },
  {
    icon: "🔮",
    title: "AI Interpretation",
    description: "Receive powerful symbolic and spiritual meanings generated just for you.",
  },
  {
    icon: "📖",
    title: "Spiritual Growth",
    description: "Explore themes, symbols, and patterns to deepen your personal journey.",
  },
];

const testimonials = [
  {
    name: "Esther T.",
    text: "Sacred DreamSpace helped me find deeper meaning in my dreams. The interpretations are so nurturing and insightful!",
  },
  {
    name: "Samuel K.",
    text: "I love the journaling feature and the spiritual guidance. It’s become a part of my morning routine.",
  },
  {
    name: "Grace M.",
    text: "The AI interpretations feel personal and comforting. I feel more connected to my dreams than ever before.",
  },
];

function StarRating() {
  return (
    <div className="flex justify-center mb-2">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">★</span>
        ))}
    </div>
  );
}

export default function FeatureCards() {
  return (
    <>
      <div className="py-16 bg-indigo-900 text-white px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why Use Sacred DreamSpace?</h2>
          <p className="text-gray-300 mt-2 text-lg">Tools designed to align your dreams with your spiritual growth.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-indigo-800 p-6 rounded-xl shadow-lg hover:shadow-indigo-600 transition duration-300 border border-indigo-700"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-indigo-950 text-white px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Trusted by Dream Seekers</h2>
          <p className="text-gray-300 text-lg">
            Discover what others are saying about their transformative experiences
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-indigo-900 p-6 rounded-xl shadow-lg border border-indigo-700 flex flex-col items-center"
            >
              <StarRating />
              <p className="text-gray-200 italic mb-4">"{t.text}"</p>
              <div className="font-semibold text-yellow-300">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}