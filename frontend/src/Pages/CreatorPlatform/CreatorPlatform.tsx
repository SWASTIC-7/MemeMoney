import React from 'react'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "@tsparticles/engine";

import Navbar from '../LandingPage/Components/Navbar';
import { useEffect, useMemo, useRef, useState } from 'react';
import CreatorTrade from './Components/creatortrade';

function CreatorPlatform() {
   const [init, setInit] = useState(false);
  const smoother = useRef<any>(null);
  const main = useRef<HTMLDivElement | null>(null);
  const particlesLoaded = async (container?: Container): Promise<void> => {
    
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
        direction: 'none',
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
        {/* <Navbar /> */}
        <CreatorTrade />    
      </div>
    </div>
  );
}

export default CreatorPlatform; 