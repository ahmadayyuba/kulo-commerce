import { Logo } from "../ui/Logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TiktokIcon } from "../../assets/icons/icon";

export const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-slate-200 text-slate-600">
            <div className="max-w-[1280px] mx-auto sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

                {/* KOLOM 1: BRAND IDENTITY & SOCIAL MEDIA */}
                <div className="md:col-span-5 space-y-4">
                    <Logo/>

                    <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maiores totam itaque doloremque excepturi voluptates, eius beatae quia debitis necessitatibus delectus similique modi placeat ratione consectetur fuga. Nobis, dignissimos nulla!
                    </p>

                    <div className="pt-2 space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 tracking-wider">
                            Follow on Social Media
                        </h4>

                        {/* Lingkaran Sosial Media Icon */}
                        <div className="flex items-center gap-3">
                        <a 
                        href="#"
                        className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-slate-50 transition-colors"
                        aria-label="Facebook"
                        >
                            <FacebookIcon className="w-4 h-4"/>
                        </a>
                        <a
                        href="#"
                        className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-slate-50 transition-colors"
                        aria-label="Instagram"
                        >
                            <InstagramIcon className="w-4 h-4" />
                        </a>
                        <a
                        href="#"
                        className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-slate-50 transition-colors"
                        aria-label="LinkedIn"
                        >
                            <LinkedinIcon className="w-4 h-4" />
                        </a>
                        <a
                        href="#"
                        className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-slate-50 transition-colors"
                        aria-label="TikTok"
                        >
                            <TiktokIcon className="w-4 h-4" />
                        </a>
                        </div>
                    </div>
                </div>

                {/* KOLOM 2: E-COMMERCE LINKS */}
                <div className="md:col-span-3 space-y-3">
                    <h3 className="text-sm font-bold text-slate-900">E-Commerce</h3>
                        <ul className="space-y-2.5 text-sm text-slate-600">
                            <li>
                                <a href="#" className="hover:text-blue-600 transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition-colors">Terms & Condition</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition-colors">Blog</a>
                            </li>
                        </ul>
                    </div>

                {/* KOLOM 3: HELP LINKS */}
                <div className="md:col-span-4 space-y-3">
                    <h3 className="text-sm font-bold text-slate-900">Help</h3>
                        <ul className="space-y-2.5 text-sm text-slate-600">
                            <li>
                                <a href="#" className="hover:text-blue-600 transition-colors">How to Transact</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition-colors">Payment Method</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition-colors">How to Register</a>
                            </li>
                        </ul>
                    </div>
            </div>
        </div>
    </footer>
    )
}
