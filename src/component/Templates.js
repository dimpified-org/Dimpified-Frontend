import React from "react";
import BarberImage1 from "../assets/Template/barber-1.png";
import HairStylist1 from "../assets/BarberImage2.png";
import HairStylist2 from "../assets/HairStylist.png";
import HairStylist3 from "../assets/HairStylist3.png";
import HairStylist4 from "../assets/HairStylist4.png";
import HairStylist7 from "../assets/HairStylist7.png";
import HairStylist8 from "../assets/HairStylist8.png";
import Nail1 from "../assets/nail1.png";
import Nail2 from "../assets/nail2.png";
import Nail3 from "../assets/nail3.png";
import Nail4 from "../assets/nail4.png";
import Nail5 from "../assets/nail5.png";
import BarberImage3 from "../assets/BarberImage3.png";
import BarberImage4 from "../assets/BarberImage4.png";
import BarberImage6 from "../assets/BarberImage5.png";
import BarberImage7 from "../assets/BarberImage6.png";
import BarberImage5 from "../assets/blankTemplate.png";
import Gym1 from "../assets/Gym1.png";
import Gym2 from "../assets/Gym2.png";
import Gym3 from "../assets/gym3.png";
import Gym4 from "../assets/gym4.png";
import Gym5 from "../assets/gym5.png";
import MakeupImage1 from "../assets/Template/make-up-1.png";
import MakeupImage2 from "../assets/Makeup1.png";
import MakeupImage3 from "../assets/Makeup2.png";
import MakeupImage4 from "../assets/Makeup3.png";
import Spa1 from "../assets/Spa1.png";
import Spa2 from "../assets/spa2.png";
import Spa3 from "../assets/spa3.png";
import Spa4 from "../assets/spa4.png";
import Spa5 from "../assets/spa5.png";
import Dentist1 from "../assets/Dentist1.png";
import Dentist2 from "../assets/Dentist2.png";
import Dentist3 from "../assets/Dentist4.png";
import Dentist4 from "../assets/Dentist5.png";
import Dentist5 from "../assets/Dentist3.png";
import GeneralTemplate from "../assets/generalTemplate.png";

const templates = [
  {
    id: 10,
    title: "Classic Barber",
    description: "Description for Classic Barber",
    image: BarberImage1,
    category: "Barber Shop",
  },
  // {
  //   id: 11,
  //   title: "Hair Stylist",
  //   description: "Description for Hair Stylist",
  //   image: HairStylist1,
  //   category: "Hair Salon",
  // },
  {
    id: 12,
    title: "Make Up",
    description: "Description for Makeup",
    image: MakeupImage1,
    category: "Makeup Artist Services",
  },
  {
    id: 13,
    title: "Modern Barber",
    description: "Description for Modern Barber",
    image: BarberImage3,
    category: "Barber Shop",
  },
  {
    id: 14,
    title: "Modern Barber",
    description: "Description for Modern Barber",
    image: BarberImage4,
    category: "Barber Shop",
  },
  {
    id: 15,
    title: "Blank Template",
    description: "Description for Blank Template",
    image: BarberImage5,
    category: "Blank Template",
  },
  {
    id: 16,
    title: "Hair Stylist",
    description: "Description for Hair Stylist",
    image: HairStylist2,
    category: "Hair Salon",
  },
  {
    id: 17,
    title: "Make Up",
    description: "Description for Makeup",
    image: MakeupImage2,
    category: "Makeup Artist Services",
  },
  {
    id: 38,
    title: "Make Up",
    description: "Description for Makeup",
    image: MakeupImage3,
    category: "Makeup Artist Services",
  },
  {
    id: 40,
    title: "Modern Nail Stylist ",
    description: "Description for Modern Nail Stylist",
    image: Nail3,
    category: "Nail Salon",
  },
  {
    id: 41,
    title: "Modern Nail Stylist ",
    description: "Description for Modern Nail Stylist",
    image: Nail4,
    category: "Nail Salon",
  },
  {
    id: 42,
    title: "Modern Nail Stylist ",
    description: "Description for Modern Nail Stylist",
    image: Nail5,
    category: "Nail Salon",
  },

  // {
  //   id: 47,
  //   title: "Hair Stylist",
  //   description: "Description for Hair Stylist",
  //   image: HairStylist7,
  //   category: "Hair Salon",
  // },
  // {
  //   id: 48,
  //   title: "Hair Stylist",
  //   description: "Description for Hair Stylist",
  //   image: HairStylist8,
  //   category: "Hair Salon",
  // },
  // {
  //   id: 39,
  //   title: "Hair Stylist",
  //   description: "Description for Hair Stylist",
  //   image: HairStylist4,
  //   category: "Hair Salon",
  // },
  {
    id: 18,
    title: "Hair Stylist",
    description: "Description for Hair Stylist",
    image: HairStylist3,
    category: "Hair Salon",
  },
  {
    id: 19,
    title: "Modern Nail Stylist ",
    description: "Description for Modern Nail Stylist",
    image: Nail1,
    category: "Nail Salon",
  },
  {
    id: 20,
    title: "Modern Nail Stylist ",
    description: "Description for Modern Nail Stylist",
    image: Nail2,
    category: "Nail Salon",
  },
  {
    id: 21,
    title: "Classic Barber",
    description: "Description for Classic Barber",
    image: BarberImage6,
    category: "Barber Shop",
  },
  {
    id: 22,
    title: "Classic Barber",
    description: "Description for Classic Barber",
    image: BarberImage7,
    category: "Barber Shop",
  },
  {
    id: 23,
    title: "Personal Training and Fitness Coaching",
    description: "Description for Personal Training and Fitness Coaching",
    image: Gym1,
    category: "Personal Training and Fitness Coaching",
  },
  {
    id: 24,
    title: "Personal Training and Fitness Coaching",
    description: "Description for Personal Training and Fitness Coaching",
    image: Gym2,
    category: "Personal Training and Fitness Coaching",
  },
  {
    id: 25,
    title: "Spa and Wellness Center",
    description: "Description for Spa and Wellness Center",
    image: Spa1,
    category: "Spa and Wellness Center",
  },
  {
    id: 26,
    title: "Dental Hygiene Services",
    description: "Description for Dental Hygiene Services",
    image: Dentist1,
    category: "Dental Hygiene Services",
  },
  {
    id: 27,
    title: "Personal Training and Fitness Coaching",
    description: "Description for Personal Training and Fitness Coaching",
    image: Gym3,
    category: "Personal Training and Fitness Coaching",
  },
  {
    id: 28,
    title: "Spa and Wellness Center",
    description: "Description for Spa and Wellness Center",
    image: Spa3,
    category: "Spa and Wellness Center",
  },
  {
    id: 29,
    title: "Spa and Wellness Center",
    description: "Description for Spa and Wellness Center",
    image: Spa2,
    category: "Spa and Wellness Center",
  },
  {
    id: 30,
    title: "Dental Hygiene Services",
    description: "Description for Dental Hygiene Services",
    image: Dentist2,
    category: "Dental Hygiene Services",
  },
  {
    id: 34,
    title: "Dental Hygiene Services",
    description: "Description for Dental Hygiene Services",
    image: Dentist3,
    category: "Dental Hygiene Services",
  },
  {
    id: 35,
    title: "Dental Hygiene Services",
    description: "Description for Dental Hygiene Services",
    image: Dentist4,
    category: "Dental Hygiene Services",
  },
  {
    id: 37,
    title: "Dental Hygiene Services",
    description: "Description for Dental Hygiene Services",
    image: Dentist5,
    category: "Dental Hygiene Services",
  },
  // {
  //   id: 36,
  //   title: "Spa and Wellness Center",
  //   description: "Description for Spa and Wellness Center",
  //   image: Spa5,
  //   category: "Spa and Wellness Center",
  // },
  // {
  //   id: 31,
  //   title: "Spa and Wellness Center",
  //   description: "Description for Spa and Wellness Center",
  //   image: Spa4,
  //   category: "Spa and Wellness Center",
  // },
  {
    id: 32,
    title: "Personal Training and Fitness Coaching",
    description: "Description for Personal Training and Fitness Coaching",
    image: Gym4,
    category: "Personal Training and Fitness Coaching",
  },
  {
    id: 33,
    title: "Personal Training and Fitness Coaching",
    description: "Description for Personal Training and Fitness Coaching",
    image: Gym5,
    category: "Personal Training and Fitness Coaching",
  },
  {
    id: 51,
    title: "All Category Template",
    description: "Description for All Category Template",
    image: GeneralTemplate,
    category: "All Category Template",
  },
  {
    id: 52,
    title: "BerryBlast Template",
    description: "Clean, minimalist booking page for paid ecosystems",
    image: null,
    category: "Paid Booking",
  },
];

export default templates;
