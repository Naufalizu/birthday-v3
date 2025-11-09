"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import GradientButton from "../GradientButton";
import { Flame } from "lucide-react";
import { Mail } from "lucide-react";

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"];

export default function CakeScreen({ onNext, onDecorate, onLightCandle }) {
  const [decorated, setDecorated] = useState(false);
  const [lit, setLit] = useState(false);

  const decorate = () => {
    if (decorated) return;
    setDecorated(true);
    setTimeout(() => {
      onDecorate();
    }, 500);
  };

  const lightCandle = () => {
    if (lit) return;
    setLit(true);

    // 🔊 Panggil fungsi dari parent
    if (onLightCandle) onLightCandle();

    setTimeout(() => burst(), 500);
    setTimeout(() => burst(), 1000);
  };

  const burst = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors,
    });
  };

  return (
    <div className="px-4 md:px-6 py-10 mt-10 text-center relative">
      {lit && (
        <motion.div
          className="fixed top-50 lg:top-60 left-0 w-full text-center text-[40px] md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow leading-tight px-4"
          style={{ filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
        >
          Happy Birthday, Khilla!
        </motion.div>
      )}

      <div className="relative flex flex-col items-center gap-8 mt-52">
        <div className="relative mb-6">
          <Cake lit={lit} />
        </div>
        <AnimatePresence mode="wait">
          {!lit ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, delay: 0.5 },
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={lightCandle}>
                <Flame size={20} />
                Nyalakan lilinnya
              </GradientButton>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, delay: 2 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={onNext}>
                <Mail size={20} className="mt-0.5" /> Buka pesan spesial
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Cake({ lit }) {
  const candlePositions = [
    { top: "15px", left: "35%" },
    { top: "-20px", left: "25%" },
    { top: "-30px", left: "50%" },
    { top: "-20px", left: "75%" },
    { top: "15px", left: "65%" },
  ];

  const candleColors = [
    "#FF3CAC", // pink
    "#34D399", // hijau
    "#FCD34D", // kuning
    "#60A5FA", // biru
    "#EF4444", // merah
  ];

  return (
    <div className="flex flex-col items-center relative">
      <div className="cake relative w-64 h-40">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>

        {candlePositions.map((pos, i) => (
          <div
            key={i}
            className="candle absolute"
            style={{
              top: pos.top,
              left: pos.left,
              backgroundColor: candleColors[i], // warna berbeda tiap lilin
            }}
          >
            {lit && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  delay: i * 0.2,
                }}
                className="flame"
                style={{
                  background: "linear-gradient(to top, yellow, orange, red)", // warna api
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
