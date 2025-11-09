"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles, Gift, Cake } from "lucide-react";

export default function MessageScreen() {
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {/* Container putih */}
      <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-pink-400 w-full max-w-2xl">
        {/* Judul */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3,
          }}
          className="relative mb-2"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-pink-600 mb-2">
            Happy Birthday!
          </h1>
        </motion.div>

        {/* Kartu hadiah */}
        <motion.div
          className="w-full max-w-md mx-auto my-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div
            className={`relative cursor-pointer transition-all duration-700 ease-in-out transform ${
              isCardOpen ? "rotate-0" : "rotate-2"
            }`}
            onClick={() => setIsCardOpen(!isCardOpen)}
          >
            <div
              className={`bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl p-14 sm:p-10 shadow-lg transition-all duration-700 transform ${
                isCardOpen ? "scale-95" : "scale-100"
              }`}
            >
              <div className="absolute top-2 right-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-200" />
                </motion.div>
              </div>

              <div className="text-center text-white">
                <p className="text-lg font-medium mb-4">
                  Tekan {isCardOpen ? "close" : ""} kartu hadiah ini
                </p>
                <div className="flex justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Gift className="w-14 h-14 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Isi kartu */}
            <AnimatePresence>
              {isCardOpen && (
                <motion.div
                  className="absolute inset-0 bg-white h-[550px]:-top-6 rounded-3xl p-4 flex flex-col items-center justify-center"
                  style={{
                    boxShadow: "0 0 25px rgba(255, 182, 193, 0.5)", // soft pink shadow all around
                  }}
                  initial={{ rotate: 2, rotateX: -90, opacity: 0 }}
                  animate={{
                    rotate: isCardOpen ? 0 : 2,
                    rotateX: isCardOpen ? 0 : -90,
                    opacity: isCardOpen ? 1 : 0,
                    zIndex: isCardOpen ? 10 : -1,
                  }}
                  exit={{ rotateX: -90, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center text-[13px]">
                    <p className="text-purple-700">
                      Dari aku untuk kamu, semoga langit selalu berpihak padamu,
                      dan setiap langkah kecilmu membawa kamu lebih dekat pada
                      semua mimpi yang kamu doakan. Gapai semua mimpimu dengan
                      hati yang berani dan penuh cinta. Hari ini aku berdoa
                      kepada Pemilik langit dan bumi, semoga setiap hal baik
                      selalu menemukanmu, dan semoga kebahagiaan tak selalu
                      menemani langkahmu.
                    </p>
                    <p className="text-pink-600 font-medium"></p>
                    <div className="flex justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <Heart className="w-8 h-8 stroke-none fill-rose-500" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Pesan penutup */}
        <motion.div
          className="w-full max-w-md mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-center">
            <p className="text-md text-pink-600 mb-2">
              I hope your birthday sparkles with love, laughter, and everything
              that makes you feel special 🫶
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
