
import Link from "next/link";
import { Logo } from "./icons";

export default function Footer() {
    return (
        <footer className="px-[20px] max-w-[1440px]  mx-auto">
            <div className=" mx-auto bg-primary  2xl:mx-[70px] text-white lg:px-[80px] px-[20px]  rounded-t-[12px] ">
                <div className="flex flex-col md:flex-row md:justify-between pt-[80px] pb-[40px] md:items-start gap-8 border-t border-white/10 ">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Logo />
                            <span className="text-lg font-semibold">LifetimeArt</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-white text-lg font-semibold">Quick Links</h2>
                        <div className="grid grid-cols-2 gap-[80px]">
                            <div className="flex flex-col gap-3">
                                <Link href="/about" className="text-md text-[#d0d1db] hover:text-white">
                                    About us
                                </Link>
                                <Link href="/our-work" className="text-md text-[#d0d1db] hover:text-white">
                                    Our work
                                </Link>
                                <Link href="/services" className="text-md text-[#d0d1db] hover:text-white">
                                    Services
                                </Link>
                            </div>
                            <div className="flex flex-col gap-4">
                                <Link href="/testimonials" className="text-md text-[#d0d1db] hover:text-white">
                                    Testimonials
                                </Link>
                                <Link href="/faqs" className="text-md text-[#d0d1db] hover:text-white">
                                    FAQs
                                </Link>
                                <Link href="/contact" className="text-md text-[#d0d1db] hover:text-white">
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-[40px] pb-[80px]">
                    <div className="text-start text-md font-semibold  text-white ">
                        © 2025 LifetimeArt. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
