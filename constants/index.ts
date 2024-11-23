import noResult from "@/assets/images/no-result.png";
import getStarted from "@/assets/images/get-started.png";
import email from "@/assets/icons/email.png";
import checkmark from "@/assets/icons/check.png";
import check from "@/assets/images/check.png";
import person from "@/assets/icons/person.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signupimg from "@/assets/images/signupimg.png";
import lock from "@/assets/icons/lock.png";
import home from "@/assets/icons/home.png";
import profile from "@/assets/icons/profile.png";
import NeedPlayer from "@/assets/icons/NeedPlayer.png";
import list from "@/assets/icons/list.png";
import out from "@/assets/icons/out.png";
export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  getStarted,
  signupimg,
  noResult,
  check,
};

export const icons = {
  email,
  lock,
  person,
  checkmark,
  home,
  profile,
  NeedPlayer,
  out,
  list,
};

export const onboarding = [
  {
    id: 1,
    title: "Find Your Team, Book Your Game!",
    description:
      "From field reservations to finding the perfect teammates, we've got you covered!",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Match Players, Create Teams!",
    description:
      "Build balanced teams by selecting players based on their positions effortlessly.",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Simplify Football, Maximize Fun!",
    description:
      "Book fields, fill open slots, and connect with nearby players—all in one place!",
    image: images.onboarding3,
  },
];

export const data = {
  onboarding,
};
