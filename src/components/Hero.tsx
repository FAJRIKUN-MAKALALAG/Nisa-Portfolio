import { motion } from "motion/react";
import { Download, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-rose-50 via-white to-rose-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* Left Side - Text */}
        <motion.div 
          className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-rose-100 text-rose-600 rounded-full text-xs md:text-sm font-semibold tracking-wide mb-2">
            System Analyst | Business Analyst | Data Analyst
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Hello, I'm <br />
            <span className="text-rose-600">Fahrunnisa Indah Cahyani</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Bachelor of Information System Major from Universitas Klabat with a 3.98 GPA. 
            Strong interest in Business Intelligence & Analytics, Business Process Reengineering (BPR), and Digital Marketing.
            Experienced in working on IT-based and data analysis projects to support decision-making.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center md:justify-start pt-2 md:pt-4 text-slate-600 text-xs sm:text-sm">
             <div className="flex items-center gap-2 justify-center sm:justify-start">
                <MapPin size={16} className="text-rose-500" />
                <span>Airmadidi, Minahasa Utara</span>
             </div>
             <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Phone size={16} className="text-rose-500" />
                <span>+62 898-0835-200</span>
             </div>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start pt-4">
            <motion.a
              href="/cv.pdf"
              download="Fahrunnisa_Indah_Cahyani_CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 md:px-8 md:py-3 bg-rose-600 text-white rounded-full font-medium text-sm md:text-base shadow-lg hover:bg-rose-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download size={18} className="md:w-5 md:h-5" />
              Download CV
            </motion.a>
            <div className="flex gap-3 md:gap-4 items-center">
              <a href="https://www.linkedin.com/in/fahrunnisa-indah-cahyani" target="_blank" rel="noopener noreferrer" className="p-2.5 md:p-3 bg-white text-slate-700 rounded-full shadow-md hover:text-rose-600 transition-colors">
                <Linkedin size={18} className="md:w-5 md:h-5" />
              </a>
              <a href="mailto:fahrunnisa.cahyani@gmail.com" className="p-2.5 md:p-3 bg-white text-slate-700 rounded-full shadow-md hover:text-rose-600 transition-colors">
                <Mail size={18} className="md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div 
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-rose-200 rounded-3xl blur-3xl opacity-50 animate-pulse"></div>
            <img 
              src="/profile.jpeg" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://picsum.photos/seed/fahrunnisa/800/800";
              }}
              alt="Fahrunnisa Indah Cahyani" 
              className="relative w-full h-full object-cover rounded-3xl border-4 border-white shadow-2xl z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
