import { motion } from "motion/react";
import { Database, BarChart3, Settings, PenTool, Code, Users } from "lucide-react";

const skills = [
  {
    title: "Data & Business Analysis",
    icon: <BarChart3 className="w-8 h-8 text-rose-500" />,
    description: "Tools and platforms for business intelligence and process management.",
    items: ["Power BI", "Odoo", "Arena"]
  },
  {
    title: "Design & Prototyping",
    icon: <PenTool className="w-8 h-8 text-rose-500" />,
    description: "Creating visual representations and process diagrams.",
    items: ["Figma", "Draw.io (BPMN)", "Prototyping"]
  },
  {
    title: "Programming",
    icon: <Code className="w-8 h-8 text-rose-500" />,
    description: "Technical languages for data manipulation and system development.",
    items: ["Python (Basic)", "SQL (Basic)"]
  },
  {
    title: "Office Applications",
    icon: <Settings className="w-8 h-8 text-rose-500" />,
    description: "Proficiency in standard office productivity suites.",
    items: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"]
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-8 h-8 text-rose-500" />,
    description: "Interpersonal and professional attributes.",
    items: ["Discipline", "Adaptability", "Teamwork", "Communication", "Problem Solving"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">Skills</h2>
          <div className="w-16 h-1 md:w-20 bg-rose-500 mx-auto rounded-full"></div>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            A comprehensive set of technical and soft skills to drive project success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-rose-50 rounded-2xl p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 border border-rose-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="bg-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-md mb-4 md:mb-6 mx-auto">
                {skill.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 text-center mb-2 md:mb-3">{skill.title}</h3>
              <p className="text-slate-600 text-center mb-4 md:mb-6 text-xs md:text-sm">{skill.description}</p>
              <ul className="space-y-1.5 md:space-y-2">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700 text-xs md:text-sm">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-rose-500 rounded-full mr-2 md:mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
