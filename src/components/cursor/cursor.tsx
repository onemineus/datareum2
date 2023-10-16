"use client";
import {
  AnimatePresence,
  AnimationProps,
  motion,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Background from "../../public/background.png";
import Foreground from "../../public/foreground.png";
import { RiMenu4Fill, RiCloseFill, RiLoginCircleFill } from "react-icons/ri";
import { AiFillExperiment, AiFillInfoCircle } from "react-icons/ai";
import { MdContactless, MdPrivacyTip } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { BsBookHalf } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import useMousePosition from "./useMousePosition";
import { useAtom } from "jotai";
import { cursorVariant } from "@/jotai/atom";

const Cursor = () => {
  const cursor = useMousePosition();
  const [variant, setVariant] = useAtom(cursorVariant);
  const cursorVariants: AnimationProps["variants"] = {
    default: {
      x: cursor.x - 8,
      y: cursor.y - 8,
    },
    hero: {
      x: cursor.x - 150,
      y: cursor.y - 150,
      height: 300,
      width: 300,
      backgroundColor: "#facc15",
      mixBlendMode: "difference",
      transition: {
        // duration: 0.5,
      },
    },
    hover: {
      x: cursor.x - 20,
      y: cursor.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "white",
      mixBlendMode: "difference",
    },
    hide: {
      opacity: "0%",
    },
  };
  return (
    <motion.div
      variants={cursorVariants}
      animate={variant}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-4 w-4 rounded-full bg-white md:block"
    ></motion.div>
  );
};

export default Cursor;
