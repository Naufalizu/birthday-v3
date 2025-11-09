"use client"

import GradientButton from "../GradientButton"
import { Gift } from "lucide-react"

export default function IntroScreen({ onNext }) {
    return (
      <div className="py-10 md:py-14 text-center">
        <div className="flex flex-col items-center gap-6">
          <img
            src="/gifs/intro.gif"
            alt="Cute birthday animation topper"
            className="w-[140px] md:w-[180px]  object-cover"
          />

          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-pink-400">
            <h1
              className="text-pretty text-2xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow leading-tight"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))",
              }}
            >
              Seseorang yang luar biasa lahir di hari ini, tepat 22 tahun yang lalu - membawa cahaya dan kebahagiaan ke dunia.
            </h1>
            <p className="mt-4 text-xl text-pink-400">
              Yaa, itu KAMU! Ada kejutan kecil menunggu kamu...
            </p>
          </div>

          <div className="mt-8">
            <GradientButton
              onClick={() => {
                onNext?.();
              }}
            >
              <Gift size={20} />
              Lihat kejutan
            </GradientButton>
          </div>
        </div>
      </div>
    );
}
