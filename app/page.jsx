"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
} from "lucide-react";
import LogoSplash from "@/components/LogoSplash";
import { useRouter } from "next/navigation";
import { db1 } from "@/lib/firebaseConfig";
import {
  collection,
  query as firestoreQuery, // ✅ rename Firestore's query
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";


const Page = () => {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
 const [posts, setPosts] = useState([]);
  const [showNav, setShowNav] = useState(false);

 useEffect(() => {
    const q = firestoreQuery(
      collection(db1, "blogs"),
      orderBy("createdAt", "desc"),
      limit(20) // always fetch only latest 3
    );

   const unsubscribe = onSnapshot(q, (snapshot) => {
     const latestPosts = snapshot.docs.map((doc) => ({
       id: doc.id,
       ...doc.data(),
     }));
     setPosts(latestPosts);
   });

   return () => unsubscribe();
 }, []);

  
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

 const [showHeader, setShowHeader] = useState(true);
 const [lastScroll, setLastScroll] = useState(0);

 useEffect(() => {
   const handleScroll = () => {
     const currentScroll = window.scrollY;
     if (currentScroll < lastScroll) {
       // Scrolling up
       setShowHeader(true);
     } else {
       // Scrolling down
       setShowHeader(false);
     }
     setLastScroll(currentScroll);
   };

   window.addEventListener("scroll", handleScroll);
   return () => window.removeEventListener("scroll", handleScroll);
 }, [lastScroll]);


  const categories = [
    {
      emoji: "🌍",
      title: "History",
      link: "/history",
      imgSrc: "/history.png", 
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

  const items = [
    { id: 1, title: "Education", img: "/educo.png", link: "/education" },
    { id: 2, title: "Philosophy", img: "/philo.png", link: "/philosophy" },
    { id: 3, title: "Health", img: "/hea.png", link: "/health" },
    {
      id: 4,
      title: "wildlife",
      img: "/wildlife.png",
      link: "/wildlife",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowNav(false); 

    router.push(`/search?q=${encodeURIComponent(query.trim().toLowerCase())}`);
  };

  const handleClick = (i) => {
    setClickedIndex(i);
  };
  return (
    <>
      {showSplash ? (
        <LogoSplash onFinish={handleFinish} />
      ) : (
        <div className="py-18 lg:mt-30 opacity- text-white relative overflow-hidden -mt-2 bg-black to-black">
          {/* <div className=" z-0 ">
            <img
              src="hid.png"
              alt="image"
              className=" w-fit fixed  -opacity-0 z-[-50] bg-black to-black "
            />
          </div> */}
          {/* Hero Section */}

          <main className="z-0 bg-black flex opacity flex-col justify-center items-center  px-4 lg:px-0 max-lg:-mt-10 mb-10 opacity-100 lg:mt-0">
            <div className="space-y-2 ">
              {/* Cyclopedia Creation Title */}
              <img
                src="/hid.png"
                alt="image"
                className="z-0 w-fit lg:w-200 lg:h-200 h-fit opacity- lg:-mt-35 "
              />

              <p className="text-sm lg:text-2xl text-gray-300 max-w-3xl mx-auto lg:-mt-30 text-center">
                Uncovering the Unseen, Revealing the Real.
              </p>

              {/* Buttons */}
            </div>
            <div className="flex  gap-4  group text-sm z-0  lg:mb-20 ">
              <Link href="/about">
                <button className="z-50 border-purple-400 max-lg:hidden  shadow-black shadow-2xl cursor-pointer hover:text-xl flex gap-2 hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-semibold transition-all group-hover:bg-white group-hover:text-black ">
                  Learn More
                  <ChevronRight className="text-purple-300" />
                </button>
              </Link>
            </div>
            <form
              onSubmit={handleSearch}
              className="flex items-center max-lg:hidden "
              role="search"
              aria-label="Site Search"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the latest..."
                className="px-3 py-3 pr-20 rounded-md shadow-2xl bg-white text-black focus:outline-none  w-full"
                aria-label="Search input"
              />

              {/* Search Button inside */}
              {/* <button
                type="submit"
                className="absolute right- top-1/2 -translate-y-1/2 bg-black px-3 py-3 rounded-md text-white font-semibold transition"
              >
                Search
              </button> */}
            </form>
          </main>
        </div>
      )}

      <div className="relative w-full  max-lg:w-1/2 max-md:w-full mx-auto lg:hidden max-lg:-mt-30 max-md:-mt-25 mb-0 bg-black p-5">
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
            placeholder="Search the latest..."
            className="px-3 py-3 pr-20 rounded-md shadow-2xl bg-white text-black focus:outline-none  w-full"
            aria-label="Search input"
          />

          {/* Search Button inside */}
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black px-3 py-3 rounded-md text-white font-semibold transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="bg-gray-950 p-6 text-white max-w-3xl lg:hidden">
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
      <div id="read-more ">{/* Your "Explore more" content goes here */}</div>

      <hr className="border-2" />
      <div className="max-w-5xl mx-auto py-10 px- bg-white">
        <h2 className="text-2xl font-bold mb-6 text-black p-4">Latest News</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`} // <-- Correct route
                className="bg-white  shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-50 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold font-serif">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.subtitle || post.content?.slice(0, 100) + "..."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <h1 className="text-center mb-10 font-serif text-2xl bg-white">
        Eplore more news{" "}
      </h1>
      <section className="px- py-5 md:py-10 -opacity-50  text-black active:text-purple-600 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3 flex flex-col gap-8">
          {/* Card 1 */}
          <div className="relative">
            <img
              src="fun.png"
              alt="News Image"
              className="w-full -mt-5 max-lg:-mt-10"
            />
            <div className="absolute bottom-1 left-4 right-4 bg-white max-lg:h-40  bg-opacity-90 p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/bmFfkpRJx9MceeUlcz5J">
                <h2 className="text-sm font-bold hover:underline">
                  The Strategic Fallout of the Israel-Iran War
                </h2>
              </Link>
              <p className="text-xs text-gray-800 mt-1">June 27, 2025 </p>
              <p className="mt-2 text-gray-900 text-sm">
                Amid all the military calculations and geopolitical theater,
                Ramzy Baroud says one truth stands out. When it mattered most,
                the Iranian people stood united.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative">
            <img
              src="oil.png"
              alt="News Image"
              className="w-full h-60 -mt-5 max-lg:-mt-10"
            />
            <div className="absolute bottom-0 left-4 right-4 bg-white max-lg:h-30 bg-opacity-90 p-4">
              <Link href="https://cyclopedia-media-hub.vercel.app/blog/5njbEcuqy6lFrrYdMS2p">
                <h2 className="text-sm font-bold hover:underline">
                  US Turning Oil-Rich Nigeria into Proxy for its Africa Wars
                </h2>
              </Link>
              <p className="text-xs text-gray-800 mt-1 font-black">by Cyclopedia</p>
              <p className="mt-2 text-gray-900 text-sm">
                T.J. Coles reports on what AFRICOM is doing under the cover of
                counterterrorism.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column — Bold List of Headlines */}
        <aside className="lg:w-1/3 bg-gray-50 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Top Stories:</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="https://cyclopedia-media-hub.vercel.app/blog/jeixznhQcoRJKNT9X6eE"
                className="font-bold hover:underline block"
              >
                AIDS and the Hidden Catholic Church{" "}
              </Link>
            </li>
            <hr />
            <li>
              <Link
                href="https://cyclopedia-media-hub.vercel.app/blog/EBmJtaV9bZ6rmy8blKmw"
                className="font-bold hover:underline block"
              >
                International Medical Workers Decry Israel's 'Deliberate
                Assault' on Their Gaza Colleagues
              </Link>
            </li>
            <hr />
            <li>
              <Link
                href="https://cyclopedia-media-hub.vercel.app/blog/EJ5yu1vWyshhhKiylnRh"
                className="font-bold hover:underline block lowercase"
              >
                TRUMP APPEARS TO BE TARGETING MUSLIM AND “NON-WHITE” STUDENTS
                FOR DEPORTATION
              </Link>
            </li>
            <hr />
            <li>
              <Link
                href="https://cyclopedia-media-hub.vercel.app/blog/N5kZbtsiwriQCAzSfasc"
                className="font-bold hover:underline block"
              >
                The Incredible Disappearing Human Rights Reports
              </Link>
            </li>
            <hr />
            <li>
              <Link
                href="https://cyclopedia-media-hub.vercel.app/blog/2kK65blBTEBBvG7zsSd4"
                className="font-bold hover:underline block"
              >
                U.S. Catholics Have Backed Same-Sex Marriage Since 2011
              </Link>
            </li>
            <hr />
            <li>
              <Link
                href="https://cyclopedia-media-hub.vercel.app/blog/QCLPbZe4t9ZtB8uxx9OB"
                className="font-bold hover:underline block"
              >
                Why Does It Seem Israel Is Always at War With Its Neighbors?
              </Link>
            </li>
            <hr />
            <li>
              <Link
                href="https://cyclopedia-media-hub.vercel.app/blog/7iAlk0vSi3FcX9nFpsox"
                className="font-bold hover:underline block"
              >
                A Brief History Of Israel And Its Conflicts
              </Link>
            </li>
            <hr />
            <li>
              <Link
                href="https://cyclopedia-media-hub.vercel.app/blog/dMc1fv1eVWpeLPV1o0AQ"
                className="font-bold hover:underline block"
              >
                Teens: Sex Can Wait{" "}
              </Link>
            </li>
            <hr />
            <li>
              <Link
                href="https://cyclopedia-media-hub.vercel.app/blog/WkyafCBzn61CEaw5ZfU3"
                className="font-bold hover:underline block"
              >
                Untangling Americans' Complex Views of Morality{" "}
              </Link>
            </li>
          </ul>
        </aside>
      </section>
      <hr className="border-2" />
      <section className="px- py-10 md:py-20 bg-white text-black text-center max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-stretch">
        {/* First Card */}

        <div className="relative w-full lg:w-1/2 ">
          <img
            src="inter.png"
            alt="News Image"
            className="w-full max-md:h-50"
          />
          <div className="absolute z-10 bottom-4 max-md:-bottom-5 left-4 right-4 bg-white bg-opacity-90 p-4 ">
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
            className="w-full h-auto object-cover "
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
            className="w-full h-auto object-cover "
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto items-start justify-center z-50 p- bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Card 1 */}
        <Link
          href="https://cyclopedia-media-hub.vercel.app/blog/nVmpG0se1lyhis8uRH9y"
          className="block bg-white text-black h-full hover:shadow-lg transition "
        >
          <img
            src="/leba.png"
            alt="News Image"
            className="mt-3 w-full h-40 object-cover "
          />
          <h3 className="text-lg font-semibold p-4">
            The Exploitative System that Traps Nigerian Women as Slaves in
            Lebanon
          </h3>
          <p className="text-sm text-gray-400 line-clamp-3 p-4">
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
            className="mt-3 w-full h-40 object-cover "
          />
          <h3 className="text-lg font-semibold  p-4">
            Teens are increasingly turning to AI companions, and it could be
            harming them
          </h3>
          <p className="text-sm text-gray-400  line-clamp-3 p-4">
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
          <h3 className="text-lg font-semibold max-md:-mb-8 mt-4 p-4">
            Britain’s Hidden Helicopter War in Niger
          </h3>
          <p className="text-sm text-gray-400 p-4 line-clamp-3">
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
          <h3 className="text-lg font-semibold mt-4 p-4 max-md:-mb-8">
            Breaking America’s Bonds With Israel
          </h3>
          <p className="text-sm text-gray-400 mt-2 line-clamp-3 p-4 ">
            Taking a cue from the Declaration of Independence, M. Reza Behnam
            submits facts “to a candid world” that impel the dissolution of a
            destructive liaison.
          </p>
        </Link>
      </div>

      <section className="px- text-center grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto  mt-10 ">
        <div className="mt-5 text-black bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <img src="british.png" alt="" />
          <Link href="https://cyclopedia-media-hub.vercel.app/blog/DxewHf37R7X7ZBzQRLE5">
            <h2 className="text-xl font-bold text-left hover:underline text-black p-4 max-md:-mb-8">
              Britain’s secret state and the need for whistle-blowing
            </h2>
          </Link>
          <p className="text-sm text-gray-500 text-left mt p-4">
            In November 2003, I was charged with a breach of the Official
            Secrets Act in the UK. My ‘crime’ had been to reveal an email from
            the US National Security Agency (NSA) to Britain's intelligence
            agency, the Government Communications Headquarters (GCHQ) where I
            was working at the time.
          </p>
        </div>

        <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <img src="uk.png" alt="" />
          <Link href="https://cyclopedia-media-hub.vercel.app/blog/HYhefDd7rXfAAzKBJCyb">
            <h2 className="text-xl font-bold text-left hover:underline text-black p-4 max-md:-mb-8">
              UK government secretly paid foreign YouTube stars for ‘propaganda’{" "}
            </h2>
          </Link>
          <p className="text-sm text-gray-500 text-left mt-5 p-2">
            The past five months have been clarifying. What was supposed to be
            hidden has been thrust into the light. What was supposed to be
            obscured has come sharply into focus.
          </p>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ">
          <img src="som.png" alt="" className="mt-10" />
          <Link href="https://cyclopedia-media-hub.vercel.app/blog/OjdVfovsON2pJsJU9yJr">
            <h2 className="text-xl font-bold text-black text-left hover:underline p-4 max-md:-mb-8">
              How the Western media helped build the case for genocide in Gaza
            </h2>
          </Link>
          <p className="text-sm text-gray-500 text-left mt-5 p-4">
            The past five months have been clarifying. What was supposed to be
            hidden has been thrust into the light. What was supposed to be
            obscured has come sharply into focus.
          </p>
        </div>
      </section>

      {/* Mobile heading */}
      <div id="News-cpd" className="w-full  mt-10">
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
                <h3 className="text-lg font-semibold mt-4 p-4 max-md:-mb-8">
                  The “Slave Bible” is Not What You Think
                </h3>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3 p-4">
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
                <h3 className="text-sm font-semibold mt-2 p-4 max-md:-mb-8">
                  American Border Religion{" "}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1 p-4">
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
                <h3 className="text-sm font-semibold mt-2 p-4 max-md:-mb-8">
                  Hundreds Arrested In London for Opposing Ban on Nonviolent
                  Group Palestine Action{" "}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1 p-4">
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
                <h3 className="text-sm font-semibold mt-2 p-4 max-md:-mb-8">
                  From Good Christian Boys to White Nationalists{" "}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1 p-4">
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
                <h3 className="text-sm font-semibold mt-2 p-4 max-md:-mb-8">
                  Authoritarian Christianity Targets Christians
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1 p-4">
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
                <h3 className="text-sm font-semibold mt-2 p-4 max-md:-mb-8">
                  Identity Crisis: Shari'a Law in Nigeria
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1 p-4">
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
                <h3 className="text-sm font-semibold mt-2 p-4 max-md:-mb-8">
                  Nigeria: An Ephemeral Peace
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 mt-1 p-4">
                  Ceasefire raised false hopes. Boko Haram strikes back.
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="text-center mt-8"></div>
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

      <section className="px-6 py-5 md:py-20 max-w-5xl mx-auto bg-white text-black z-0">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 justify-center hover:shadow-2xl hover:shadow-purple-700">
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
              ${
                clickedIndex === i
                  ? "bg-blue-700 text-white"
                  : "bg-white text-black "
              }
              hover:bg-blue-500 hover:text-white
            `}
            >
              <a aria-label={item.title} className="group ">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gray-100 shadow-md flex items-center justify-center cursor-pointer transition-transform group-hover:scale-120 hover:shadow-purple-600 hover:shadow-2xl duration-300"
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
                <p className="text-center mt-3 text-sm font-medium  text-gray-700 group-hover:text-purple-700 transition-colors">
                  {item.title}
                </p>
              </a>
            </Link>
          ))}
          <div className="p-6 mt-5 lg:ml-auto max-md:justify-center mx-auto">
            {/* More Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg  hover:bg-purple-300   "
            >
              More
            </button>

            {/* Overlay */}
            {isOpen && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                {/* Popup */}
                <div className="bg-white p-6 rounded-2xl max-w-lg w-full relative shadow-lg">
                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                  >
                    ✖
                  </button>

                  <h2 className="text-xl font-bold mb-4 text-center">
                    More Categories
                  </h2>

                  {/* Items */}
                  <div className="grid grid-cols-2 gap-4 ">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.link}
                        className="flex flex-col items-center text-center hover:scale-105 rounded-full justify-center cursor-pointer transition-transform active:text-purple-600 hover:shadow-purple-600 hover:shadow-2xl duration-300"
                        onClick={() => setIsOpen(false)} // Close popup on click
                      >
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-25 h-25 rounded-full object-cover border-2 border-purple-200"
                        />
                        <p className="mt-2 font-medium">{item.title}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Featured Topics */}

      <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* === NEWS CARD 2 === */}
        <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
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
            <p className="text-xs text-gray-600 mt-1 font-black">
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
        <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
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
            <p className="text-xs text-gray-600 mt-1 font-black">By Cyclopedia</p>
            <p className="mt-2 text-gray-800 text-xs">
              Fire-related deaths were reported in Turkey, Spain, Montenegro,
              and Albania.
            </p>
          </div>
        </div>

        {/* === NEWS CARD 4 === */}
        <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="relative w-full h-[220px]">
            <img
              src="/amer.png"
              alt="News 6"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/QUnWDFG1eBq2x4ejSLcs">
              <h2 className="text-sm font-bold text-black hover:underline">
                Americans Say Government Should Address Slavery Effects{" "}
              </h2>
            </Link>
            <p className="text-xs text-gray-600 mt-1 font-black">By Cylopedia</p>
            <p className="mt-2 text-gray-800 text-xs">
              Americans are more likely to think that the history of slavery has
              at least some effect on Black people today than to think it has
              little to no effect. Forty percent of Americans say Black people
              are affected "a lot" by the history of slavery, with 27%
              perceiving "some" effect, 16% "not much" of one and 17% no effect
              at all.{" "}
            </p>
          </div>
        </div>

        {/* === NEWS CARD 5 === */}
        <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="relative w-full h-[220px]">
            <img
              src="/wa.png"
              alt="News 7"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/sample5">
              <h2 className="text-sm font-bold text-black hover:underline">
                Why Does It Seem Israel Is Always at War With Its Neighbors?
              </h2>
            </Link>
            <p className="text-xs text-gray-600 mt-1 font-black">By cyclopedia</p>
            <p className="mt-2 text-gray-800 text-xs">
              The 7th century Muslim Conquest of Jerusalem, followed by the
              Crusades (11th-13th centuries), continued the upheaval in the
              Levant, even though the percentage of Jews living there was
              limited. The one real window of post-New Testament peace in the
              “Holy Land” took place during the Ottoman Era (1517-1917).
              Throughout that period, 400 years passed without any significant
              clashes in Jerusalem or the immediate vicinity..
            </p>
          </div>
        </div>
      </div>

      {/* Timeline of Hidden Events */}
      <section className="px-6 py-16 bg-black text-white max-w-6xl mx-auto -mt-10">
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
        <p className="text-lg max-w-2xl mx-auto% ">
          We are not conspiracy theorists. We are truth seekers. We are the ones
          who question what they tell us, challenge the narrative, and expose
          what lies behind the curtain.
        </p>
      </section>

      {/* Coming Soon Teaser */}
      <section className="px-6 py-16 bg-black text-white max-w-6xl mx-auto %">
        <div className="grid gap-12 lg:grid-cols-3">
          {[
            {
              title:
                "Project 2025 Co-Author Caught Admitting the Secret Conservative Plan to Ban Porn",
              desc: `“We’d have a national ban on pornography if we could, right?” he added. Vought contributed a chapter to the Project 2025 manifesto, which argues in the foreword that all pornography “should be outlawed” and its producers “imprisoned.”`,
              link: "https://cyclopedia-media-hub.vercel.app/blog/zOZ2D7vwGZFBARsYmPjq",
            },
            {
              title:
                "How Britain’s Labour government facilitated the massacre of Biafrans in Nigeria – to protect its oil interests",
              desc: `On the 50th anniversary of the end of the Biafran war, the world’s worst humanitarian crisis in the late 1960s, declassified British files show that Harold Wilson’s government secretly armed and backed Nigeria’s aggression against the secessionist region.`,
              link: "https://cyclopedia-media-hub.vercel.app/blog/WzsZMEGNhs8e85Pr8hOg",
            },
            // {
            //   title: "The Real Intentions Of The Abuja Declaration-1989",
            //   desc: `Apparently, as a result of the growing awareness amongst Christians of the evil planned by the Muslims against the Church, the Muslims went online to edit and distort the information on the Abuja Declaration of 1989. The information on Wikipedia was edited on Monday, 21st July, 2014.`,
            //   link: "/",
            // },
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
                Read more
              </a>
            </article>
          ))}
        </div>

        {/* <div className="mt-12 text-center">
          <a
            href="/drop"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-md text-lg font-semibold transition-colors"
          >
            Find More
          </a>
        </div> */}
      </section>
    </>
  );
};

export default Page;