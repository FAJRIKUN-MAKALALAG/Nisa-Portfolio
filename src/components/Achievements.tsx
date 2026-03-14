import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Image as ImageIcon, ExternalLink, Loader2 } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export interface AchievementItem {
  id?: string;
  title: string;
  award: string;
  date: string;
  description: string;
  image?: string;
}

const fallbackAchievements: AchievementItem[] = [
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
  const [achievements, setAchievements] = useState<AchievementItem[]>(fallbackAchievements);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "achievements"));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        } as AchievementItem));
        setAchievements(data);
      }
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError("Firebase connection error. Displaying local data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);



  return (
    <section id="achievements" className="py-12 md:py-20 bg-transparent">
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

        {loading && <p className="text-center text-rose-500 text-sm italic mb-8 animate-pulse flex justify-center items-center gap-2"><Loader2 className="animate-spin" size={16}/> Loading latest achievements...</p>}
        {error && <p className="text-center text-slate-400 text-xs italic mb-8">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id || index}
              className="bg-white rounded-2xl shadow-md border border-rose-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {item.image && (
                <div 
                  className="w-full h-48 sm:h-56 relative overflow-hidden bg-rose-50 cursor-zoom-in group border-b border-rose-100"
                  onClick={() => window.open(item.image, "_blank")}
                  title="Click to view full image"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        target.nextElementSibling.classList.remove('hidden');
                      }
                    }}
                  />
                  <div className="hidden absolute inset-0 flex flex-col items-center justify-center text-rose-300 bg-rose-50/50">
                    <ImageIcon size={48} className="mb-2 opacity-50" />
                    <span className="text-xs font-medium">Image failed to load</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-rose-600 flex items-center gap-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <ExternalLink size={10} />
                    View Image
                  </div>
                </div>
              )}
              
              <div className="p-6 md:p-8 flex items-start gap-3 md:gap-4">
                <div className="bg-rose-100 p-2.5 md:p-3 rounded-full text-rose-600 shrink-0 mt-1">
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
