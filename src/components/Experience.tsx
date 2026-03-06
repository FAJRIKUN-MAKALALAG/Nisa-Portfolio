import { motion } from "motion/react";
import { Briefcase, Users } from "lucide-react";

const experiences = [
  {
    type: "Project",
    role: "System Analyst",
    company: "MapalusAD Multi-Vendor E-Commerce Platform",
    period: "Oct 2024 - Dec 2024",
    description: "Conducted requirements gathering (BRD & SRS), designed technical blueprints using UML/Flowcharts, and architected end-to-end multi-vendor workflows including vendor onboarding and commission logic."
  },
  {
    type: "Organization",
    role: "Member, Secretariat Division",
    company: "Student Election Commission, Faculty of Computer Science",
    period: "September 2025",
    description: "Managed administrative operations, drafted election rules, and coordinated with team members to ensure smooth election processes."
  },
  {
    type: "Organization",
    role: "Vice Coordinator, Education Division",
    company: "Computer Science Student Association (CSSA)",
    period: "August 2025",
    description: "Led a Computer Programming tutoring program for first-year students, strengthening communication skills and improving analysis of learning needs."
  },
  {
    type: "Organization",
    role: "Member, Field Operations Team",
    company: "FX - Media Exhibition",
    period: "April 2025",
    description: "Supported operational activities, assisted in 3D Props & Modeling and No-Code Game Developer workshops."
  },
  {
    type: "Organization",
    role: "Treasurer",
    company: "Faculty Day, Faculty of Computer Science",
    period: "September 2024",
    description: "Managed committee budget and financial records, monitored expenditures, and ensured smooth event execution."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-12 md:py-20 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">Experience</h2>
          <div className="w-16 h-1 md:w-20 bg-rose-500 mx-auto rounded-full"></div>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-600">Project & Organizational Experiences</p>
        </motion.div>

        <div className="relative border-l-4 border-rose-200 ml-2 md:ml-1/2 space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="relative pl-6 md:pl-0"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Dot on timeline */}
              <div className="absolute -left-[10px] top-0 w-5 h-5 bg-rose-500 rounded-full border-4 border-white shadow-md"></div>
              
              <div className={`md:flex items-start justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>
                <div className="hidden md:block w-5/12"></div> {/* Spacer */}
                
                <div className="md:w-5/12 bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-rose-100">
                  <div className="flex items-center gap-2 mb-2">
                    {exp.type === "Project" ? <Briefcase size={16} className="text-rose-500 md:w-[18px] md:h-[18px]" /> : <Users size={16} className="text-rose-500 md:w-[18px] md:h-[18px]" />}
                    <span className="text-xs md:text-sm font-semibold text-rose-500">{exp.period}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900">{exp.role}</h3>
                  <h4 className="text-base md:text-lg text-slate-600 font-medium mb-2 md:mb-3">{exp.company}</h4>
                  <p className="text-slate-600 leading-relaxed text-xs md:text-sm">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
