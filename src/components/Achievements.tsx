import { motion } from "motion/react";
import { Trophy, Award } from "lucide-react";

const achievements = [
  {
    title: "PROXO CORIS National IT Competition (Business Plan)",
    award: "Best Innovation Award",
    date: "April 2024",
    description: "Awarded Best Innovation at the national level for the theme “Technology for a Sustainable Tomorrow”; developed a creative technology-based business idea supporting sustainability."
  },
  {
    title: "Indoneris National IT Competition (Digital Business Plan)",
    award: "2nd Place Winner",
    date: "December 2023",
    description: "Achieved 2nd Place at the national level for the theme “Use of Technology for Society in Technopreneurship”; designed a creative digital business concept leveraging technology."
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-12 md:py-20 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">Achievements</h2>
          <div className="w-16 h-1 md:w-20 bg-rose-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-rose-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-rose-100 p-2.5 md:p-3 rounded-full text-rose-600 shrink-0">
                  <Trophy size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <span className="inline-block px-2.5 py-1 bg-rose-100 text-rose-800 text-[10px] md:text-xs font-bold rounded-full mb-2">
                    {item.date}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">{item.award}</h3>
                  <h4 className="text-sm md:text-md text-slate-700 font-semibold mb-2 md:mb-3">{item.title}</h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
