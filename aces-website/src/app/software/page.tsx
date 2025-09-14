import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Software() {
  const niches = [
    {title: "App", name: "Development", link: "https://chat.whatsapp.com/EypE81iG7IEJw5s36xz793?mode=ems_copy_c", src: "/app.svg"},
    {title: "Web", name: "Development", link: "https://chat.whatsapp.com/IWrMfBruhrTEDp96gT3ZGo?mode=ems_copy_c", src: "/web.svg"},
    {title: "Cyber", name: "Security", link: "https://chat.whatsapp.com/Ea9nnXXIy1t4Hy1fnkAKVe?mode=ems_copy_c", src: "/cyber.svg"},
    {title: "Product", name: "Design", link: "https://chat.whatsapp.com/CAD9uf6ZoVGBNEzgStPOLa?mode=ems_copy_c", src: "/product.svg"},
    {title: "Artificial", name: "Intelligence", link: "https://chat.whatsapp.com/LYXKbIcX60D75Dgfqj2lCB?mode=ems_copy_c", src: "/artificial.svg"},
    {title: "Data", name: "Science", link: "https://chat.whatsapp.com/DDdUPmGTUFwBnxiF6QFvlG?mode=ems_copy_c", src: "/data.svg"},
  ]
  const governors = [
    {name: "Ogbaudu Oghenemaro", role: "Technical Governor", description: "Software Engineer, Front-end Developer and Cyber-Security Expert", picture: "/maro.png", facebook: "https://x.com/odogwuScript", github: "https://www.github.com/Maroprosper", linkedIn: "https://www.linkedin.com/in/oghenemaro-ogbaudu-124a93278"},
    {name: "Onwuka David", role: "Administrative Governor", description: "Software Engineer, Blockchain Developer and Technical Writer", picture: "/david.png", facebook: "https://x.com/xavierScript", github: "https://github.com/xavierScript", linkedIn: "https://www.linkedin.com/in/david-onwuka-1b882a220?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
  ]
  const activities = [
    {picture: "/hackathon.svg", title: "Hackathons", paragraph: "The club engage in different hackathons and also organise in house hackathons so that members of the club can compete as well to improve their skills"},
    {picture: "/webinar.svg", title: "Webinars", paragraph: "The club organises webinars on twitter, zoom, Twitter (X) so enlighten and to educate the members on different niches "},
    {picture: "/mentorship.svg", title: "Mentorships", paragraph: "The Governors mentor the members of the club and direct them on the way to go and also to ensure that they are consistent and improve individually"},
  ]
  return ( 
    <div className="">
        <Header/>
        <main className="flex flex-col gap-20 md:gap-25 items-center mb-20">
          <section className="md:w-2/3 text-center flex flex-col gap-3 mt-10 md:mt-20">
            <h1 className="text-2xl md:text-5xl text-[#2F327D] font-bold">Association of Computer Engineering <br/>Students <span className="text-[#0FACAC] ">Software Club</span></h1>
            <p className="w-[80%] mx-auto text-[#696984]">Making a difference and inspiring new wave of Engineers in tech</p>
          </section>
          
          <section className="w-[90%] flex flex-col items-center text-center">
            <div className="relative">
              <div className="hidden md:flex gap-1 md:gap-3 px-2 md:py-0 md:px-5 w-1/2 absolute left-[30%] top-[0%]">
                <div className="bg-[#166D86] text-white w-2/5 rounded-4xl md:px-10 md:py-4 text-xs md:text-xl font-bold p-0.5"><Link key='about' href='/about'>About Us </Link></div>
                <div className="text-[#166D86] border-2  w-2/5 border-[#166D86] bg-white rounded-4xl p-0.5 md:px-10 md:py-4 text-xs md:text-xl font-bold"><Link key='contact' href='/contact'>Contact Us </Link></div>
              </div>
              <Image className="hidden md:block" src="/Add.png" alt="ACES Students" width={1088} height={549} />
              <Image className="md:hidden w-[100%]" src="/mobAdd.png" alt="ACES Students" width={600} height={215} />
            </div>
          </section>
          
          <section className="flex flex-col-reverse md:flex-row gap-20 md:gap-0 justify-between md:justify-evenly items-center">
            <div className="flex flex-col gap-2 relative w-[90%] md:w-2/5 items-start justify-evenly">
              <Image src="/pointers.svg" width={474.67} height={64.99} alt="pointers illustration" className="absolute -top-12 left-2 md:-left-1 -z-0"/>
              <h2 className="text-[#2F327D] font-bold text-2xl md:text-4xl relative">About the<span className="text-[#0FACAC] z-10"> Club</span></h2>
              <p className="text-[#2F327D]">The ACES Software Developer Club was introduced by the <span className="text-[#0FACAC]">New Age Executives 22/23</span>. Then it was inaugurated by <span className="text-[#0FACAC]">the Emeritus President of Golden Age Executives 23/24 by Victor Warikobo-West</span>. They saw the importance of engaging the students of the department of Computer Engineering to ensure that they are have an area of interest and ensure that they are well grounded in whatever path they choose. The club is ran by the Appointed (Admin and Technical) Governors.</p>
            </div>
            <div className="w-[90%] md:w-2/5">
              <Image src="/softGroup.png" height={359.33} width={498.67} alt="Picture of students listening to their teacher in their classroom"/>
            </div>
          </section>
          
          <section className="text-center flex flex-col items-center gap-20 w-[100%] md:w-full">
            <div className="w-[90%] md:w-full flex flex-col gap-5 items-center">
              <h2 className="text-xl md:text-3xl font-bold text-[#2F327D]">Explore our Different <span className="text-[#0FACAC]">Niches</span></h2>
              <p className="w-[90%] md:w-1/2 text-[#696984]">There are different Niches in software that one can venture into. These are the ones the software club are working on. Choose what suits you best.</p>
            </div>
            <div className="w-[90%] md:w-[80%] grid grid-cols-1 md:grid-cols-2 gap-15 mx-auto md:mx-0">
              {niches.map(niche => (
                <div key={niche.title} className="self-center flex justify-between gap-2 bg-white rounded-4xl shadow-xl p-10 mx-auto w-[100%] h-50">
                  <div className="flex flex-col justify-between">
                    <h4 className="text-[#2F327D] text-xl text-left font-medium">{niche.title} <br/> {niche.name}</h4>
                    <div ><a className="text-[#2F327D] flex gap-2 items-center text-sm font-light" href={niche.link}><Image src="Icon.svg" alt="navigation arrow" width={30} height={30}/> <p>Join Now</p></a></div>
                  </div>
                  <div className="self-center">
                    <Image src={niche.src} alt={niche.title + " icon"} width={113.5} height={83.5}/>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col md:flex-row items-center w-[100%] mt-10">
              <div className="w-[90%] md:w-2/5">
                <Image src="/softapp.png" alt="ACES Mobile app Mockup" height={931.93} width={851.64}/>
              </div>
              <div className="flex flex-col gap-6 md:py-15 md:px-20 w-[90%] md:w-3/5">
                <h3 className="text-xl md:text-3xl font-bold text-[#2F327D]">Learn More with the <span className="text-[#0FACAC]">ACES Mobile App</span> </h3>
                <p className="text-[#565886]">Login to the mobile app and have access to more resources that will help in your <span className="text-[#0FACAC]">software</span> journey. It is important so that grow in knowledge based on your niche. </p>
                <p className="text-[#565886]">Download now and enjoy the benefits that come with it.</p>
                <div className="flex gap-8 items-center">
                  <div className="bg-[#166D86] text-white rounded-4xl px-4 py-2 text-xl"><a key='download' href='https://download.acesuniben.org'>Download Now</a></div>
                  <Image src='/Arrow.png' alt="Arrow Icon" width={84} height={67} />
                </div>
              </div>
          </section>

          <section className="text-center flex flex-col items-center gap-10 md:gap-20 w-full">
            <div className="w-full flex flex-col gap-6 items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2F327D]">ACES Software Club <span className="text-[#0FACAC]">Governors</span></h2>
              <p className="w-[80%] md:w-1/2 text-[#696984]">These are the people that are in charge and also run the activities of the Software club. Curious? Look below.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-[90%] md:w-[80%]">
              {governors.map(governor => (
                <div key={governor.name} className="flex text-left pr-4 shadow-lg rounded-xl">
                  <div><Image src={governor.picture} width={331.72} height={331.72} alt={"Picture of the " + governor.role + " " + governor.name}/></div>
                  <div className="flex flex-col justify-around px-2 py-1">
                    <div>
                      <h3 className="text-md font-semibold text-[#2F327D]">{governor.name}</h3>
                      <h4 className="text-sm font-semibold text-[#0FACAC]">{governor.role}</h4>
                    </div>
                    <p className="text-xs w-[90%] text-[#787A82]">{governor.description}</p>
                    <div className="flex gap-4">
                      <a href={governor.facebook}><Image src="/x.svg" width={20} height={20} alt="Facebook Icon"/></a>
                      <a href={governor.github}><Image src="/github.svg" width={20} height={20} alt="Github Icon"/></a>
                      <a href={governor.linkedIn}><Image src="/linkedin.svg" width={20} height={20} alt="LinkedIn Icon"/></a>
                    </div>
                  </div>
                </div>
              )
              )}
            </div>
          </section>

          <section className="flex flex-col gap-20 items-center w-[100%]">
           <div className="w-full flex flex-col gap-8 items-center">
              <h2 className="text-xl md:text-3xl font-bold text-[#2F327D]">Club <span className="text-[#0FACAC]">Activities</span></h2>
              <p className="w-[90%] text-[#696984] md:w-1/2 text-center">These are the few activities that are done in the software club. Ensure you participate.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-15 w-[90%] md:w-[80%]">
              {activities.map(activity => (
                <div key={activity.title} className="text-center rounded-xl shadow-lg relative flex flex-col gap-5 px-8 py-6">
                  <Image className="absolute -top-[20%] left-[35%]" src={activity.picture} width={100} height={100} alt={activity.title + " icon"}/>
                  <h4 className="mt-10 text-xl text-[#2F327D] font-semibold">{activity.title}</h4>
                  <p className="text-sm text-[#565886]">{activity.paragraph}</p>
                </div>
              ))
              }
            </div>
          </section>

          <section className="w-full flex justify-center items-center">
            <div className="relative w-[90%]">
              <Image src="/subscribe.svg" height={712.5} width={1525} alt="" className="hidden md:block w-full"/>
              <Image src="/mobSub2.svg" height={528} width={356} alt="" className=" md:hidden w-full"/>
              <div className="px-5 py-2 md:p-0 absolute top-[15%] md:top-[30%] md:left-[20%] m-auto flex flex-col md:flex-row gap-5 md:gap-20 items-center md:items-start w-[100%] md:w-[60%] h-full">
                  <div className="w-auto md:w-2/3 flex flex-col gap-5 md:gap-10 items-start">
                    <p className="text-[#2F327D] text-xl md:text-3xl font-bold ">Interested in <span className="text-[#0FACAC]">Hardware?</span> The Hardware Club is Available for you. Check it out.</p>
                    <div className="text-white  bg-[#166D86] text-md md:text-lg px-4 py-2 md:px-4 md:py-2 rounded-3xl"><Link href="/hardware">Hardware Club</Link></div>
                  </div>
                  <div>
                    <Image src="/board.svg" width={174.31} height={227.61} alt=""/>
                  </div>
                </div>
              </div>
          </section>
        </main>

        {/* Footer */}
        <Footer/>
    </div>
  )}
