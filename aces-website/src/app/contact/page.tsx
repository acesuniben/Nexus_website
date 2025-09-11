import Header from "@/components/header"
import Footer from "@/components/footer"    
import Image from "next/image" 
export default function ContactPage() {
    return (
        <div>
            <Header />
            <main className="flex flex-col gap-10 items-center mb-10 md:mb-20">
                <section className="w-[90%] md:w-1/2 text-center flex flex-col gap-1 md:gap-3 mt-10 md:mt-20">
                    <h1 className="text-2xl md:text-4xl font-bold text-[#0FACAC]">Contact us <span className="text-[#2F327D]">with Ease</span></h1>
                    <p className="text-[#696984] w-[100%] md:w-full">Get in touch with us, we are here to assist you. Do you have a complain, suggestion or observation? Message us.</p>
                </section>

                <section className="w-[90%] items-center flex flex-col gap-10 md:gap-0 md:flex-row md:shadow-xl rounded-xl md:p-10">
                    <div className="flex flex-col gap-10 md:gap-20 justify-between bg-[#166D86] pl-5 pt-10 md:pl-10 md:pt-20 text-white w-[100%] md:w-[1/3] rounded-tl-lg rounded-tr-[10%] md:rounded-tr-[15%] rounded-bl-lg rounded-br-lg">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold">Contact Information</h2>
                            <p className="font-light text-[#C9C9C9]">Have any concerns? Message us</p>
                        </div>
                        <div className="flex flex-col gap-5 md:gap-10 justify-between pr-20">
                            <div className="flex gap-5"><Image src="/call-icon.svg" width={30} height={30} alt=""/> <p><a href="tel:08134408004">08134408004</a> | <a href="tel:08089690225">08089690225</a></p></div>
                            <div className="flex gap-5"><Image src="/email-icon.svg" width={30} height={30} alt=""/> <p><a href="mailto:acesuniben24@gmail.com">acesuniben24@gmail.com</a></p></div>
                            <div className="flex gap-5"><Image src="/location-icon.svg" width={30} height={30} alt=""/> <p><a href="">Before the Electrical Engineering Building, Faculty of Engineering, University of Benin, Ugbowo</a></p></div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-5">
                                <a href="#"><Image src="/twitter-icon.svg" width={30} height={30} alt=""/></a>
                                <a href="#"><Image src="/instagram.svg" width={30} height={30} alt=""/></a>
                                <a href="#"><Image src="/linkedIn-icon.svg" width={30} height={30} alt=""/></a>
                            </div>
                            <Image src="/Ellipse.svg" width={230} height={215.33} alt=""/>
                        </div>
                    </div>
                    <div className="w-[90%] md:w-[2/3]">
                        <form className="flex flex-col gap-5 md:gap-10 p-1 md:p-5 w-full">
                            <div className="flex gap-5 w-full">
                                <label htmlFor="firstname" className="text-[#2F327D] flex flex-col gap-1 w-full font-bold">First Name
                                    <input type="text" id="firstname" placeholder="Your First Name" className="p-1 font-light text-[#BDBDBD] border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0FACAC]" />
                                </label>
                                <label htmlFor="lastname" className="text-[#2F327D] flex flex-col gap-1 w-full font-bold">Last Name  
                                    <input type="text" id="lastname" placeholder="Your Last Name" className="p-1 font-light text-[#BDBDBD] border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0FACAC]" />
                                </label>
                            </div>
                            <label htmlFor="email" className="text-[#2F327D] flex flex-col gap-1 font-bold">Email
                                <input type="email" id="email" placeholder="Your Email - johndoe@gmail.com" className="p-1 font-light text-[#BDBDBD] border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0FACAC]" />
                            </label>
                            <label htmlFor="message" className="text-[#2F327D] flex flex-col gap-1 font-bold">Message
                                <textarea id="message" placeholder="What’s on your mind? Talk to us." className="p-1 font-light text-[#BDBDBD] border border-gray-300 rounded-lg p-2 w-full h-40 resize-none focus:outline-none focus:ring-2 focus:ring-[#0FACAC]"></textarea>
                            </label>
                            <button type="submit" className="bg-[#166D86] self-start text-white font-semibold py-2 px-4 hover:bg-[#0FACAC] transition-colors duration-300 rounded-3xl">Get In Touch</button>
                        </form>
                    </div>
                </section>

                <section className="w-[90%] h-[300px] md:h-[500px]">
                    {/* Map Section */}
                    <div className="w-full h-full">
                        <div className="bg-gray-100 w-full h-full rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.7857842896586!2d5.626827814683795!3d6.399267925756586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d7dabf8a4ca1%3A0x6d9b2d4c4b4b4b4b!2sFaculty%20of%20Engineering%2C%20University%20of%20Benin!5e0!3m2!1sen!2sng!4v1640000000000!5m2!1sen!2sng"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="ACES Secretariat Location - Faculty of Engineering, University of Benin"
                            ></iframe>
                        </div>
                    </div>
                </section>

                <section className="w-full flex justify-center items-center">
                    <div className="relative w-[90%]">
                    <Image src="/subscribe.svg" height={712.5} width={1525} alt="Newsletter sign-up background" className="hidden md:block w-full"/>
                    <Image src="/mobsubscribe.svg" height={188} width={356} alt="Newsletter sign-up background" className=" md:hidden w-full"/>
                    <div className="absolute pt-1 top-[25%] left-[5%] md:left-[20%] flex flex-col gap-2 md:gap-6 items-center w-[90%] md:w-[60%]">
                        <h2 className="text-[#2F327D] font-bold text-md md:text-3xl text-center w-[60%]">Subscribe to stay up to date with <span className=" text-[#0FACAC]">ACES</span> Uniben</h2>          
                        <div className="bg-white text-sm md:text-lg rounded-4xl px-1 py-1 md:py-2 md:px-4 w-full md:w-[70%]">
                        <form className="flex justify-between text-sm md:text-lg items-center w-full">
                            <input 
                            type="email" 
                            placeholder="Your Email"
                            name="email"
                            className="text-xs md:text-lg px-1 py-0 md:px-2 md:py-1 w-focus:outline-none focus:ring-2 focus:ring-[#0FACAC] focus:border-transparent w-[80%]"
                            required
                            />
                            <button 
                            type="submit"
                            className="text-xs bg-[#166D86] text-white rounded-4xl p-1 md:py-2 md:px-4 hover:bg-[#0FACAC] transition-colors duration-200 font-medium"
                            >
                            Subscribe
                            </button>
                        </form>
                        </div>
                    </div>
                    
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}