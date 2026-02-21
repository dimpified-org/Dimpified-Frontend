import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import LazyLoad from "react-lazyload";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import NailTemp from "./images/nail-template.jpg";
import NailTemp2 from "./images/nail-temp.png";
import BarberTemp from "./images/barber-template.jpg";
import HairTemp from "./images/hair-temp.jpg";
import MakeupTemp from "./images/makeup-template.jpg";
import DentalTemp from "./images/dental-template.png";
import Logo from "./images/dimp-blue.png";
import { Link } from "react-router-dom";
import Navbar from "../../component/Blog/Navbar";
import Footer from "../../component/Blog/Footer";

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <Hero />
      <StatsBar />
      <AboutSection />
      <WhyChoose />
      {/* <TemplateSection /> */}
      <GrowBusiness />
      <TestimonialsSection />
      <SubscriptionSection />
      <Discover />
      <Hero2 />
      <FAQ />
      <Footer />
    </div>
  );
}

const items = [
  {
    icon: "https://i.imghippo.com/files/qQSH4398XeY.png",
    title: "Professional Booking Website",
    text: "Clients can easily view your services, prices, and available times, then book their preferred appointment smoothly online. ",
    link: "Learn More ",
  },
  {
    icon: "https://i.imghippo.com/files/TLX5086zOo.png",
    title: "Customers Pay Ahead",
    text: "Clients pay when they book your services. Receive full payment into your bank account.",
    link: "Learn More ",
  },
  {
    icon: "https://i.imghippo.com/files/qr5716xSI.png",
    title: "Manage Bookings",
    text: "Get ready with all booking details in one place. ",
    link: "Learn More ",
  },
  {
    icon: "https://i.imghippo.com/files/HlRA5211rfk.png",
    title: "SMS and Email Reminders",
    text: "Your clients get prompt notification and reminders so they never miss an appointment.",
    link: "Learn More ",
  },
  {
    icon: "https://i.imghippo.com/files/VfZV5318kqE.png",
    title: "Insights and Analytics",
    text: "Make smart business choices with clear business stats and insights.",
    link: "Learn More ",
  },
  {
    icon: "https://i.imghippo.com/files/sMI1878oko.png",
    title: "AI Marketing",
    text: "Grow your brand with insights that get you noticed",
    link: "Learn More ",
  },
];

const Hero = () => {
  return (
    <section className="md:py-24 py-16 px-6 lg:px-20 bg-gradient-to-b from-white via-[#FBF1FF] to-white relative">
      {/* Decorative star images */}
      <img
        src="https://i.imghippo.com/files/rM6729ODI.png"
        alt="yellow star"
        className="absolute left-0 top-[10rem] w-12 h-12 sm:left-6 sm:top-36 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:left-8 lg:top-44 object-contain z-10"
      />
      <img
        src="https://i.imghippo.com/files/WEDI2506QU.png"
        alt="purple star"
        className="absolute right-0 md:top-[28rem] top-[24rem] w-12 h-12 sm:right-6 sm:top-36 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:right-8  object-contain z-10"
      />

      {/* BADGE FIX */}
      <div className="max-w-4xl mx-auto text-center overflow-visible mt-12">
        <p className="inline-flex z-10 items-center bg-[#F3E8FF] text-[#9810FA] text-sm font-semibold px-8 py-3 rounded-full mb-4 Get Started Now-sm">
          No. 1 booking solution for service businesses
        </p>

        <h1 className="text-3xl leading-snug font-extrabold text-gray-900 lg:text-6xl lg:leading-tight">
          Get Booked Faster, <br />{" "}
          <span className="bg-gradient-to-r from-[#9810FA] via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Manage Time Smarter
          </span>
        </h1>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base lg:text-lg">
          The all-in-one platform for service professionals. Accept bookings,
          receive instant payments, and grow your business effortlessly.
        </p>

        <Link to="/auth/landing">
          <button className="mt-6 lg:mt-8 px-8 py-3 bg-[#9810FA] hover:bg-purple-600   text-white rounded-full text-lg font-semibold Get Started Now-lg">
            Get Started Now
          </button>
        </Link>
      </div>

      {/* Stat Cards - Modern Design */}
      <div className="absolute hidden lg:flex  lg:bottom-[34rem] bottom-[16rem] lg:left-60 left-2  z-30">
        <div className="relative bg-white rounded-2xl Get Started Now-2xl p-3 lg:p-5 transform hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -inset-0.5  rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative">
            <div className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-[#9810FA] to-purple-600 bg-clip-text text-transparent">
              95%
            </div>
            <div className="text-xs lg:text-sm text-gray-600 font-medium mt-1">
              Fewer no-shows
            </div>
          </div>
          {/* Corner accent */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-[#9810FA] to-transparent rounded-full" />
        </div>
      </div>

      <div className="absolute hidden lg:flex  bottom-[2rem] lg:right-60 right-4 z-30">
        <div className="relative bg-white rounded-2xl Get Started Now-2xl p-3 lg:p-5 transform hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -inset-0.5  rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative">
            <div className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-[#9810FA] to-purple-600  bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-xs lg:text-sm text-gray-600 font-medium mt-1">
              Online bookings
            </div>
          </div>
          {/* Corner accent */}
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-pink-500 to-transparent rounded-full" />
        </div>
      </div>

      <div className="flex justify-center mt-12 lg:mt-20 px-4">
        <div className="relative max-w-5xl w-full group">
          {/* Main video container with gradient border */}
          <div className="relative rounded-3xl overflow-hidden Get Started Now-2xl bg-gradient-to-br from-[#F3E8FF]0/20 via-transparent to-pink-400/10 p-1 lg:p-1.5">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#9810FA]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10" />

            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
              {/* Subtle pattern overlay */}

              {/* Video iframe */}
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/Bi6yNbGc750?autoplay=1&mute=1&controls=0&loop=1&playlist=Bi6yNbGc750&playsinline=1&modestbranding=1&showinfo=0"
                  title="Hero Video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Play button overlay for clarity */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-[#9810FA]/20 to-pink-500/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-r from-[#9810FA] to-pink-500 flex items-center justify-center Get Started Now-lg">
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements for visual interest */}
          <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute -z-10 bottom-10 -left-10 w-32 h-32 bg-pink-400/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};

const StatsBar = () => {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Background with vertical gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#9810FA] via-purple-500 to-purple-600"></div>

      {/* Glow effects */}
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-[#F3E8FF]0/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />

      {/* Content container */}
      <div className="relative py-6 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* Left side - Trusted by text */}
            <div className="text-center lg:text-left">
              <span className="text-white text-xl lg:text-2xl font-semibold tracking-tight">
                Trusted by over{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100 font-bold">
                  10,000+
                </span>{" "}
                businesses
              </span>
            </div>

            {/* Divider - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block h-10 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />

            {/* Right side - Reviews & Avatars */}
            <div className="flex flex-row items-center gap-6">
              {/* Avatars with glow effect */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-yellow-100 rounded-full blur opacity-30" />
                <div className="relative flex items-center -space-x-3">
                  {[
                    "https://i.imghippo.com/files/owvG5906wGM.png",
                    "https://i.imghippo.com/files/WS7356JQ.png",
                    "https://i.imghippo.com/files/CcDS4091WYs.png",
                    "https://i.imghippo.com/files/OvLp7855DmM.png",
                  ].map((src, index) => (
                    <div
                      key={index}
                      className="relative group"
                      style={{ zIndex: 4 - index }}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-yellow-100 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity" />
                      <img
                        src={src}
                        className="w-10 h-10 rounded-full border-2 border-white/80 shadow-lg transition-transform duration-300 group-hover:scale-110"
                        alt="Customer avatar"
                      />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white/80 bg-gradient-to-r from-[#F3E8FF]0 to-pink-500 flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">+</span>
                  </div>
                </div>
              </div>

              {/* Rating section */}
              <div className="text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  {/* Stars */}
                  <div className="flex text-yellow-300 text-xl">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="drop-shadow-sm">
                        {star}
                      </span>
                    ))}
                  </div>
                  <span className="text-white/90 font-bold text-lg">4.9</span>
                </div>
                <span className="text-white/80 text-sm lg:text-base font-medium">
                  from{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100 font-semibold">
                    2,500+
                  </span>{" "}
                  reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="py-24 px-6 md:px-20 lg:px-40 grid lg:grid-cols-2 gap-16 items-center bg-white">
      {/* LEFT CONTENT */}
      <div>
        <h2 className="text-[#9810FA] font-semibold mb-3">About Dimpified</h2>

        <h3 className="text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
          Book smoothly,
          <br />
          Earn more
        </h3>

        {/* MOBILE TEXT */}
        <p className="text-gray-600 leading-relaxed text-base lg:hidden">
          Dimpified makes booking faster for you and simpler for your clients.
          With real-time scheduling, customers can quickly choose their
          preferred appointment time ahead and pay, saving you time responding
          to DMs, reducing no-shows, and helping you understand how healthy your
          business is.
        </p>

        {/* DESKTOP TEXT*/}
        <p className="hidden lg:block text-gray-600 leading-relaxed text-lg">
          Dimpified makes booking faster for you and simpler for your <br />
          clients. With real-time scheduling, customers can quickly <br />
          choose their preferred appointment time ahead, and pay, <br />
          saving you time responding to DMs, reduces no-shows, and <br />
          helps you know how healthy your business is.
        </p>

        <Link to="/about-dimpified">
          {" "}
          <button className="mt-8 px-7 py-3 bg-[#9810FA] hover:bg-purple-600   text-white rounded-full text-lg font-semibold Get Started Now hover:bg-[#7e0dcf] transition-all">
            Learn More
          </button>
        </Link>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center relative">
        <img
          src="https://i.imghippo.com/files/BVe5330eCE.png"
          alt="Customer"
          className="w-[420px] h-auto object-contain"
        />
      </div>
    </section>
  );
};
const WhyChoose = () => {
  return (
    <section className="py-24 bg-[#FBF1FF] px-6 md:px-20 lg:px-40">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-16 text-center">
        Why choose Dimpified
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-all text-left"
          >
            <div className="bg-[#F3E8FF] inline-flex items-center justify-center p-3 rounded-lg mb-4">
              <img
                src={item.icon}
                alt={item.text}
                className="w-6 h-6"
                style={{
                  filter:
                    "invert(36%) sepia(83%) saturate(5801%) hue-rotate(256deg) brightness(95%) contrast(92%)",
                }}
              />
            </div>

            <h3 className="font-extrabold text-gray-900 mb-3 text-xl">
              {item.title}
            </h3>

            <p className="text-gray-600 mb-4">{item.text}</p>

            {/* <Link to="/about-dimpified">
        <button className="text-[#9810FA] font-semibold">
          {item.link}
        </button>
      </Link> */}
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link to="/auth/landing">
          {" "}
          <button className="px-8 py-3 bg-[#9810FA] hover:bg-purple-600   text-white rounded-full text-lg font-semibold Get Started Now hover:bg-[#9810FA] hover:bg-purple-600  ">
            Get Started Now
          </button>
        </Link>
      </div>
    </section>
  );
};
// const TemplateSection = () => {

//   const items = [
//     {
//       img: "https://images.pexels.com/photos/2705755/pexels-photo-2705755.jpeg",
//       title: "Vibe Art Studio",
//       category: "Specialized",
//       tags: "Clean • Modern • Minimal",
//     },
//     {
//       img: "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg",
//       title: "Glow Beauty Lounge",
//       category: "Beauty $ Hair",
//       tags: "Luxury • Feminine • Soft",
//     },
//     {
//       img: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
//       title: "FitCore Training",
//       category: "Fitness",
//       tags: "Strong • Energetic • Bold",
//     },
//     {
//       img: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
//       title: "Zen Wellness Spa",
//       category: "Wellness & Spa",
//       tags: "Calm • Natural • Minimal",
//     },
//     {
//       img: "https://images.pexels.com/photos/936554/pexels-photo-936554.jpeg",
//       title: "Elite Photography",
//       category: "Specialized",
//       tags: "Sharp • Modern • Rich",
//     },
//     {
//       img: "https://images.pexels.com/photos/3065170/pexels-photo-3065170.jpeg",
//       title: "Body Sculpt Fitness",
//       category: "Fitness",
//       tags: "Intense • Powerful • Clean",
//     },
//   ];

//   const categories = [
//     "All",
//     "Beauty $ Hair",
//     "Wellness & Spa",
//     "Fitness",
//     "Specialized",
//   ];
//   const [activeTab, setActiveTab] = useState("All");

// FILTER LOGIC
//   const filteredItems =
//     activeTab === "All"
//       ? items
//       : items.filter((item) => item.category === activeTab);

//   return (
//     <section className="py-28 bg-white px-6 lg:px-20 text-center">
//       <h4 className="text-[#9810FA] font-semibold mb-3">BEAUTIFUL TEMPLATES</h4>
//       <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
//         Choose your perfect template
//       </h2>
//       <p className="text-gray-600 max-w-2xl mx-auto mb-12">
//         Start with a professionally designed template tailored to your industry.
//         Customize colors, images, and content to match your brand.
//       </p>

//       {/* TABS */}
//       <div className="flex justify-center gap-4 flex-wrap mb-12">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveTab(cat)}
//             className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200
//               ${
//                 activeTab === cat
//                   ? "bg-[#9810FA] hover:bg-purple-600   text-white border-[#9810FA] Get Started Now"
//                   : "border-gray-300 text-gray-700 hover:bg-gray-100"
//               }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* TEMPLATE GRID */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
//         {filteredItems.map((item, i) => (
//           <div
//             key={i}
//             className="bg-gray-900 rounded-2xl overflow-hidden Get Started Now-lg hover:scale-[1.02] transition-transform"
//           >
//             <img
//               src={item.img}
//               alt={item.title}
//               className="w-full h-52 object-cover opacity-70"
//             />
//             <div className="p-5 text-left text-white">
//               <h3 className="font-semibold text-lg">{item.title}</h3>
//               <p className="text-sm text-gray-300 mt-1">{item.tags}</p>

//               <button className="mt-4 px-4 py-2 bg-white text-gray-900 rounded-full font-semibold text-sm">
//                 Preview Template
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };
const TemplateSection = () => {
  return (
    <section id="templates" className="lg:pt-20 pt-10 ">
      <div className="flex flex-col h-full  px-6 lg:px-40 md:px-24">
        <div className="flex flex-col xl:flex-row  mb-4 text-center xl:text-left">
          <div className="relative text-center xl:text-left">
            <h2 className="text-3xl font-bold text-dark-gray leading-snug">
              Showcase your brand in style with easy to use website template
              <p className="text-sm font-normal leading-7 mt-3">
                A unique collection of{" "}
                <span className="font-semibold">
                  over 100+ pre-made templates to
                </span>{" "}
                choose from that makes setting up a beautiful site easy and
                fast.
              </p>
            </h2>
          </div>
        </div>
      </div>

      <div className="container-fluid mx-auto">
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={25}
            centeredSlides={true}
            speed={4000}
            loop={true}
            allowTouchMove={true}
            modules={[Autoplay]}
            autoplay={{ delay: 1 }}
            breakpoints={{
              1200: { slidesPerView: 4 },
              992: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              575: { slidesPerView: 2 },
            }}
            className="marquee-slide"
          >
            <SwiperSlide>
              <LazyLoad height={200} offset={100}>
                {" "}
                <img
                  loading="lazy"
                  className="w-full"
                  src={DentalTemp}
                  alt=""
                />
              </LazyLoad>
            </SwiperSlide>
            <SwiperSlide>
              <LazyLoad height={200} offset={100}>
                {" "}
                <img loading="lazy" className="w-full" src={HairTemp} alt="" />
              </LazyLoad>
            </SwiperSlide>
            <SwiperSlide>
              <LazyLoad height={200} offset={100}>
                {" "}
                <img loading="lazy" className="w-full" src={NailTemp2} alt="" />
              </LazyLoad>
            </SwiperSlide>
            <SwiperSlide>
              <LazyLoad height={200} offset={100}>
                <img
                  loading="lazy"
                  className="w-full"
                  src={BarberTemp}
                  alt=""
                />
              </LazyLoad>
            </SwiperSlide>
            <SwiperSlide>
              <LazyLoad height={200} offset={100}>
                {" "}
                <img
                  loading="lazy"
                  className="w-full"
                  src={MakeupTemp}
                  alt=""
                />
              </LazyLoad>
            </SwiperSlide>
            <SwiperSlide>
              <LazyLoad height={200} offset={100}>
                {" "}
                <img
                  loading="lazy"
                  className="w-full"
                  src={NailTemp}
                  alt=""
                />{" "}
              </LazyLoad>
            </SwiperSlide>

            {/* <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src="https://gfa-tech.com/dimp-images/barber-template.jpg"
                      alt=""
                    />{" "}
                  </LazyLoad>
                </SwiperSlide>
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src="https://gfa-tech.com/dimp-images/hair-template.jpg"
                      alt=""
                    />
                  </LazyLoad>
                </SwiperSlide>
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src="https://gfa-tech.com/dimp-images/catering-template.jpg"
                      alt=""
                    />{" "}
                  </LazyLoad>
                </SwiperSlide>
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src="https://gfa-tech.com/dimp-images/makeup-template.jpg"
                      alt=""
                    />
                  </LazyLoad>
                </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
const GrowBusiness = () => {
  const stats = [
    {
      icon: "https://i.imghippo.com/files/EqdM2972iJg.png",
      number: "80%",
      text: "More clients",
      desc: "Even clients that often forget always available to take bookings 24/7",
    },
    {
      icon: "https://i.imghippo.com/files/TPG4815ulc.png",
      number: "95%",
      text: "Fewer no-shows",
      desc: "Customers pay when they book or you reduce no-shows and earn more",
    },
    {
      icon: "https://i.imghippo.com/files/VfZV5318kqE.png",
      number: "62%",
      text: "Client retention",
      desc: "Businesses on Dimpified enjoy higher number of returning customers",
    },
    {
      icon: "https://i.imghippo.com/files/cbyc7975E.png",
      number: "200%",
      text: "ROI",
      desc: "Businesses grow their income on Dimpified",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-20 lg:px-40 text-center">
      <h4 className="text-[#9810FA] font-semibold mb-3">PROVEN RESULTS</h4>
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10">
        Grow your business
      </h2>
      <p className="mb-8">
        With Dimpified you do more than just take bookings — you use your time
        wisely and <br />
        grow your income while building your brand.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mx-auto">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#FBF1FF]  p-8 rounded-2xl text-center">
            <div className="inline-flex items-center justify-center bg-[#F3E8FF] p-3 rounded-full mb-4">
              <img
                src={s.icon}
                alt={s.text}
                className="w-6 h-6"
                style={{
                  filter:
                    "invert(36%) sepia(83%) saturate(5801%) hue-rotate(256deg) brightness(95%) contrast(92%)",
                }}
              />
            </div>
            <h3 className="text-4xl font-extrabold text-black">{s.number}</h3>
            <p className="text-gray-600 mt-3">{s.text}</p>
            <p className="text-gray-600 mt-3">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
const testimonials = [
  {
    name: "Amara Johnson",
    role: "Spa Owner",
    text: "With Dimpified, I stopped losing clients in my DMs. Now I'm fully booked every week!",
    image: "https://i.imghippo.com/files/Pzvk6228Nkk.jpg",
    rating: 5,
  },
  {
    name: "Tunde Adeyemi",
    role: "Fitness Coach",
    text: "Instant payments changed how I manage my business. Clients love the experience.",
    image: "https://i.imghippo.com/files/iFyZ2550NdM.jpg",
    rating: 5,
  },
  {
    name: "Sarah Martinez",
    role: "Beauty Consultant",
    text: "The automated reminders alone have saved my business. My no-show rate dropped to just 5%.",
    image: "https://i.imghippo.com/files/mRFn2291Dms.jpg",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Active users" },
  { value: "500K+", label: "Bookings processed" },
  { value: "4.9/5", label: "Average rating" },
  { value: "98%", label: "Customer satisfaction" },
];

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white rounded-2xl p-6 md:p-8 Get Started Now-lg flex flex-col justify-between"
  >
    <div>
      <div className="flex items-center mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm mr-1">
            ★
          </span>
        ))}
      </div>
      <p className="text-gray-700 text-sm md:text-base mb-6">
        {testimonial.text}
      </p>
    </div>

    <div className="flex items-center mt-4">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <h4 className="text-gray-900 font-semibold text-sm md:text-base">
          {testimonial.name}
        </h4>
        <p className="text-gray-500 text-xs md:text-sm">{testimonial.role}</p>
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  // AUTOPLAY EVERY 4 SECONDS
  useEffect(() => {
    const slide = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(slide);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-20 px-6 md:px-20 lg:px-40 bg-gradient-to-b from-[#9810FA] to-[#3F0994] text-white font-sans"
    >
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-10">
        Trusted by thousands of businesses
      </h2>
      <div className="relative md:hidden w-full overflow-hidden mb-12">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-full px-3">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>

        {/* CAROUSEL DOTS */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                active === i ? "bg-white w-4" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="hidden md:grid md:grid-cols-3 gap-6 mb-12">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </div>
      <div
        className="
          grid grid-cols-2 gap-y-6 py-8 px-6 w-full mx-auto rounded-xl
          md:flex md:items-center md:justify-center md:gap-12 md:rounded-full md:py-5 md:px-12
          bg-[#ffffff22] backdrop-blur-sm
        "
      >
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <p className="text-xl font-bold md:text-2xl">{s.value}</p>
            <p className="text-[12px] opacity-90 md:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const SubscriptionSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = {
    lite: {
      monthly: { price: "Free (NGN 0)", description: "Per Month" },
      annual: { price: "Free (N 0)", description: "Per Year" },
    },
    plus: {
      monthly: { price: "NGN 4,500", description: "Per Month" },
      annual: { price: "N 45,000", description: "Per Year" }, // Assuming 10% discount
    },
    pro: {
      monthly: { price: "NGN 6,750", description: "Per Month" },
      annual: { price: "NGN 67,500", description: "Per Year" }, // Assuming 10% discount
    },
  };

  const handleToggle = (isAnnualPlan) => {
    setIsAnnual(isAnnualPlan);
  };

  return (
    <section
      id="pricing"
      className="w-full flex flex-col items-center py-16 px-4 bg-[#FBF1FF]"
    >
      <p className="text-[#A685E2] font-semibold text-sm tracking-wide mb-2">
        PRICING
      </p>

      <h1 className="text-4xl font-bold text-[#1A1A1A]">Subscription</h1>

      <p className="text-gray-500 mt-2 text-center">
        Compare and choose your preferred plan
      </p>

      {/* Toggle Buttons ... omitted for brevity */}

      {/* Subscription Cards */}
      {/* CHANGE 1: Changed items-start to items-stretch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14 w-full max-w-6xl items-stretch">
        {/* Lite Plan */}
        {/* CHANGE 2: Added flex flex-col h-full */}
        <div className="bg-white rounded-2xl shadow-md flex flex-col h-full">
          <div
            className="p-8 rounded-t-2xl"
            style={{ backgroundColor: "#61089C26" }}
          >
            <h3 className="text-xl font-semibold">Free Plan</h3>
            <p className="text-gray-600 text-sm mt-2">
              Solopreneur (Small business/service professionals) who just wants
              to show their services and get booked.
            </p>
            <p className="text-3xl font-bold mt-5">
              {isAnnual
                ? pricingPlans.lite.annual.price
                : pricingPlans.lite.monthly.price}{" "}
              <span className="text-sm font-normal">
                {isAnnual
                  ? pricingPlans.lite.annual.description
                  : pricingPlans.lite.monthly.description}
              </span>
            </p>
          </div>

          {/* CHANGE 3: Added flex-grow and flex flex-col to this wrapper */}
          <div className="p-8 flex-grow flex flex-col">
            <Link to="/free/auth/pre-signup">
              <button className="bg-[#9810FA] hover:bg-purple-600 text-white py-3 rounded-full font-medium w-full transition-colors duration-200">
                Get Started Now
              </button>
            </Link>

            <div className="mt-8">
              <h4 className="font-semibold mb-3">What you get:</h4>
              <ul className="space-y-3 text-m text-gray-600">
                <li>
                  ✓ Service listing page: Show all your services in one place.
                </li>
                <li>
                  ✓ Booking link: Share on socials to get bookings, not DMs.
                </li>
                <li>✓ Calendar sync: Sync with your google calendar.</li>
                <li>✓ Auto Booking Reminder: Customers get auto reminders.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Plus Plan */}
        {/* CHANGE 2: Added flex flex-col h-full */}
        <div className="bg-white rounded-2xl shadow-md flex flex-col h-full">
          <div
            className="p-8 rounded-t-2xl"
            style={{ backgroundColor: "#61089C26" }}
          >
            <h3 className="text-xl font-semibold">Lite Plan</h3>
            <p className="text-gray-600 text-sm mt-2">
              Solopreneur with physical store and multiple staffs.
            </p>
            <p className="text-3xl font-bold mt-5">
              {isAnnual
                ? pricingPlans.plus.annual.price
                : pricingPlans.plus.monthly.price}{" "}
              <span className="text-sm font-normal">
                {isAnnual
                  ? pricingPlans.plus.annual.description
                  : pricingPlans.plus.monthly.description}
              </span>
            </p>
            {isAnnual && (
              <p className="text-green-600 text-sm font-medium mt-2">
                Save 10% with annual billing
              </p>
            )}
          </div>

          {/* CHANGE 3: Added flex-grow and flex flex-col */}
          <div className="p-8 flex-grow flex flex-col">
            <Link to="/auth/personal-Information">
              <button className="bg-[#9810FA] hover:bg-purple-600 text-white py-3 rounded-full font-medium w-full transition-colors duration-200">
                Get Started Now
              </button>
            </Link>

            <div className="mt-8">
              <h4 className="font-semibold mb-3">What you get:</h4>
              <ul className="space-y-3 text-m text-gray-600">
                <li>✓ Website Landing Page: Show your brand.</li>
                <li>✓ Booking link: Share on socials.</li>
                <li>✓ Calendar sync: Sync with your google calendar.</li>
                <li>✓ Unlimited Auto Booking Reminder.</li>
                <li>✓ Recurring appointments.</li>
                <li>✓ Staff onboarding.</li>
                <li>✓ Group Appointment.</li>
                <li>✓ And more feature to come.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Discover = () => {
  return (
    <section className="py-24 px-6 md:px-20 lg:px-40 grid lg:grid-cols-2 gap-16 items-center bg-white">
      <div className="flex-1">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Get discovered by new customers
        </h2>
        <p className="text-gray-600 mb-8">
          Dimpified is the No 1 trusted online booking platform to grow your
          business
        </p>

        <ul className="space-y-8 text-gray-700">
          {/* Item 1 */}
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-[#F3E8FF] p-2.5 rounded-lg mt-1">
              <img
                src="https://i.imghippo.com/files/GSi4889kRw.png"
                alt="Promote"
                className="w-4 h-4"
                style={{
                  filter:
                    "invert(36%) sepia(83%) saturate(5801%) hue-rotate(256deg) brightness(95%) contrast(92%)",
                }}
              />
            </div>
            <div>
              <span className="font-bold text-gray-900 block mb-1">
                Promote your services
              </span>
              <p className="text-gray-600">
                List your services for more visibility, reach more customers &
                gain credibility.
              </p>
            </div>
          </li>

          {/* Item 2 */}
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-[#F3E8FF] p-2.5 rounded-lg mt-1">
              <img
                src="https://i.imghippo.com/files/VfZV5318kqE.png"
                alt="Visibility"
                className="w-4 h-4"
                style={{
                  filter:
                    "invert(36%) sepia(83%) saturate(5801%) hue-rotate(256deg) brightness(95%) contrast(92%)",
                }}
              />
            </div>
            <div>
              <span className="font-bold text-gray-900 block mb-1">
                Increase visibility
              </span>
              <p className="text-gray-600">
                Over 50k monthly active customers are ready to book your
                services.
              </p>
            </div>
          </li>

          {/* Item 3 */}
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-[#F3E8FF] p-2.5 rounded-lg mt-1">
              <img
                src="https://i.imghippo.com/files/oIw5582lQ.png"
                alt="Save time"
                className="w-4 h-4"
                style={{
                  filter:
                    "invert(36%) sepia(83%) saturate(5801%) hue-rotate(256deg) brightness(95%) contrast(92%)",
                }}
              />
            </div>
            <div>
              <span className="font-bold text-gray-900 block mb-1">
                Save time
              </span>
              <p className="text-gray-600">
                Let customers book you online 24/7, even while you sleep.
              </p>
            </div>
          </li>
        </ul>

        <Link to="/about-dimpified">
          <button className="mt-8 bg-[#9810FA] hover:bg-purple-600 text-white px-6 py-3 rounded-full transition-colors duration-200">
            Learn More
          </button>
        </Link>
      </div>

      <div className="flex-1">
        <img
          src="https://i.imghippo.com/files/Bpp2023yc.jpg"
          alt="Customer at cashier"
          className="rounded-xl shadow-lg w-full object-cover"
        />
      </div>
    </section>
  );
};
const Hero2 = () => {
  return (
    <section className="w-full bg-[#6A0DAD] py-28 flex flex-col items-center text-center px-4">
      <h1 className="text-white text-3xl md:text-5xl font-semibold max-w-2xl">
        Grow your business
        <br />
        One booking at a time
      </h1>

      <Link to="/auth/landing">
        {" "}
        <button className="mt-6 bg-white text-[#6A0DAD] font-semibold py-3 px-8 rounded-full hover:opacity-90 transition">
          Get Started Now
        </button>
      </Link>
    </section>
  );
};
const faqData = [
  {
    question: "Why should I use Dimpified?",
    answer:
      "Dimpified saves you time by letting customers see your services and book times that suit them. They can pay online, which fills your calendar ahead. Automatic reminders help reduce no-shows, and you don’t have to reply to booking requests in messages. This frees you to focus on your work and grow your business. ",
  },
  {
    question: "How does Dimpified help me manage bookings more easily?",
    answer:
      "Dimpified gives you a reliable booking link your customers can use to book and pay in advance. With real-time scheduling, customers see your availability and choose their time slots.",
  },
  {
    question: "How can my customers book my services?",
    answer:
      "Your customers can book your services using your unique booking link, also found on your website URL or your dashboard after signing up.",
  },
  {
    question: "Can I accept online payments through Dimpified?",
    answer:
      "Yes. You can accept online payments in two way! Customers can pay into your bank account or pay through our online payment system.",
  },
  {
    question: "What do I need to get started on Dimpified?",
    answer:
      "You only need a mobile smartphone with a browser app (Chrome, Firefox etc).",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full px-6 md:px-20 lg:px-40 py-20">
      <h2 className="text-3xl md:text-4xl font-semibold mb-10">
        Frequently asked questions
      </h2>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border rounded-xl">
            <button
              className="w-full flex justify-between items-center py-5 px-6 text-left font-medium text-lg"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
