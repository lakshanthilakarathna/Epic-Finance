import React from "react";
import Layouts from "../layouts/Layouts";
import dynamic from "next/dynamic";

import AboutSection from "../components/sections/About";
import ServicesSection from "../components/sections/Services";
import LoanCalculatorSection from "../components/sections/LoanCalculatorSection";
import HowItWorksSection from "../components/sections/HowItWorks";
import ContactSection from "../components/sections/Contact";
import Divider from "../components/sections/Divider";

const HeroSlideshowSlider = dynamic( () => import("../components/sliders/HeroSlideshow"), { ssr: false } );
const TestimonialSlider = dynamic( () => import("../components/sliders/Testimonial"), { ssr: false } );

const Home1 = () => {
  return (
    <Layouts transparent>
      <HeroSlideshowSlider />
      <Divider />
      <AboutSection />
      <Divider />
      <ServicesSection sectionId="services" />
      <Divider />
      <LoanCalculatorSection />
      <Divider />
      <HowItWorksSection />
      <Divider />
      <TestimonialSlider />
      <ContactSection />
    </Layouts>
  );
};
export default Home1;
