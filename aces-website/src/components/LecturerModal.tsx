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
    <div className="fixed inset-0 z-10 flex items-center justify-center w-screen h-screen">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
        <button aria-label="Go back" className="self-end" onClick={onClose}>
            <Image src="/close-icon.png" width={40} height={40} alt="back icon" />
        </button>
        <section className="w-full flex flex-col md:flex-row gap-5 md:gap-10 items-center">
            <div className="w-1/3 relative"><Image src={lecturer.image} width={352} height={442} alt="Picture of the Head of Department Engr. Dr. Isi Edeoghon"/></div>
            <div className="w-2/3 overflow-y-auto flex flex-col gap-2">
              <h1 className="font-bold text-3xl text-[#2F327D]">{lecturer.name}</h1>
              <h2 className="font-semibold text-xl text-[#0FACAC] mb-5">{lecturer.title}</h2>
              <p>{lecturer.bio}</p>
            </div>
        </section>
      </div>
    </div>
  );
}
