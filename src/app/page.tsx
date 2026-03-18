"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import SystemDesign from "@/components/sections/SystemDesign";
import Experience from "@/components/sections/Experience";
import Playground from "@/components/sections/Playground";
import Contact from "@/components/sections/Contact";
import CustomCursor from "@/components/ui/CustomCursor";

const AIAssistant = dynamic(() => import("@/components/sections/AIAssistant"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen">
      {mounted && <CustomCursor />}
      <Navigation />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="ai-assistant">
        <AIAssistant />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="system-design">
        <SystemDesign />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="playground">
        <Playground />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
