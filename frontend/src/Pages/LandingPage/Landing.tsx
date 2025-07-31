import React, { useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "@tsparticles/engine";
import "./Landing.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Create from "./Components/Create";
import Buy from "./Components/Buy";
import About from "./Components/About";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import ScrollTrigger from 'gsap/ScrollTrigger'
// import ScrollSmoother from 'gsap/ScrollSmoother'
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Landing() {
  const [init, setInit] = useState(false);
  const smoother = useRef<any>(null);
  const main = useRef<HTMLDivElement | null>(null);
  // const tl = useRef<gsap.core.Timeline>();

  // useEffect(() => {
  //   initParticlesEngine(async (engine) => {
  //     await loadSlim(engine);
  //   }).then(() => {
  //     setInit(true);
  //   });
  // }, []);

  // useGSAP(() => {
  //   tl.current = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".hola",
  //       pin: true,
  //       start: "top top",
  //       end: "+=300",
  //       markers: true,
  //     },
  //   });

  //   smoother.current = ScrollSmoother.create({
  //     smooth: 5,
  //     effects: true,
  //   });
  // }, { scope: main });

  const particlesLoaded = (container: any): void => {
    console.log(container);
  };

  const options = useMemo(() => ({
    background: {
      color: {
        value: "#104E6E",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 200,
      },
      opacity: {
        value: 1,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: true,
  }), []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return <div />;

  return (
    <div className="Layer1" ref={main}>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
      <div className="Layer2">
        <Navbar />
        <Home />
        <h1 id="hello" className="Halo">CREATE COIN</h1>
        <Create />
        <h1 className="Halo">TRADE COIN</h1>
        <Buy />
        <h1 className="Halo">ABOUT US</h1>
        <About />
      </div>
    </div>
  );
}

export default Landing;
