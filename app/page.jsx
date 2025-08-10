'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Popup from "@/components/Popup";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ArrowRightToLine, 
  ChevronRight, 
  LaptopMinimal, 
  LoaderCircle, 
  Palette, 
  Play, 
  Store, 
  Webhook, 
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import ChatDropdown from "@/components/Chat";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import LogoSplash from "@/components/LogoSplash";


const Page = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const [session] = useState(); 
  const [showpopup, setShowPopup] = useState(true);
  const [showSplash, setShowSplash] = useState(true);


  useEffect(() => {
    const seen = sessionStorage.getItem("hasSeenSplash");
    if (seen) {
      setShowSplash(false);
    }
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem("hasSeenSplash", "true");
    setShowSplash(false);
  };



  return (
    <>
      {showSplash ? (
        <LogoSplash onFinish={handleFinish} />
      ) : (
        <div className="py-18 lg:-mt-60 text-white relative overflow-hidden bg-gradient-to-r from-purple-900 z-0 bg-black to-black">
          {/* Hero Section */}
          <div className=" z-0 ">
            <img
              src="hid.png"
              alt="image"
              className="z-50 w-fit h-fit opacity-15 fixed"
            />
          </div>

          <main className="z-50  flex flex-col justify-center items-center  px-4 lg:px-0 max-lg:mt-40 opacity-100 lg:mt-20">
            <div className="space-y-2 ">
              {/* Cyclopedia Creation Title */}
              <img
                src="hid.png"
                alt="image"
                className="z-0 w-fit lg:w-200 lg:h-200 h-fit opacity-"
              />

              <p className="text-sm lg:text-2xl text-gray-300 max-w-3xl mx-auto lg:-mt-30 -mt-10 text-center">
                Uncovering the Unseen, Revealing the Real.
              </p>

              {/* Buttons */}
            </div>
            <div className="flex  gap-4 mt-2 group text-sm z-0  lg:mb-20">
              <Link href="/about">
                <button className="z-50 border-purple-400 shadow-black shadow-2xl cursor-pointer hover:text-xl flex gap-2 hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-semibold transition-all group-hover:bg-white group-hover:text-black ">
                  Learn More
                  <ChevronRight className="text-purple-300" />
                </button>
              </Link>
            </div>
          </main>
        </div>
      )}

      <section className="px-6 py-10 md:py-20 bg-white text-black text-center max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-stretch">
        {/* First Card */}
        <div className="relative w-full lg:w-1/2">
          <img
            src="erik.png"
            alt="News Image"
            className="w-full h-auto object-cover rounded-md"
          />
          <div className="absolute z-10 bottom-4 left-4 right-4 bg-white bg-opacity-90 p-4 ">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Erik Prince Calls for U.S. to Colonize Africa and Latin America
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              Jon Schwarz February 10 2024,
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              If so many of these countries around the world are incapable of
              governing themselves, it’s time for us to just put the imperial
              hat back on, to say, we’re going to govern those countries
            </p>
          </div>
        </div>

        {/* Second Card */}
        <div className="relative w-full lg:w-1/2">
          <img
            src="/Ame.png"
            alt="News 4"
            className="w-full h-auto object-cover rounded-md"
          />
          <div className="absolute z-10 bottom-4 left-4 right-4 bg-white bg-opacity-90 p-4 ">
            <Link href="/">
              <h2 className="text-sm font-bold text-black hover:underline">
                Americans Leaving Religion
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              By Ryan T. Cragun & Jesse M. Smith — Published on May 7, 2025
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              An excerpt from “Goodbye Religion: The Causes and Consequences of
              Secularization”
            </p>
          </div>
        </div>
      </section>

      <div className="px-4 py-6 lg:mt-20 max-lg:mt-4  ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="relative rounded-xl overflow-hidden shadow-md group h-40 sm:h-48 md:h-full lg:h-64">
            <img
              src="/va.png"
              alt="Politics"
              fill
              className=" group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
            </div>
            <Link href="/">
              <h2 className="text-black underline text-sm md:text-sm font-bold text-center px-2">
                Trump Prepares to Revoke Lifesaving Abortion Care for Veterans
              </h2>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-xl overflow-hidden shadow-md group h-40 sm:h-48 md:h-56 lg:h-64">
            <img
              src="/ghost.png"
              alt="Religion"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
            </div>
              <h2 className="text-black text-sm md:text-sm font-bold text-center px-2">
                ‘Ghost soldiers’ – Britain’s shadow war in west Africa
              </h2>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-xl overflow-hidden shadow-md group h-40 sm:h-48 md:h-56 lg:h-64">
            <img
              src="/med.png"
              alt="Science & Tech"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
            </div>
              <h2 className="text-black text-sm md:text-sm font-bold text-center px-2">
UK media are covering up British spy flights for Israel
              </h2>
          </div>

          {/* Card 4 */}
          <div className="relative rounded-xl overflow-hidden shadow-md group h-40 sm:h-48 md:h-56 lg:h-64">
            <img
              src="/war.png"
              alt="Surveillance"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
            </div>
              <h2 className="text-black text-sm md:text-sm font-bold text-center px-2">
How Britain’s Labour government facilitated the massacre of Biafrans in Nigeria – to protect its oil interests
              </h2>
          </div>
        </div>
           
      </div>



<div className=" mx-auto items-center justify-center">

   <div className="w-full lg:w-1/2">
            <div className="bg-white text-black p-4  h-full">
              <Link href="https://webwizcreation-y7vx.vercel.app/blog/wVh7CTJIgai3XKZ966xO">
                <img
                  src="leba.png"
                  alt="News Image"
                  className="mt-3 w-full h-full"
                />
                <h3 className="text-lg font-semibold mt-4">
The Exploitative System that Traps Nigerian Women as Slaves in Lebanon
                </h3>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
Nigerian migrants arrive in Lagos from Libya. Nigeria has, in the last two years, evacuated thousands of its citizens from Libya and Lebanon after they suffered several forms of abuses, including enslavement. (Sam Olukoya/IPS)


                </p>
              </Link>
            </div>
            </div>
 <div className="w-full lg:w-1/2">
            <div className="bg-white text-black p-4  h-full">
              <Link href="">
                <img
                  src="teen.png"
                  alt="News Image"
                  className="mt-3 w-full h-full"
                />
                <h3 className="text-lg font-semibold mt-4">
Teens are increasingly turning to AI companions, and it could be harming them
                </h3>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                  Teenagers are increasingly turning to AI companions for friendship, support, and even romance. But these apps could be changing how young people connect to others, both online and off.
                </p>
              </Link>
            </div>
</div>
<div className="w-full lg:w-1/2">
            <div className="bg-white text-black p-4  h-full">
              <Link href="https://webwizcreation-y7vx.vercel.app/blog/wVh7CTJIgai3XKZ966xO">
                <img
                  src="hiden.png"
                  alt="News Image"
                  className="mt-3 w-full h-full"
                />
                <h3 className="text-lg font-semibold mt-4">
Britain’s Hidden Helicopter War in Niger
                </h3>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
As Niger expels US troops, Declassified reveals British helicopters operated a taxi service for French forces in the uranium-rich African state.
                </p>
              </Link>
            </div>
</div>

</div>
      {/* Mobile heading */}
      <div id="News-cpd" className="w-full px-4 mt-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Feature Card */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white text-black p-4  h-full">
              <Link href="https://webwizcreation-y7vx.vercel.app/blog/wVh7CTJIgai3XKZ966xO">
                <img
                  src="slave.png"
                  alt="News Image"
                  className="mt-3 w-full h-full"
                />
                <h3 className="text-lg font-semibold mt-4">
                  The “Slave Bible” is Not What You Think
                </h3>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                  The Museum of the Bible presented misleading information to
                  attract people of color to the museum.
                </p>
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
            {/* Card 1 */}
            <div className="bg-white text-black  p-4 ">
              <Link href="https://webwizcreation-y7vx.vercel.app/blog/wVh7CTJIgai3XKZ966xO">
                <img
                  src="sup.jpg"
                  alt="News Image"
                  className="w-full h-32 object-cover "
                />
                <h3 className="text-sm font-semibold mt-2">
                  How are Christians persecuted in Nigeria
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1">
                  Independent thinkers, researchers, and digital
                  truth-seekers...
                </p>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white text-black  p-4 ">
              <Link href="https://webwizcreation-y7vx.vercel.app/blog/vDRvVo48m4oCV4Hwiykk">
                <img
                  src="chr.png"
                  alt="News image"
                  className="w-full h-32 object-cover"
                />
                <h3 className="text-sm font-semibold mt-2">
                  As Christians Are Slaughtered, the World Looks Away
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1">
                  Islamists massacred 200+ in Nigeria. Media silence.
                </p>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white text-black p-4">
              <Link href="https://webwizcreation-y7vx.vercel.app/blog/O9O1DyrTgb70TCemuETa">
                <img
                  src="para.jpg"
                  alt="News Image"
                  className="w-full h-32 object-cover "
                />
                <h3 className="text-sm font-semibold mt-2">
                  The Paranoid Policy of Affirmative Consent
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1">
                  Consent now means exact, performative agreement.
                </p>
              </Link>
            </div>

            {/* Card 4 */}
            <div className="bg-white text-black p-4 ">
              <Link href="">
                <img
                  src="trump.png"
                  alt="Trump"
                  className="w-full h-32 object-cover"
                />
                <h3 className="text-sm font-semibold mt-2">
                  Authoritarian Christianity Targets Christians
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1">
                  Trump’s Christian nationalism may hurt Christians.
                </p>
              </Link>
            </div>

            {/* Card 5 */}
            <div className="bg-white text-black p-4">
              <Link href="">
                <img
                  src="sha.png"
                  alt="Sharia"
                  className="w-full h-32 object-cover "
                />
                <h3 className="text-sm font-semibold mt-2">
                  Identity Crisis: Shari'a Law in Nigeria
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1">
                  In 1999, Sharia shocked the world. What now?
                </p>
              
              </Link>
            </div>

            {/* Card 6 */}
            <div className="bg-white text-black p-4 ">
              <Link href="">
                <img
                  src="nig.png"
                  alt="Nigeria"
                  className="w-full h-32 object-cover "
                />
                <h3 className="text-sm font-semibold mt-2">
                  Nigeria: An Ephemeral Peace
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1">
                  Ceasefire raised false hopes. Boko Haram strikes back.
                </p>
              
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/global">
            <button className="shadow-xl hover:bg-white hover:text-black transition-all px-6 py-2 text-white bg-purple-600 font-bold rounded-lg">
              Global News
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white lg:flex items-center justify-center gap-8">
        <img
          src="untold.png"
          alt="Elevate Your Digital Presence"
          className="mt-5 z-0 w-full lg:w-fit lg:h-50 h-50 rounded-t-lg group-hover:opacity-0 transition duration-300 shadow-2xl shadow-black"
        />
        <Link href="/religion">
          <button className="text-purple text-xl text-center mask-b-from-10%  z-50">
            Read....
          </button>
        </Link>
      </div>

      {/* Featured Topics */}
      <div id="read-more">{/* Your "Explore more" content goes here */}</div>
      <section className="px-6 py-10 md:py-20 max-w-6xl mx-auto bg-white text-black z-0">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              emoji: "🌍",
              title: "History",
              desc: "The Civilizations They Erased from Our Books",
              link: "/history",
            },
            {
              emoji: "🧨",
              title: "Politics",
              desc: "Who Really Profits from War?",
              link: "/politics",
            },
            {
              emoji: "⛪",
              title: "Religion",
              desc: "The Crisis They Orchestrated in God’s Name",
              link: "/religion",
            },
            // {
            //   emoji: "🛰",
            //   title: "Surveillance",
            //   desc: "Digital Prison: How Your Data Builds Your Cage",
            //   link: "/surveillance",
            // },
            {
              emoji: "🧬",
              title: "Science & Tech",
              desc: "Breakthroughs They Buried",
              link: "/science",
            },
            {
              emoji: "👁",
              title: "Control & Media",
              desc: "Programming the Masses: The True Role of News",
              link: "/media",
            },
          ].map((item, i) => (
            <Link key={i} href={item.link} passHref legacyBehavior>
              <a className="z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className=" p-6 z-50  transition-colors cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-2 z-50">
                    {item.emoji} {item.title}
                  </h3>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                </motion.div>
              </a>
            </Link>
          ))}
        </div>

        {/* <div className="text-center mt-10">
          <Link
            href="/category/hidden-truth"
            className="bg-linear-to-tr bg-purple-900 to-black text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-600 transition"
          >
            Start Exploring
          </Link>
        </div> */}
      </section>

      {/* Timeline of Hidden Events */}
      <section className="px-6 py-16 bg-white text-black max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-10 text-center">
          Unfolding the Timeline of Truth
        </h2>
        <div className="relative border-l border-purple-700 ml-4">
          {[
            {
              year: "1947",
              title: "Roswell Incident",
              desc: "The birth of UFO conspiracy theories after a mysterious crash in New Mexico.",
            },
            {
              year: "1963",
              title: "JFK Assassination",
              desc: "Endless speculation over CIA, mafia, and deep state involvement.",
            },
            {
              year: "2001",
              title: "9/11 Attacks",
              desc: "Theories still question the full story behind the towers' fall and geopolitical outcomes.",
            },
            {
              year: "2020",
              title: "Pandemic Power Shift",
              desc: "COVID-19 reshaped the global economy, surveillance, and public trust.",
            },
            {
              year: "Ongoing",
              title: "Digital Censorship",
              desc: "Algorithms now shape what we think, see, and believe online.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="mb-10 ml-6"
            >
              <span className="absolute w-3 h-3 bg-purple-700 rounded-full -left-1.5 mt-1.5"></span>
              <h3 className="text-lg font-semibold">
                {item.year} — {item.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 bg-white">
        <h2 className="text-3xl md:text-4xl mb-10 font-semibold text-center">
          Timeline of Suppressed Events
        </h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {[
            "1963 – JFK Assassination",
            "2001 – 9/11 Inconsistencies",
            "2020 – Global Info Control",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="border-l-4 border-green-500 pl-4"
            >
              <p className="text-lg">{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive World Map (Placeholder) */}

      {/* Real-Time Feed (Mock) */}
      <section className="px-6 py-16 bg-black">
        <h2 className="text-3xl md:text-4xl mb-10 font-semibold text-center text-white">
          Live Truth Feed
        </h2>
        <ul className="space-y-4 max-w-2xl mx-auto text-sm ">
          <li className="border p-4 border-gray-700 bg-white">
            🔴 Leak: Secret meetings between tech giants & security agencies
            revealed.
          </li>
          <li className="border p-4 border-gray-700 bg-white">
            📡 Anonymous whistleblower exposes bio-surveillance projects in
            Africa.
          </li>
          <li className="border p-4 border-gray-700 bg-white">
            🌐 Censored protest footage resurfaces from Middle East.
          </li>
        </ul>
      </section>

      {/* Voices of the Silenced */}

      {/* Mini Documentaries */}
      <section className="px-6 py-16 bg-gradient-to-b from-white to-gray-200">
        <h2 className="text-3xl md:text-4xl mb-10 font-semibold text-center">
          Short Truth Documentaries
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["banporn.mp4", "truth2.mp4", "truth3.mp4"].map((vid, i) => (
            <video
              key={i}
              src={`/${vid}`}
              controls
              className="w-full h-64 object-cover rounded-xl"
            />
          ))}
        </div>
      </section>

      {/* Declassified Section */}
      <section className="px-6 py-16 bg-gradient-to-b from-black to-purple-900">
        <h2 className="text-3xl md:text-4xl mb-10 font-semibold text-center">
          Declassified Files
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "CIA Mind Control",
            "Black Budget Programs",
            "The Vatican Archives",
          ].map((title, i) => (
            <div
              key={i}
              className="bg-white p-5 border border-green-500 rounded-xl"
            >
              <p className="text-sm text-green-400 uppercase">REDACTED</p>
              <h3 className="text-xl font-bold mt-2">{title}</h3>
              <p className="text-sm mt-2">Click to unlock classified truths.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-6 py-20 bg-gradient-to-b from-black to-gray-200 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          What We Fight For
        </motion.h2>
        <p className="text-lg max-w-2xl mx-auto mask-b-from-10% ">
          We are not conspiracy theorists. We are truth seekers. We are the ones
          who question what they tell us, challenge the narrative, and expose
          what lies behind the curtain.
        </p>
      </section>

      {/* Coming Soon Teaser */}
      <p className="text-sm text-gray-200 mb-2 text-center mt-10">Next Drop</p>
      <section className="px-6 py-16 bg-gradient-to-t from-black text-center grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-white text-left mask-b-from-zinc-300">
          Project 2025 Co-Author Caught Admitting the Secret Conservative Plan
          to Ban Porn
        </h2>
        <p className="text-sm mt-2 text-gray-500 text-left max-md:-mt-10 mask-b-from-10%">
          “We’d have a national ban on pornography if we could, right?” he
          added. Vought contributed a chapter to the Project 2025 manifesto,
          which argues in the foreword that all pornography “should be outlawed”
          and its producers “imprisoned.”
        </p>
        <p className="text-purple-900 underline -mt-15 lg:mt-5">Read More</p>

        <h2 className="text-xl font-bold text-white text-left mask-b-from-zinc-300">
          How Britain’s Labour government facilitated the massacre of Biafrans
          in Nigeria – to protect its oil interests
        </h2>
        <p className="text-sm mt-2 text-gray-500 text-left max-md:-mt-10 mask-b-from-10%">
          On the 50th anniversary of the end of the Biafran war, the world’s
          worst humanitarian crisis in the late 1960s, declassified British
          files show that Harold Wilson’s government secretly armed and backed
          Nigeria’s aggression against the secessionist region.
        </p>
        <p className="text-purple-900 underline -mt-15 lg:mt-5">Read More</p>

        <h2 className="text-xl font-bold text-white text-left mt-5 mask-b-from-zinc-300">
          The Real Intentions Of The Abuja Declaration-1989
        </h2>
        <p className="text-sm  text-gray-500 text-left max-md:-mt-10 mask-b-from-10%">
          Apparently, as a result of the growing awareness amongst Christians of
          the evil planned by the Muslims against the Church, the Muslims went
          online to edit and distort the information on the Abuja Declaration of
          1989. The information on Wikipedia was edited on Monday, 21st July,
          2014
        </p>
        <p className="text-purple-900 underline -mt-15 lg:mt-5">Read More</p>
        <a
          href="/drop"
          className="text-purple-900 lg:mt-5 mt-5 z-20 border py-2 px-3 mx-auto rounded-md text-xl bg-purple-400"
        >
          Find More
        </a>
      </section>
    </>
  );
}

      export default Page;
