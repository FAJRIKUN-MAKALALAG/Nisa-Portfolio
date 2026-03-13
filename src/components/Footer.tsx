import { Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-rose-400 font-sans tracking-tight mb-2">Fahrunnisa Indah Cahyani</h2>
            <p className="text-slate-400 max-w-sm text-sm md:text-base">
              Adaptable to challenge, continuously learning, and seeking growth opportunities.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:gap-4 mt-6 md:mt-0 items-start md:items-end">
            <a href="https://www.linkedin.com/in/fahrunnisa-indah-cahyani" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors">
              <Linkedin size={20} className="md:w-5 md:h-5" />
              <span className="text-sm">Fahrunnisa Indah Cahyani</span>
            </a>
            <a href="mailto:fahrunnisa.cahyani@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors">
              <Mail size={20} className="md:w-5 md:h-5" />
              <span className="text-sm">fahrunnisa.cahyani@gmail.com</span>
            </a>
            <a href="tel:+628980835200" className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors">
              <Phone size={20} className="md:w-5 md:h-5" />
              <span className="text-sm">+62 898-0835-200</span>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-slate-500 text-xs md:text-sm">
          &copy; {new Date().getFullYear()} Fahrunnisa Indah Cahyani. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
