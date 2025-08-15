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
import { useRouter} from "next/navigation";


const Page = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const [session] = useState(); 
  const [showpopup, setShowPopup] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);



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

  const categories = [
    {
      emoji: "🌍",
      title: "History",
      link: "/history",
      imgSrc: "/history.png", // Replace with your actual image URLs or remove to fallback on emoji
    },
    {
      emoji: "🧨",
      title: "Politics",
      link: "/politics",
      imgSrc: "/politics.png",
    },
    {
      emoji: "⛪",
      title: "Religion",
      link: "/religion",
      imgSrc: "/religion.png",
    },
    {
      emoji: "🧬",
      title: "Science & Tech",
      link: "/science",
      imgSrc: "/science.png",
    },
    {
      emoji: "👁",
      title: "Control & Media",
      link: "/media",
      imgSrc: "/media.png",
    },
    {
      emoji: "👁",
      title: "Global News",
      link: "/global",
      imgSrc: "/joins.png",
    },
  ];

  
    const handleSearch = (e) => {
      e.preventDefault();
      if (!query.trim()) return;
      setShowNav(false); // Close nav here

  router.push(
        `/search?q=${encodeURIComponent(query.trim().toLowerCase())}`
      );
    };

  const handleClick = (i) => {
    setClickedIndex(i);
  };
  return (
    <>
      {showSplash ? (
        <LogoSplash onFinish={handleFinish} />
      ) : (
        <div className="py-18 lg:-mt-60 text-white relative overflow-hidden bg-gradient-to-r from-purple-900 z-0 bg-black to-black">
          {/* Hero Section */}
          {/* <div className=" z-0 ">
            <img
              src="hid.png"
              alt="image"
              className=" w-fit h-fit opacity-5 z-[-0]  fixed"
            />
          </div> */}

          <main className="z-50  flex flex-col justify-center items-center  px-4 lg:px-0 max-lg:mt-10 opacity-100 lg:mt-20">
            <div className="space-y-2 ">
              {/* Cyclopedia Creation Title */}
              <img
                src="/hid.png"
                alt="image"
                className="z-0 w-fit lg:w-200 lg:h-200 h-fit opacity- lg:mt-30"
              />

              <p className="text-sm lg:text-2xl text-gray-300 max-w-3xl mx-auto lg:-mt-30 text-center">
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

      <div className="relative w-full lg:w-1/4 max-md:w-full mx-auto lg:hidden">
        <form
          onSubmit={handleSearch}
          className="flex items-center"
          role="search"
          aria-label="Site Search"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything in cyclopedia..."
            className="px-3 py-3 pr-20 rounded-md shadow-2xl border-purple-600 border-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
            aria-label="Search input"
          />

          {/* Search Button inside */}
          <button
            type="submit"
            className="absolute -right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-cyan-400 hover:bg-purple-600 px-3 py-2 rounded-md text-white font-semibold transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="bg-gray-950 p-6 text-white max-w-3xl ">
        {/* Title */}
        <a
          href="https://cyclopedia-media-hub.vercel.app/blog/9dhLYxSLB0fLLRPFBX1Z"
          className="text-blue-400 hover:underline text-lg font-medium cursor-pointer duration-400 ease-in-out   active:text-purple-600 active:bg-purple-900 "
        >
          The World's Crisis in War Reporting
        </a>

        {/* Date + Description */}
        <p className="text-xs text-gray-400">
          Cyclopedia — As{" "}
          <span className="font-bold text-white">journalists</span> are laid off
          and newspapers cut back or shut down, whole sectors of our civic life
          disappear from public view and go dark. Much of local and state
          governments, whole federal departments...
        </p>
      </div>
      <div id="read-more">{/* Your "Explore more" content goes here */}</div>

       <section className="px-6 py-5 md:py-20 max-w-4xl mx-auto bg-white text-black z-0">
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 justify-center">
        {categories.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            passHref
            legacyBehavior
            onClick={() => handleClick(i)}
            className={`
              px-4 py-2
              border border-gray-300
              rounded
              transition duration-300
              ${clickedIndex === i ? "bg-blue-700 text-white" : "bg-white text-black"}
              hover:bg-blue-500 hover:text-white
            `}
          >
            <a aria-label={item.title} className="group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gray-100 shadow-md flex items-center justify-center cursor-pointer transition-transform group-hover:scale-110 duration-300"
              >
                {item.imgSrc ? (
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-25 h-25 object-cover sm:w-20 sm:h-20 rounded-full"
                  />
                ) : (
                  <span className="text-4xl">{item.emoji}</span>
                )}
              </motion.div>
              <p className="text-center mt-3 text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors">
                {item.title}
              </p>
            </a>
          </Link>
        ))}
      </div>
    </section>

      <section className="px-2 py-5 md:py-20 bg-white text-black text-center max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-stretch">
        {/* First Card */}

        <div className="relative w-full lg:w-1/2 ">
          <img
            src="inter.png"
            alt="News Image"
            className="w-full max-md:h-50 rounded-md"
          />
          <div className="absolute z-10 bottom-4 max-md:-bottom-5 left-4 right-4 bg-white bg-opacity-90 p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/EBmJtaV9bZ6rmy8blKmw">
              <h2 className="text-sm font-bold text-black hover:underline">
                International Medical Workers Decry Israel's 'Deliberate
                Assault' on Their Gaza Colleagues
              </h2>
            </Link>
            <p className="text-xs text-gray-800 mt-1">
              Brett Wilkins Aug 13, 2025{" "}
            </p>
            <p className="mt-2 text-gray-900 text-xs">
              Many Palestinian health workers 'suffer from hunger, dizziness and
              fainting episodes while performing operations and triaging
              patients,' reads an open letter signed by the healthcare
              professionals.
            </p>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2">
          <img
            src="erik.png"
            alt="News Image"
            className="w-full h-auto object-cover rounded-md"
          />
          <div className="absolute z-10 bottom-4 left-4 right-4 bg-white bg-opacity-90 p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/Tc0W4qUPzj7ytY7UB5fs">
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
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/dTksJYvlMiYC3QJ2BVa3">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto items-start justify-center z-50 p-4">
        {/* Card 1 */}
        <Link
          href="https://cyclopedia-media-hub.vercel.app/blog/nVmpG0se1lyhis8uRH9y"
          className="block bg-white text-black h-full hover:shadow-lg transition rounded"
        >
          <img
            src="/leba.png"
            alt="News Image"
            className="mt-3 w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-semibold mt-4">
            The Exploitative System that Traps Nigerian Women as Slaves in
            Lebanon
          </h3>
          <p className="text-sm text-gray-400 mt-2 line-clamp-3">
            Nigerian migrants arrive in Lagos from Libya. Nigeria has, in the
            last two years, evacuated thousands of its citizens from Libya and
            Lebanon after they suffered several forms of abuses, including
            enslavement. (Sam Olukoya/IPS)
          </p>
        </Link>

        {/* Card 2 */}
        <Link
          href="https://cyclopedia-media-hub.vercel.app/blog/91mdgClamjnMtE6v0yQf"
          className="block bg-white text-black  h-full hover:shadow-lg transition rounded"
        >
          <img
            src="/teen.png"
            alt="News Image"
            className="mt-3 w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-semibold mt-4">
            Teens are increasingly turning to AI companions, and it could be
            harming them
          </h3>
          <p className="text-sm text-gray-400 mt-2 line-clamp-3">
            Teenagers are increasingly turning to AI companions for friendship,
            support, and even romance. But these apps could be changing how
            young people connect to others, both online and off.
          </p>
        </Link>

        {/* Card 3 */}
        <Link
          href="https://cyclopedia-media-hub.vercel.app/blog/QSmmSGdGenuMSwIRTWpJ"
          className="block bg-white text-black  h-full hover:shadow-lg transition rounded"
        >
          <img
            src="/hiden.png"
            alt="News Image"
            className="mt-3 w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-semibold mt-4">
            Britain’s Hidden Helicopter War in Niger
          </h3>
          <p className="text-sm text-gray-400 mt-2 line-clamp-3">
            As Niger expels US troops, Declassified reveals British helicopters
            operated a taxi service for French forces in the uranium-rich
            African state.
          </p>
        </Link>

        {/* Card 4 */}
        <Link
          href="https://cyclopedia-media-hub.vercel.app/blog/eLBxs8nuMz9j0OrJ3Pm3"
          className="block bg-white text-black  h-full hover:shadow-lg transition rounded"
        >
          <img
            src="/mini.png"
            alt="News Image"
            className="mt-3 w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-semibold mt-4">
            Breaking America’s Bonds With Israel
          </h3>
          <p className="text-sm text-gray-400 mt-2 line-clamp-3">
            Taking a cue from the Declaration of Independence, M. Reza Behnam
            submits facts “to a candid world” that impel the dissolution of a
            destructive liaison.
          </p>
        </Link>
      </div>

      <section className="px-2 text-center grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto  ">
        <div className="mt-5 text-black">
          <img src="british.png" alt="" />
          <Link href="https://cyclopedia-media-hub.vercel.app/blog/DxewHf37R7X7ZBzQRLE5">
            <h2 className="text-xl font-bold text-left hover:underline text-black">
              Britain’s secret state and the need for whistle-blowing
            </h2>
          </Link>
          <p className="text-sm text-gray-500 text-left mt-5">
            In November 2003, I was charged with a breach of the Official
            Secrets Act in the UK. My ‘crime’ had been to reveal an email from
            the US National Security Agency (NSA) to Britain's intelligence
            agency, the Government Communications Headquarters (GCHQ) where I
            was working at the time.
          </p>
        </div>

        <div>
          <img src="uk.png" alt="" />
          <Link href="https://cyclopedia-media-hub.vercel.app/blog/HYhefDd7rXfAAzKBJCyb">
            <h2 className="text-xl font-bold text-left hover:underline text-black">
              UK government secretly paid foreign YouTube stars for ‘propaganda’{" "}
            </h2>
          </Link>
          <p className="text-sm text-gray-500 text-left mt-5 ">
            The past five months have been clarifying. What was supposed to be
            hidden has been thrust into the light. What was supposed to be
            obscured has come sharply into focus.
          </p>
        </div>

        <div>
          <img src="som.png" alt="" className="mt-10" />
          <Link href="https://cyclopedia-media-hub.vercel.app/blog/OjdVfovsON2pJsJU9yJr">
            <h2 className="text-xl font-bold text-black text-left hover:underline">
              How the Western media helped build the case for genocide in Gaza
            </h2>
          </Link>
          <p className="text-sm text-gray-500 text-left mt-5 ">
            The past five months have been clarifying. What was supposed to be
            hidden has been thrust into the light. What was supposed to be
            obscured has come sharply into focus.
          </p>
        </div>
      </section>

      {/* Mobile heading */}
      <div id="News-cpd" className="w-full px-4 mt-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Feature Card */}
          <div className="w-full lg:w-1/2">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/DkwQs35ZgaKbfYnH0fOg">
              <div className="bg-white text-black h-full">
                <img
                  src="/slave.png"
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
              </div>
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
            {/* Card 1 */}
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/up07d67GdXw6WP116uxQ">
              <div className="bg-white text-black ">
                <img
                  src="/border.png"
                  alt="News Image"
                  className="w-full h-32 object-cover "
                />
                <h3 className="text-sm font-semibold mt-2">
                  American Border Religion{" "}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1">
                  An excerpt from "Heaven Has a Wall: Religion, Borders, and the
                  Global United States"{" "}
                </p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/nJeaLwjnuQnYii18kKvL">
              <div className="bg-white text-black ">
                <img
                  src="/arr.png"
                  alt="News image"
                  className="w-full h-32 object-cover"
                />
                <h3 className="text-sm font-semibold mt-2">
                  Hundreds Arrested In London for Opposing Ban on Nonviolent
                  Group Palestine Action{" "}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1">
                  Let us be under no illusion," said one organizer. "The
                  government is criminalizing the people of Britain for standing
                  up against the biggest genocide of the 21st century, as it's
                  livestreamed from Gaza."
                </p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/6cC1bNTyfe7MwciAmvtg">
              <div className="bg-white text-black">
                <img
                  src="/white.png"
                  alt="News Image"
                  className="w-full h-32 object-cover "
                />
                <h3 className="text-sm font-semibold mt-2">
                  From Good Christian Boys to White Nationalists{" "}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1">
                  An excerpt from “Disciples of White Jesus: The Radicalization
                  of American Boyhood”{" "}
                </p>
              </div>
            </Link>

            {/* Card 4 */}
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/UAekeH5vur8lBd9DHKCr">
              <div className="bg-white text-black ">
                <img
                  src="/trump.png"
                  alt="Trump"
                  className="w-full h-32 object-cover"
                />
                <h3 className="text-sm font-semibold mt-2">
                  Authoritarian Christianity Targets Christians
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1">
                  Trump’s Christian nationalism may hurt Christians.
                </p>
              </div>
            </Link>

            {/* Card 5 */}
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/4LiDW10fO3UQx56I4mqB">
              <div className="bg-white text-black ">
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
              </div>
            </Link>

            {/* Card 6 */}
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/eRNFoxbcDwyL000C9dFi">
              <div className="bg-white text-black ">
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
              </div>
            </Link>
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
        <Link href="https://cyclopedia-media-hub.vercel.app/blog/jeixznhQcoRJKNT9X6eE">
          <button className="text-purple text-xl text-center mask-b-from-10%  z-50">
            Read....
          </button>
        </Link>
      </div>

      {/* Featured Topics */}

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === NEWS CARD 1 === */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="relative w-full h-[220px]">
            <img
              src="/medi.png"
              alt="News 3"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/OjdVfovsON2pJsJU9yJr">
              <h2 className="text-sm font-bold text-black hover:underline lowercase">
                HOW THE WESTERN MEDIA HELPED BUILD THE CASE FOR GENOCIDE IN GAZA
              </h2>
            </Link>
            <p className="text-xs text-gray-600 mt-1">By cyclopedia</p>
            <p className="mt-2 text-gray-800 text-xs">
              From obscuring the West’s role in starving Gaza to sensationalised
              accounts of mass rape by Hamas, journalists are playing the role
              of propagandists, not reporters.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 2 === */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="relative w-full h-[220px]">
            <img
              src="/ed.png"
              alt="News 4"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/yr4GRaz6USfU5E9s2INA">
              <h2 className="text-sm font-bold text-black hover:underline">
                UK MEDIA ARE SUPPRESSING MENTIONS OF ISRAEL’S ‘GENOCIDE’ IN GAZA
              </h2>
            </Link>
            <p className="text-xs text-gray-600 mt-1">
              DES FREEDMAN — 18 December 2023
            </p>
            <p className="mt-2 text-gray-800 text-xs">
              Analysis of British media reporting shows they are barely covering
              allegations by UN officials and others that Israel is promoting
              genocide against Palestinians. This is in complete contrast to
              their reporting of Russia in Ukraine.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 3 === */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="relative w-full h-[220px]">
            <img
              src="/fire.png"
              alt="News 5"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/TdKgQZy1WYBEHVhZ86HZ">
              <h2 className="text-sm font-bold text-black hover:underline">
                'We Are Being Cooked Alive': Wildfires Driven by Climate Crisis
                Ravage Europe
              </h2>
            </Link>
            <p className="text-xs text-gray-600 mt-1">By Author Name</p>
            <p className="mt-2 text-gray-800 text-xs">
              Fire-related deaths were reported in Turkey, Spain, Montenegro,
              and Albania.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 4 === */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="relative w-full h-[220px]">
            <img
              src="/news4.png"
              alt="News 6"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/sample4">
              <h2 className="text-sm font-bold text-black hover:underline">
                FOURTH POST TITLE HERE
              </h2>
            </Link>
            <p className="text-xs text-gray-600 mt-1">By Author Name</p>
            <p className="mt-2 text-gray-800 text-xs">
              Another example description for a different news post or article.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 5 === */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="relative w-full h-[220px]">
            <img
              src="/news5.png"
              alt="News 7"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/sample5">
              <h2 className="text-sm font-bold text-black hover:underline">
                FIFTH POST TITLE HERE
              </h2>
            </Link>
            <p className="text-xs text-gray-600 mt-1">By Author Name</p>
            <p className="mt-2 text-gray-800 text-xs">
              Description for the fifth post. Keeps the same layout and design
              as others.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline of Hidden Events */}
      <section className="px-6 py-16 bg-black text-white max-w-6xl mx-auto mt-20">
        <div className="relative border-l border-purple-700 ml-4">
          {[
            {
              year: "1945.",
              title: "80 Years of Living and Writing in the Shadow of the Bomb",
              link: "https://cyclopedia-media-hub.vercel.app/blog/ttRDjI40RVXDo1Em5GUr",
            },
            {
              title: "War Makes the World Sick... Literally",
              link: "https://cyclopedia-media-hub.vercel.app/blog/H8mhMQhTEzRC5kRGiJfK",
            },
            {
              title: "Endless War as Forever Terrorism",
              link: "https://cyclopedia-media-hub.vercel.app/blog/jYPO6EK2aqDmHqgxVPiJ",
            },
            {
              title: "How War Targets the Young",
              link: "https://cyclopedia-media-hub.vercel.app/blog/rfhXdNNhP1a4vYqUkXc9",
            },
            {
              year: "Ongoing",
              title: "The World's War on Children",
              link: "https://cyclopedia-media-hub.vercel.app/blog/1y7LqhTeBaVGbGUMOREC",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="mb-10 ml-6 relative"
            >
              <span className="absolute w-3 h-3 bg-purple-700 rounded-full -left-4.5 mt-1.5"></span>
              <h3 className="text-lg font-semibold">
                {item.year} — {item.title}
              </h3>

              {/* Show clickable link if exists */}
              {item.link && (
                <a
                  href={item.link}
                  target="_self"
                  rel="noopener noreferrer"
                  className="text-purple-700 hover:underline break-all"
                >
                  Read more
                </a>
              )}

              <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 bg-gradient-to-b from-black to-gray-200 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          What We Fight For
        </motion.h2>
        <p className="text-lg max-w-2xl mx-auto mask-b-from-90% ">
          We are not conspiracy theorists. We are truth seekers. We are the ones
          who question what they tell us, challenge the narrative, and expose
          what lies behind the curtain.
        </p>
      </section>

      {/* Coming Soon Teaser */}
      <section className="px-6 py-16 bg-black text-white max-w-6xl mx-auto mask-t-from-90%">
        <div className="grid gap-12 lg:grid-cols-3">
          {[
            {
              title:
                "Project 2025 Co-Author Caught Admitting the Secret Conservative Plan to Ban Porn",
              desc: `“We’d have a national ban on pornography if we could, right?” he added. Vought contributed a chapter to the Project 2025 manifesto, which argues in the foreword that all pornography “should be outlawed” and its producers “imprisoned.”`,
              link: "/project-2025-ban-porn",
            },
            {
              title:
                "How Britain’s Labour government facilitated the massacre of Biafrans in Nigeria – to protect its oil interests",
              desc: `On the 50th anniversary of the end of the Biafran war, the world’s worst humanitarian crisis in the late 1960s, declassified British files show that Harold Wilson’s government secretly armed and backed Nigeria’s aggression against the secessionist region.`,
              link: "/biafran-war-oil-interests",
            },
            {
              title: "The Real Intentions Of The Abuja Declaration-1989",
              desc: `Apparently, as a result of the growing awareness amongst Christians of the evil planned by the Muslims against the Church, the Muslims went online to edit and distort the information on the Abuja Declaration of 1989. The information on Wikipedia was edited on Monday, 21st July, 2014.`,
              link: "/abuja-declaration-1989",
            },
          ].map(({ title, desc, link }, i) => (
            <article
              key={i}
              className="flex flex-col justify-between bg-black p-6 rounded-lg shadow-xl shadow-purple-700 transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold mb-3">{title}</h2>
              <p className="text-gray-300 flex-grow">{desc}</p>
              <a
                href={link}
                className="mt-5 inline-block text-purple-400 hover:text-purple-600 underline font-semibold transition-colors"
              >
                Read More
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/drop"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-md text-lg font-semibold transition-colors"
          >
            Find More
          </a>
        </div>
      </section>
    </>
  );
}

      export default Page;
