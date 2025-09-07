import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DuesPage() {

    return (
        <div className="">
            <Header />
            <main className="flex flex-col gap-10 md:gap-25 items-center mb-20">
            <section className="md:w-2/3 text-center flex flex-col gap-10 mt-10 md:mt-20">
                <h1 className="text-3xl md:text-5xl text-[#2F327D] font-bold">Pay Your <span className="text-[#0FACAC] ">Departmental Dues</span></h1>
                <p className="w-[80%] mx-auto">It is very important to pay your departmental dues. Follow the steps below to complete your payment successfully</p>
            </section>

            <section className="flex flex-col md:flex-row gap-10 md:gap-15 justify-between md:justify-evenly items-center">
                <div className="w-[90%] md:w-2/5">
                    <Image src="/confident.png" height={359.33} width={498.67} alt="Picture of students listening to their teacher in their classroom"/>
                </div>
                <div className="flex flex-col gap-2 relative w-[90%] md:w-2/5 items-start justify-evenly">
                    <Image src="/duesbg.svg" width={600} height={100} alt="pointers illustration" className="absolute -top-3 left-0 md:-left-2 md:-top-6 -z-0"/>
                    <h2 className="text-[#2F327D] font-bold text-4xl relative">Pay Your<span className="text-[#0FACAC] z-10"> ACES Dues</span></h2>
                    <p>To improve the department and to ensure activities like Fresher’s Welcome, HOD’s Cup, Tech Week, hackathons etc are successfully achieved, paying your departmental dues is very important.</p>
                    <p className="mt-2">Paying your dues shows not only your commitment to the department but also your pride in belonging to it. It is a way of investing in yourself, your colleagues, and the legacy of the department. Together, with your contribution, we can achieve more and make the department better for everyone.</p>
                </div>
            </section>

            <section className="w-[90%] flex flex-col gap-10 md:gap-10 justify-between items-center">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="text-[#2F327D] font-bold text-4xl relative">How to pay your<span className="text-[#0FACAC] z-10"> ACES Dues</span></h2>
                    <p>Don’t know how to pay your ACES Dues? Follow the steps below to complete your payment successfully</p>
                </div>
                <div className="flex flex-col md:gap-15 text-center items-center w-[80%]">
                    <div className="flex flex-col w-[100%] md:flex-row items-center">
                        <div className="flex gap-2 flex-col md:w-1/5 md:self-end"><Image src="/step1.svg" width={266.67} height={284.67} alt=""/><p>Don’t know how to pay your ACES Dues? Follow the steps below to complete your payment successfully</p></div>
                        <div><Image src="/connector.svg" width={206.67} className="md:self-start rotate-90 md:rotate-0" height={206.67} alt=""/></div>
                        <div className="flex gap-2 flex-col md:w-1/5 md:self-end"><Image src="/step2.svg" width={266.67} height={284.67} alt=""/><p>Make your payment via bank transfer, mobile banking app, or direct deposit.</p></div>
                        <div><Image src="/connector.svg" width={206.67} className="md:self-start rotate-90 md:rotate-0" height={206.67} alt=""/></div>
                        <div className="flex gap-2 flex-col md:w-1/5 md:self-end"><Image src="/step3.svg" width={266.67} height={250} alt=""/><p>Present your payment receipt (bank alert or Cash) at the Secretariat</p></div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center w-[70%]">
                        <div><Image src="/connector.svg" className="md:self-start rotate-90 md:hidden md:rotate-0" width={206.67} height={206.67} alt=""/></div>
                        <div className="flex gap-2 flex-col md:w-1/3"><Image src="/step4.svg" width={266.67} height={250} alt=""/><p>Wait while your payment is confirmed by any of the Departmental Executives.</p></div>
                        <div><Image src="/connector.svg" className="md:self-start rotate-90 md:rotate-0" width={206.67} height={206.67} alt=""/></div>
                        <div className="flex gap-2 flex-col md:w-1/3"><Image src="/step5.svg" width={266.67} height={110} alt=""/><p>Once confirmed, collect your official ACES Receipt as proof of payment.</p></div>
                    </div>
                </div>
            </section>

            <section className="relative w-[90%] md:w-[100%] flex flex-col gap-10 md:gap-10 justify-between items-center">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="text-[#2F327D] font-bold text-4xl relative">Important things to<span className="text-[#0FACAC] z-10"> note</span></h2>
                    <p>Note these key points and ensure you abide to them with due diligence. They are important.</p>
                </div>
                <div className="flex flex-col w-[100%] md:w-[80%] gap-5 items-center">
                    <div className="flex flex-col md:flex-row w-[100%] justify-evenly items-center">
                        <div className="flex relative w-[100%] md:w-1/3"><Image src="/doc.svg" className="z-2" width={100} height={100} alt=""/><div className="w-[80%] absolute top-4 left-14 rounded-xl bg-[#98ff9827] px-8 py-4">Keep your receipt safe</div></div>
                        <div className="flex relative w-[100%] md:w-1/3"><Image src="/doc.svg" className="z-2" width={100} height={100} alt=""/><div className="w-[80%] absolute top-4 left-14 rounded-xl bg-[#98ff9827] px-8 py-4">Ensure you follow the steps</div></div>
                    </div>
                    <div className="w-[100%] flex flex-col items-center">
                        <div className="flex relative w-[100%] md:w-[2/3]"><Image src="/doc.svg" className="relative z-2" width={100} height={100} alt=""/><div className="w-[80%] md:w-auto absolute top-4 left-14 rounded-xl bg-[#98ff9827] px-8 py-4">Ensure you come with proof of payment or Cash to the Secretariat</div></div>
                    </div>
                </div>
            </section>

            <section className="w-[90%] md:w-[100%] flex flex-col gap-10 md:gap-15 justify-between items-center">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="text-[#2F327D] font-bold text-4xl relative">Where to pay your<span className="text-[#0FACAC] z-10"> ACES Dues</span></h2>
                    <p>Don’t know the departmental bank account? Transfer to the account below to make a deposit or pay with cash</p>
                </div>
                <div className="w-[100%] md:w-[60%] flex flex-col gap-6 md:gap-10 shadow-xl p-10">
                    <div className="flex justify-between"><p className="text-[#2F327D] md:text-4xl font-semibold">Account Number :</p><p className="text-[#0FACAC] md:text-4xl font-semibold">0023455177</p></div>
                    <div className="flex justify-between"><p className="text-[#2F327D] md:text-4xl font-semibold">Bank :</p><p className="text-[#0FACAC] md:text-4xl font-semibold">Access Bank</p></div>
                    <div className="flex justify-between"><p className="text-[#2F327D] md:text-4xl font-semibold">Amount :</p><p className="text-[#0FACAC] md:text-4xl font-semibold">N 2,000</p></div>
                    <div className="flex justify-between"><p className="text-[#2F327D] md:text-4xl font-semibold">Account Name :</p><p className="text-[#0FACAC] md:text-4xl font-semibold">ACES Uniben</p></div>
                </div>
            </section>

            <section className="w-[90%] md:w-[90%] flex flex-col gap-10 md:gap-15 justify-between items-center">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="text-[#2F327D] font-bold text-4xl relative">Contact the Executives</h2>
                    <p>Still confused? contact any of the details below for more clarity and for more information.</p>
                </div>
                <div className="flex flex-col md:flex-row w-[100%] gap-10 justify-center items-center">
                    <div className="flex relative w-[100%] md:w-1/3"><Image src="/call-bg.svg" className="z-2" width={100} height={100} alt=""/><div className="w-[80%] absolute top-4 left-14 rounded-xl bg-[#98ff9827] px-4 py-1"><div className="text-[#2F327D] flex flex-col items-center"><p className="text-lg font-bold">08134408004</p><p className="text-md">President</p></div></div></div>
                    <div className="flex relative w-[100%] md:w-1/3"><Image src="/call-bg.svg" className="z-2" width={100} height={100} alt=""/><div className="w-[80%] absolute top-4 left-14 rounded-xl bg-[#98ff9827] px-4 py-1"><div className="text-[#2F327D] flex flex-col items-center"><p className="text-lg font-bold">08089690225</p><p className="text-md">Financial Secretary</p></div></div></div>
                </div>
            </section>

            </main>
            <Footer />
        </div>
    );  
}