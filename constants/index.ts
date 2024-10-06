
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
};

export const onboarding = [
  {
    id: 1,
    title: "The perfect ride is just a tap away!",
    description:
      "Your journey begins with Ryde. Find your ideal ride effortlessly.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Best car in your hands with Ryde",
    description:
      "Discover the convenience of finding your perfect ride with Ryde",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Your ride, your way. Let's go!",
    description:
      "Enter your destination, sit back, and let us take care of the rest.",
    image: images.onboarding3,
  },
];

export const data = {
  onboarding,
};
