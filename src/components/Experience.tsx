import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Briefcase, ExternalLink, Image as ImageIcon } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

interface ExperienceItem {
  id?: string;
  role: string;
  company: string;
  period: string;
  description: string;
  image?: string; // Kept for backward compatibility
  images?: string[];
}



const fallbackOrganizationExperiences: ExperienceItem[] = [
  {
    role: "Member, Secretariat Division",
    company: "Student Election Commission, Faculty of Computer Science",
    period: "September 2025",
    description:
      "Managed administrative operations, drafted election rules, and coordinated with team members to ensure smooth election processes.",
  },
  {
    role: "Vice Coordinator, Education Division",
    company: "Computer Science Student Association (CSSA)",
    period: "August 2025",
    description:
      "Led a Computer Programming tutoring program for first-year students, strengthening communication skills and improving analysis of learning needs.",
  },
  {
    role: "Member, Field Operations Team",
    company: "FX - Media Exhibition",
    period: "April 2025",
    description:
      "Supported operational activities, assisted in 3D Props & Modeling and No-Code Game Developer workshops.",
  },
  {
    role: "Treasurer",
    company: "Faculty Day, Faculty of Computer Science",
    period: "September 2024",
    description:
      "Managed committee budget and financial records, monitored expenditures, and ensured smooth event execution.",
  },
];

const fallbackProjectExperiences: ExperienceItem[] = [
  {
    role: "System Analyst",
    company: "MapalusAD Multi-Vendor E-Commerce Platform",
    period: "Oct 2024 - Dec 2024",
    description: "Conducted comprehensive requirements gathering to translate complex business needs into detailed Business Requirement Documents (BRD) and System Requirement Specifications (SRS). Designed technical blueprints using UML and Flowcharts. Architected end-to-end multi-vendor workflows, including vendor onboarding, product management, and automated commission distribution logic.",
  },
];

function Timeline({
  items,
  icon,
}: {
  items: ExperienceItem[];
  icon: React.ReactNode;
}) {
  return (
    <div className="relative border-l-4 border-rose-200 ml-3 space-y-8 md:space-y-12">
      {items.map((item, index) => (
        <motion.div
          key={item.id || index}
          className="relative pl-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Dot on timeline */}
          <div className="absolute -left-[10px] top-0 w-5 h-5 bg-rose-500 rounded-full border-4 border-white shadow-md" />

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-rose-100 overflow-hidden">
            {(item.images?.length ? item.images : (item.image ? [item.image] : [])).length > 0 && (
              <div className="w-full flex overflow-x-auto snap-x snap-mandatory bg-rose-50 border-b border-rose-100">
                {(item.images?.length ? item.images : (item.image ? [item.image] : [])).map((imgUrl, i) => (
                  <div 
                    key={i}
                    className="w-full sm:w-80 h-48 sm:h-64 flex-shrink-0 snap-center cursor-zoom-in group relative overflow-hidden border-r border-rose-100 last:border-r-0"
                    onClick={() => window.open(imgUrl, "_blank")}
                    title="Click to view full image"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`${item.role} at ${item.company} - Image ${i + 1}`} 
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
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-rose-600 flex items-center gap-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <ExternalLink size={10} />
                      View Full Image
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                {icon}
                <span className="text-xs md:text-sm font-semibold text-rose-500">
                  {item.period}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight mb-1">
                {item.role}
              </h3>
              <h4 className="text-base md:text-lg text-slate-600 font-medium mb-3 md:mb-4 border-b border-slate-100 pb-2">
                {item.company}
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Experience() {
  const [orgExperiences, setOrgExperiences] = useState<ExperienceItem[]>(fallbackOrganizationExperiences);
  const [projExperiences, setProjExperiences] = useState<ExperienceItem[]>(fallbackProjectExperiences);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // Fetch Organization Experiences
        const orgQuery = query(collection(db, "experiences")); // You can add orderBy("createdAt", "desc") if you add a timestamp field
        const orgSnapshot = await getDocs(orgQuery);
        
        let fetchedOrgData: ExperienceItem[] = [];
        if (!orgSnapshot.empty) {
          fetchedOrgData = orgSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              images: data.images && Array.isArray(data.images) ? data.images : (data.image ? [data.image] : [])
            } as ExperienceItem;
          });
        }

        // Fetch Project Experiences
        const projQuery = query(collection(db, "projectExperiences"));
        const projSnapshot = await getDocs(projQuery);
        
        let fetchedProjData: ExperienceItem[] = [];
        if (!projSnapshot.empty) {
          fetchedProjData = projSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              images: data.images && Array.isArray(data.images) ? data.images : (data.image ? [data.image] : [])
            } as ExperienceItem;
          });
        }

        // Only update if we successfully found data in Firebase, otherwise keep using fallbacks
        if (fetchedOrgData.length > 0) setOrgExperiences(fetchedOrgData);
        if (fetchedProjData.length > 0) setProjExperiences(fetchedProjData);

      } catch (err) {
        console.error("Error fetching experiences from Firebase:", err);
        setError("Firebase connection error. Displaying local data.");
        // We will just keep the fallback data in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-12 md:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            Experience
          </h2>
          <div className="w-16 h-1 md:w-20 bg-rose-500 mx-auto rounded-full" />
          <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-600">
            Organizational Experiences
          </p>
        </motion.div>

        {/* Organizational Experience */}
        <motion.div
          className="flex items-center gap-3 mb-8 w-full"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-2 bg-rose-500 rounded-lg shrink-0">
            <Users size={20} className="text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">
            Organizational Experience
          </h3>
        </motion.div>

        
        {loading && <p className="text-center text-rose-500 text-sm italic mb-8 animate-pulse">Loading latest experiences...</p>}
        {error && <p className="text-center text-slate-400 text-xs italic mb-8">{error}</p>}

        <Timeline
          items={orgExperiences}
          icon={<Users size={16} className="text-rose-500 md:w-[18px] md:h-[18px]" />}
        />

        {/* Project Experience */}
        <motion.div
          className="flex items-center gap-3 mb-8 mt-16 md:mt-24 w-full"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-2 bg-rose-500 rounded-lg shrink-0">
            <Briefcase size={20} className="text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">
            Project Experience
          </h3>
        </motion.div>
        
        <Timeline
          items={projExperiences}
          icon={<Briefcase size={16} className="text-rose-500 md:w-[18px] md:h-[18px]" />}
        />
      </div>
    </section>
  );
}
