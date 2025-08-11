import AboutUs from "@/components/about-us";
import { Contact } from "@/components/contact";
import Faqs from "@/components/faq";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import OurWork from "@/components/our-work";
import { Services } from "@/components/services";
import Testimonials from "@/components/testimonials";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <Hero />
        <AboutUs/>
        <Services />
        <OurWork />
        <Testimonials />
        <Faqs />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
