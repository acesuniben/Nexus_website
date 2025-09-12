"use client";

import React from "react";
import Image from "next/image";

export interface Lecturer {
  image: string;
  name: string;
  title?: string;
  bio?: string;
  email?: string;
  phone?: string;
}

export default function LecturerModal({
  lecturer,
  open,
  onClose,
}: {
  lecturer: Lecturer | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!open || !lecturer) return null;

  return (
      <div className="fixed inset-0 z-10 flex items-center justify-center w-screen h-screen bg-white overflow-y-auto md:overflow-y-none">
        <div className="absolute inset-0" onClick={onClose}>
          <section className="w-full flex flex-col gap-10 md:gap-5 items-center p-5 md:p-10">
              <div aria-label="Go back" className="self-end" onClick={onClose}>
                <Image src="/close-icon.png" width={40} height={40} alt="back icon" className="w-full"/>
              </div>
              <section className="w-full flex flex-col md:flex-row text-left gap-5 overflow-y-auto">
                <div className="w-[100%] md:w-1/3 relative"><Image src={lecturer.image} width={352} height={442} alt={`Picture of ${lecturer.name}`}/></div>
                <div className="w-[100%] md:w-2/3 md:border-l-1 md:pl-10 overflow-y-auto flex flex-col gap-2">
                <h1 className="font-bold text-3xl text-[#2F327D]">{lecturer.name}</h1>
                <h2 className="font-semibold text-xl text-[#0FACAC] mb-5">{lecturer.title}</h2>
                <p className="text-[#565886]">{lecturer.bio}</p>
              </div>
              </section>
          </section>
        </div>
      </div>
  );
}
