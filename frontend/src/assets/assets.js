import appointment_img from "./footer.webp";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.jpg";
import about_image from "./about_image.jpg";
import logo from "./admin_logo.png";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";

import ment1 from "./doc1.png";
import ment2 from "./doc2.png";
import ment3 from "./doc3.png";
import ment4 from "./doc4.png";
import ment5 from "./doc5.png";
import ment6 from "./doc6.png";
import ment7 from "./doc7.png";
import ment8 from "./doc8.png";
import ment9 from "./doc9.png";
import ment10 from "./doc10.png";
import ment11 from "./doc11.png";
import ment12 from "./doc12.png";
import ment13 from "./doc13.png";
import ment14 from "./doc14.png";
import ment15 from "./doc15.png";
import ment16 from "./img1.png";
import ment17 from "./img2.png";
import ment18 from "./img3.png";
import ment19 from "./img4.png";
import ment20 from "./img5.png";
import ment21 from "./img6.png";
import ment22 from "./img7.png";

import it from "./it-department.png";
// import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import businessman from "./businessman.png";
// import Neurologist from "./Neurologist.svg";
// import Pediatricians from "./Pediatricians.svg";
import artist from "./artist.png";
import career from "./career.png";
import teacher from "./teacher.png";
export const assets = {
  it,
  businessman,
  appointment_img,
  header_img,
  career,
  teacher,
  group_profiles,
  logo,
  artist,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
  ment16,
  ment17,
  ment18,
  ment19,
  ment20,
  ment21,
  ment22,
};
export const specialityData = [
  {
    speciality: "Technology & IT",
    image: it,
  },
  {
    speciality: "Health & Wellness",
    image: General_physician,
  },
  {
    speciality: "Education",
    image: teacher,
  },
  {
    speciality: "Career Development",
    image: career,
  },
  {
    speciality: "Arts & Creativity",
    image: artist,
  },
  {
    speciality: "Entrepreneurship",
    image: businessman,
  },
];
export const mentors = [
  {
    _id: "ment1",
    name: "John Doe",
    image: ment16,
    speciality: "Technology & IT",
    expertise: "Full Stack Development",
    experience: "6 Years",
    about:
      "John is a passionate software engineer specializing in web and mobile app development, helping individuals master modern tech stacks.",
    fees: 100,
    address: {
      line1: "Tech Park, Silicon Valley",
      line2: "California, USA",
    },
  },
  {
    _id: "ment2",
    name: "Dr. Emma Clarke",
    image: ment2,
    speciality: "Health & Wellness",
    expertise: "Nutrition & Lifestyle",
    experience: "8 Years",
    about:
      "Dr. Emma is a certified nutritionist, guiding individuals on balanced diets and healthy living habits for overall well-being.",
    fees: 80,
    address: {
      line1: "Wellness Street",
      line2: "London, UK",
    },
  },
  {
    _id: "ment3",
    name: "Michael Johnson",
    image: ment17,
    speciality: "Education",
    expertise: "Mathematics & Science",
    experience: "10 Years",
    about:
      "Michael is a dedicated educator, simplifying complex concepts in mathematics and science to help students excel in academics.",
    fees: 50,
    address: {
      line1: "Academy Road",
      line2: "New York, USA",
    },
  },
  {
    _id: "ment4",
    name: "Sarah Williams",
    image: ment18,
    speciality: "Career Development",
    expertise: "Resume Building & Interview Prep",
    experience: "7 Years",
    about:
      "Sarah assists job seekers in crafting impactful resumes and preparing for interviews to land their dream jobs.",
    fees: 70,
    address: {
      line1: "Career Hub",
      line2: "Toronto, Canada",
    },
  },
  {
    _id: "ment5",
    name: "Lucas Brown",
    image: ment19,
    speciality: "Arts & Creativity",
    expertise: "Photography & Design",
    experience: "5 Years",
    about:
      "Lucas is an artist and photographer, helping individuals unlock their creative potential in visual arts.",
    fees: 60,
    address: {
      line1: "Creative Alley",
      line2: "Berlin, Germany",
    },
  },
  {
    _id: "ment6",
    name: "Olivia Carter",
    image: ment20,
    speciality: "Entrepreneurship",
    expertise: "Startup Growth & Business Strategies",
    experience: "9 Years",
    about:
      "Olivia mentors aspiring entrepreneurs on launching and scaling successful businesses through strategic planning.",
    fees: 90,
    address: {
      line1: "Startup Avenue",
      line2: "San Francisco, USA",
    },
  },
  {
    _id: "ment7",
    name: "David Anderson",
    image: ment21,
    speciality: "Technology & IT",
    expertise: "Cybersecurity & Ethical Hacking",
    experience: "7 Years",
    about:
      "David is an expert in cybersecurity, helping individuals and businesses secure their digital assets against cyber threats.",
    fees: 95,
    address: {
      line1: "Cyber Hub",
      line2: "Seattle, USA",
    },
  },
  {
    _id: "ment8",
    name: "Sophia Martinez",
    image: ment3,
    speciality: "Health & Wellness",
    expertise: "Mental Health & Stress Management",
    experience: "6 Years",
    about:
      "Sophia is a psychologist specializing in mental well-being, guiding individuals in managing stress and anxiety effectively.",
    fees: 85,
    address: {
      line1: "Wellness Center",
      line2: "Sydney, Australia",
    },
  },
  {
    _id: "ment9",
    name: "Robert Wilson",
    image: ment22,
    speciality: "Education",
    expertise: "Physics & Engineering",
    experience: "12 Years",
    about:
      "Robert is an experienced physics professor, making complex engineering concepts easy for students and professionals.",
    fees: 60,
    address: {
      line1: "STEM Academy",
      line2: "Boston, USA",
    },
  },
  {
    _id: "ment10",
    name: "Emily Johnson",
    image: ment17,
    speciality: "Career Development",
    expertise: "Public Speaking & Communication",
    experience: "8 Years",
    about:
      "Emily coaches individuals on effective public speaking and communication skills for career growth and confidence building.",
    fees: 75,
    address: {
      line1: "Leadership Hub",
      line2: "Chicago, USA",
    },
  },
  {
    _id: "ment11",
    name: "Daniel Kim",
    image: ment18,
    speciality: "Arts & Creativity",
    expertise: "Music Production & Sound Design",
    experience: "10 Years",
    about:
      "Daniel is a music producer helping aspiring artists learn the art of sound design and music composition.",
    fees: 70,
    address: {
      line1: "Creative Beats Studio",
      line2: "Los Angeles, USA",
    },
  },
  {
    _id: "ment12",
    name: "Ava Patel",
    image: ment20,
    speciality: "Entrepreneurship",
    expertise: "E-commerce & Digital Marketing",
    experience: "7 Years",
    about:
      "Ava specializes in helping startups and businesses grow through effective e-commerce strategies and digital marketing techniques.",
    fees: 90,
    address: {
      line1: "Business Innovation Hub",
      line2: "Mumbai, India",
    },
  },
  {
    _id: "ment13",
    name: "Ethan Rodriguez",
    image: ment19,
    speciality: "Technology & IT",
    expertise: "AI & Machine Learning",
    experience: "9 Years",
    about:
      "Ethan is a data scientist guiding individuals on AI, machine learning, and automation technologies.",
    fees: 110,
    address: {
      line1: "AI Research Lab",
      line2: "Toronto, Canada",
    },
  },
  {
    _id: "ment14",
    name: "Isabella Chen",
    image: ment16,
    speciality: "Health & Wellness",
    expertise: "Yoga & Holistic Healing",
    experience: "5 Years",
    about:
      "Isabella is a certified yoga instructor promoting physical and mental well-being through holistic healing practices.",
    fees: 65,
    address: {
      line1: "Zen Wellness Center",
      line2: "Bali, Indonesia",
    },
  },
  {
    _id: "ment15",
    name: "William Thompson",
    image: ment22,
    speciality: "Education",
    expertise: "History & Cultural Studies",
    experience: "15 Years",
    about:
      "William is a historian who provides deep insights into world history and cultural developments over time.",
    fees: 55,
    address: {
      line1: "Heritage Academy",
      line2: "London, UK",
    },
  },
];
