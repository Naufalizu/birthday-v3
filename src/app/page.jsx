"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoaderScreen from "@/components/screens/LoaderScreen";
import IntroScreen from "@/components/screens/IntroScreen";
import CakeScreen from "@/components/screens/CakeScreen";
import PhotosScreen from "@/components/screens/PhotosScreen";
import Confetti from "@/components/confetti";
import MessageScreen from "@/components/screens/MessageScreen";
import FloatingHearts from "@/components/floating-hearts";

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const audioRef = useRef(null);

  // Mulai musik otomatis saat komponen mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Jika autoplay diblokir oleh browser, bisa ditangani di sini
        console.log("Autoplay diblokir, user harus klik dulu untuk play");
      });
    }
  }, []);

  // generate bubble acak
  useEffect(() => {
    const newBubbles = Array.from({ length: 25 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      color: [
        "bg-pink-200",
        "bg-pink-300",
        "bg-rose-200",
        "bg-fuchsia-200",
        "bg-purple-200",
      ][Math.floor(Math.random() * 5)],
    }));
    setBubbles(newBubbles);
  }, []);

  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} />,
    <CakeScreen
      key="cake"
      onNext={() => setCurrentScreen(3)}
      onLightCandle={() => {
        // 🔊 Mainkan musik
        if (audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.log("Autoplay blocked, user interaction required:", err);
          });
        }
      }}
    />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(4)} />,
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-300 via-rose-100 to-purple-200 overflow-hidden relative">
      {/* 🎵 Background music */}
      <audio ref={audioRef} src="/birthday.mp3" preload="auto" loop />

      {/* 💕 Hearts floating layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingHearts />
      </div>

      {/* 🎊 Confetti layer — hanya muncul di MessageScreen */}
      {currentScreen === 3 && ( // index ke-3 karena MessageScreen adalah urutan ke-4 di array
        <Confetti />
      )}

      {/* 🫧 Decorative bubbles layer */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: bubble.left, top: bubble.top }}
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
            }}
          >
            <div
              className={`rounded-full ${bubble.color} opacity-50`}
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            className={`w-full ${
              currentScreen === 4 ? "max-w-7xl" : "max-w-3xl md:max-w-4xl"
            }`}
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
