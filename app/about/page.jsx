"use client";

import { useEffect, useState } from "react";
import { Lightbulb, Target, Shield, Users, BookOpen, Globe, Eye, Compass, Award, Heart } from "lucide-react";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen font-sans">
      {/* Hero Section */}
      <header className="flex flex-col justify-center items-center min-h-screen text-center px-6 md:px-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight">
          About{" "}
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text font-serif">
            The Cyclopedia
          </span>
        </h1>
        <img
          src="hid.png"
          alt="Cyclopedia image"
          className="shadow-2xl rounded-2xl mb-6 w-48 h-48 object-cover"
        />
        <p className="text-purple-600 dark:text-purple-400 mb-4 text-lg font-semibold">
          Uncovering the Unseen, Revealing the Real.
        </p>
        <p className="max-w-3xl leading-relaxed text-lg opacity-80">
          <span className="text-3xl text-purple-400">We</span> are not just
          another media outlet. We are a movement of minds — built for those
          who question, research, and seek the truth behind the curtain.
        </p>
      </header>

      {/* Mission Statement */}
      <section className="px-6 md:px-20 py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed opacity-95">
            The Cyclopedia is dedicated to delivering truth, light, and clarity in a world 
            saturated with misinformation. We provide curated insights, investigative journalism, 
            and evidence-based information to empower our readers with knowledge that matters. 
            We believe in transparency, critical thinking, and the power of informed communities.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="px-4 md:px-10 py-16">
        <h2 className="text-center text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
          Who We Are
        </h2>

        <div className="flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory pb-4 px-4">
          {/* Card 1 */}
          <div className="snap-start flex-shrink-0 w-80 bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Eye className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Identity</h3>
            <p className="text-sm opacity-80 mb-4">
              We are independent thinkers, digital truth-seekers, and
              investigators who believe the world is deeper than headlines.
            </p>
            <ul className="text-sm space-y-2 opacity-80">
              <li>• Story analysts</li>
              <li>• Alternative historians</li>
              <li>• Independent journalists</li>
              <li>• Cultural observers</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="snap-start flex-shrink-0 w-80 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Target className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Purpose</h3>
            <p className="text-sm opacity-80 mb-4">
              We ask questions and connect dots others ignore. Because
              truth isn't always comfortable — but it's necessary.
            </p>
            <ul className="text-sm space-y-2 opacity-80">
              <li>• Challenge mainstream narratives</li>
              <li>• Uncover hidden connections</li>
              <li>• Provide alternative perspectives</li>
              <li>• Empower critical thinking</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="snap-start flex-shrink-0 w-80 bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Why We Exist</h3>
            <p className="text-sm opacity-80 mb-4">
              Because information is often filtered. We re-examine history,
              narratives, and the facts you were taught.
            </p>
            <ul className="text-sm space-y-2 opacity-80">
              <li>• Combat misinformation</li>
              <li>• Promote transparency</li>
              <li>• Foster intellectual freedom</li>
              <li>• Build informed communities</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30">
        <h2 className="text-center text-4xl font-bold mb-12 text-purple-600 dark:text-purple-400">
          What We Do
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Investigative Journalism */}
          <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Compass className="text-purple-600 dark:text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Investigative Journalism</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              We dig deep into stories that matter, uncovering truths that mainstream media often overlooks. 
              Our team conducts thorough research and fact-checking to bring you reliable information.
            </p>
          </div>

          {/* Curated Content */}
          <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="text-indigo-600 dark:text-indigo-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Curated Insights</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              We carefully select and analyze information from diverse sources, providing you with 
              well-rounded perspectives on complex topics and current events.
            </p>
          </div>

          {/* Evidence-Based Reporting */}
          <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Shield className="text-purple-600 dark:text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Evidence-Based Reporting</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Every claim we make is backed by verifiable sources and rigorous research. 
              We prioritize accuracy and integrity in all our published content.
            </p>
          </div>

          {/* Community Building */}
          <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Users className="text-indigo-600 dark:text-indigo-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Community Building</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              We foster a global community of truth-seekers, critical thinkers, and informed citizens 
              who engage in meaningful discussions and share valuable insights.
            </p>
          </div>

          {/* Knowledge Transparency */}
          <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="text-purple-600 dark:text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Knowledge Transparency</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              We believe in open access to information. Our platform makes complex topics 
              understandable and accessible to everyone, regardless of background.
            </p>
          </div>

          {/* Global Coverage */}
          <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Globe className="text-indigo-600 dark:text-indigo-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Global Perspective</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              From Kano to the world, we cover stories with international relevance, 
              connecting local insights to global movements and trends.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="px-6 md:px-20 py-16">
        <h2 className="text-center text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
          Our Core Values
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
              <Award className="text-purple-600 dark:text-purple-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Integrity</h3>
            <p className="text-sm opacity-80">
              We stand by our commitment to truthful, accurate, and unbiased reporting. 
              Our reputation is built on trust and transparency.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
              <Eye className="text-indigo-600 dark:text-indigo-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Clarity</h3>
            <p className="text-sm opacity-80">
              We cut through the noise to deliver clear, concise, and meaningful information 
              that helps you make informed decisions.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
              <Heart className="text-purple-600 dark:text-purple-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Courage</h3>
            <p className="text-sm opacity-80">
              We have the courage to ask difficult questions and challenge conventional narratives, 
              even when it's uncomfortable.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="px-6 md:px-20 py-16 text-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <h2 className="text-4xl font-bold mb-6 text-purple-600 dark:text-purple-400">Our Journey</h2>
        <p className=" mx-auto text-lg leading-relaxed opacity-80 mb-8">
          The Cyclopedia was founded out of a need for honest inquiry and open <br/>
          minds. We began as a small community sharing unconventional
          insights and evolved into a platform for collective awareness. 
        </p>
        <p className=" mx-auto text-lg leading-relaxed opacity-80">
          Today, we serve thousands of readers across Nigeria and beyond, <br/> 
          providing a trusted source for investigative journalism and critical analysis. 
          Our journey continues — and you're part of it.
        </p>
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-20 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
        <p className=" mx-auto text-lg opacity-80 mb-8">
          Become part of a growing movement of truth-seekers, critical thinkers, <br/>
          and informed citizens. Stay updated with our latest investigations and insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Contact Us
          </a>
          <a
            href="/global"
            className="px-8 py-4  font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Explore Articles
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;