"use client";
import Footer from "@/components/footers/footer";
import DashHeader from "@/components/headers/dashHeader";
import React from "react";
import contactSvg from "../../../public/contact/contact.svg";

const Contact = () => {
  return (
    <div className="h-screen bg-stone-950 pt-20 text-stone-100">
      <DashHeader />
      <div className="flex h-full flex-col md:flex-row items-center justify-center bg-gradient-to-b from-stone-950 to-stone-900">
        <div className="px-8 flex w-full flex-col items-center justify-center text-stone-950">
          <div className="flex w-full max-w-lg flex-col space-y-4">
            <div className="flex w-full flex-col">
              <div className="capitalize text-stone-100">Name</div>
              <input
                type="text"
                className="w-full rounded-lg bg-stone-100 px-3 py-1 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <div className="w-full capitalize text-stone-100">email</div>
              <input
                type="text"
                className="rounded-lg bg-stone-100 px-3 py-1 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <div className="capitalize text-stone-100">enquery</div>
              <textarea className="rounded-lg bg-stone-100 px-3 py-1 focus:outline-none" />
            </div>
            <div className="rounded-lg bg-acc px-4 py-2 text-center font-bold">
              submit
            </div>
          </div>
        </div>
        <div className="w-full">
          <img src={contactSvg.src} alt="" className="mx-8" />
        </div>
      </div>
    </div>
  );
};

export default Contact;