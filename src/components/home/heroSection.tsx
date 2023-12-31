import React from "react";
import heroSvg from "../../../public/hero/test.svg";
import { motion } from "framer-motion";
import { Inknut_Antiqua } from "next/font/google";
import { cn } from "@/lib/utils";
import { BsMouse } from "react-icons/bs";
import { useAuth } from "@/context/context";
import { useRouter } from "next/navigation";
import { AiOutlineDown } from "react-icons/ai";
// import puc from "../../../public/reverse/cctv.png";
import puc from "../../../public/hero/p2.svg";

import {
  TbBrandFirebase,
  TbBrandNextjs,
  TbBrandPrisma,
  TbBrandSupabase,
  TbBrandTailwind,
} from "react-icons/tb";
import { useAtom } from "jotai";
import { cursorVariant } from "@/jotai/atom";
const Inknut = Inknut_Antiqua({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const HeroSection = () => {
  const user = useAuth();
  const router = useRouter();
  const [variant, setVariant] = useAtom(cursorVariant);
  return (
    <div className="via-stone-95 relative flex h-screen w-full justify-center bg-stone-950 to-stone-900 pt-20 text-white xl:pt-10">
      <div className="absolute left-0 top-0 z-0 h-screen w-full bg-stone-950">
        <img
          src={puc.src}
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
      </div>
      <div className="bg-neutral-70 z-[1] flex h-full w-full max-w-[94rem] flex-col justify-center xl:flex-row">
        <div className="bg-red-95 lg justify-cente flex w-full items-center justify-center md:mt-10 xl:ml-8 xl:mt-0 2xl:ml-0">
          <div className="mt-8 flex flex-col items-center md:mt-0 xl:items-start">
            <div className="mb-4 hidden h-[2px] w-[30rem] bg-gradient-radial from-acc xl:block xl:bg-gradient-to-l xl:from-transparent xl:to-acc"></div>
            <div className="lg:text-md mb-2 ml-1 text-sm uppercase 2xl:text-xl">
              keep your data safe{" "}
              <span className="text-2xl font-extrabold text-acc">!</span>
            </div>
            <div className="flex flex-col items-center space-y-4 xl:items-start">
              <div
                className={cn(
                  "xs:text-4x whitespace-nowrap bg-gradient-to-r from-gray-200 via-gray-300 to-gray-500 bg-clip-text text-3xl font-bold capitalize text-transparent sm:text-5xl lg:text-6xl 2xl:text-7xl",
                  Inknut.className,
                )}
                onMouseEnter={() => {
                  setVariant("hero");
                }}
                onMouseLeave={() => {
                  setVariant("default");
                }}
              >
                Blockchain powered
              </div>
              <div
                className={cn(
                  "my-2 text-3xl font-bold capitalize text-acc xs:text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl",
                  Inknut.className,
                )}
                onMouseEnter={() => {
                  setVariant("hero");
                }}
                onMouseLeave={() => {
                  setVariant("default");
                }}
              >
                data exchange
              </div>
              <div
                className={cn(
                  "xs:text-4x bg-gradient-to-l from-gray-200 via-gray-300 to-gray-500 bg-clip-text text-center text-3xl font-bold capitalize text-transparent sm:text-5xl lg:text-6xl 2xl:text-7xl",
                  Inknut.className,
                )}
                onMouseEnter={() => {
                  setVariant("hero");
                }}
                onMouseLeave={() => {
                  setVariant("default");
                }}
              >
                for the healthcare
              </div>
            </div>
            <div className="mt-4 hidden xl:block">
              We centralize anonymized health data for researchers. Securely
              encrypted with Ethereum smart contracts, our platform offers easy
              data uploads, controlled access, and robust security measures.
            </div>
            <div className="mt-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onMouseEnter={() => {
                  setVariant("button");
                }}
                onMouseLeave={() => {
                  setVariant("default");
                }}
                onClick={() => {
                  if (user.user) {
                    router.push("/dashboard");
                  } else {
                    router.push("/signin");
                  }
                }}
                className="rounded-lg bg-acc px-5 py-3 text-center font-bold uppercase text-stone-950"
              >
                get started
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onMouseEnter={() => {
                  setVariant("button");
                }}
                onMouseLeave={() => {
                  setVariant("default");
                }}
                onClick={() => {
                  router.push("/explore");
                }}
                className="hidden rounded-lg px-5 py-3 text-center font-bold uppercase text-stone-50 outline outline-2 outline-acc md:block"
              >
                explore now
              </motion.div>
            </div>
            <div className="mt-6 hidden h-[2px] w-[30rem] bg-gradient-radial from-acc xl:block xl:bg-gradient-to-l xl:from-transparent xl:to-acc"></div>
          </div>
        </div>
        <div className="bg-red-90 flex w-full items-center justify-center overflow-hidden ">
          <img
            src={heroSvg.src}
            alt=""
            className="xl:-scale-x-11 h-full w-full"
          />
        </div>
      </div>
      <div className="absolute bottom-10 hidden flex-col items-center justify-center xl:flex">
        <div>
          <BsMouse size={40} color={"#d6d3d1"} />
        </div>
        <div>
          <AiOutlineDown size={30} color={"#d6d3d1"} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
