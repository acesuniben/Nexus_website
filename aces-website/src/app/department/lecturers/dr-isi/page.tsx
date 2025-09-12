"use client";

import { useRouter } from "next/navigation";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import Image from "next/image";

export default function Isi() {
    const router = useRouter();

    return (
        <div className="">
            <Header />
            <main className="flex flex-col gap-5 md:gap-15 items-center mb-20 py-10 w-[90%] mx-auto md:w-[80%] h-screen">
                <button aria-label="Go back" className="self-end" onClick={() => router.back()}>
                    <Image src="/close-icon.png" width={40} height={40} alt="back icon" />
                </button>
                <section className="w-full flex flex-col md:flex-row gap-5 md:gap-10 items-center">
                    <div className="w-1/3 relative"><Image src="/isi.png" width={352} height={442} alt="Picture of the Head of Department Engr. Dr. Isi Edeoghon"/></div>
                    <div className="w-2/3 overflow-y-auto flex flex-col gap-2">
                        <h1 className="font-bold text-3xl text-[#2F327D]">Engr. Dr. Isi Edeoghon</h1>
                        <h2 className="font-semibold text-xl text-[#0FACAC] mb-5">Head of Department</h2>
                        <p className="text-[#565886]">Engr. Dr. Isi Edeoghon is a Senior Lecturer with a Doctor of Philosophy degree in the Department of Computer Engineering at the University of Benin in Benin City, Nigeria.</p>
                        <p className="text-[#565886]">He specializes in Information and Communication Technology (ICT) and software development, with a focus on areas like energy management and network deployment. His research interests and publications cover topics such as:</p>
                        <ol className="mr-4" type="1">
                            <li className="text-[#565886]">Telecommunications,  including cellular and microwave communication, LTE, and GSM.</li>
                            <li className="text-[#565886]">Software Engineering, with work on agile software development and web-based software for network deployment.</li>
                            <li className="text-[#565886]">Network Communication, including research on LoRaWAN, low-power wide area networks (LPWAN), and DVB-T2 signals.</li>
                            <li className="text-[#565886]">Dr. Isi Edeoghon has co-authored numerous academic papers on these subjects. He is listed on Google Scholar and ResearchGate, where his research profile and publications are available.</li>
                        </ol>
                        <p className="text-[#565886]">Dr. Isi Edeoghon has co-authored numerous academic papers on these subjects. He is listed on Google Scholar and ResearchGate, where his research profile and publications are available.</p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}