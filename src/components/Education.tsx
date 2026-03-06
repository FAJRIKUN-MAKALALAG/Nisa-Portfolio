import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Computer Science in Information System",
    school: "Universitas Klabat",
    year: "Aug 2022 - Dec 2025",
    desc: "Graduated in 3.5 years with a 3.98 GPA. Thesis: Business Process Reengineering of Supply Chain Management and Customer Relationship Management at CV. Mitra Karya Nusantara Using ERP-Based BPM Method."
  }
];

export default function Education() {
  return (
    <section id="education" className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">Education</h2>
          <div className="w-16 h-1 md:w-20 bg-rose-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="bg-rose-50 p-6 md:p-8 rounded-2xl border border-rose-100 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:bg-rose-100 transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="bg-white p-3 md:p-4 rounded-full shadow-sm text-rose-500 shrink-0">
                <GraduationCap size={24} className="md:w-8 md:h-8" />
              </div>
              <div>
                <span className="inline-block px-2.5 py-1 bg-rose-200 text-rose-800 text-[10px] md:text-xs font-bold rounded-full mb-2">
                  {edu.year}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">{edu.degree}</h3>
                <h4 className="text-base md:text-lg text-slate-700 font-medium mb-2">{edu.school}</h4>
                <p className="text-slate-600 text-sm md:text-base">{edu.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
