import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Builds } from "@/components/Builds";
import { Process } from "@/components/Process";
import { Capabilities } from "@/components/Capabilities";

import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";

import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Builds />
        <Process />
        <Capabilities />
        <About />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
