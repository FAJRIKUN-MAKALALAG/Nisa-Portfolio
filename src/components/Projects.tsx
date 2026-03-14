import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Loader2, AlertCircle, FolderOpen, X, ExternalLink, Figma, Github, Globe } from "lucide-react";

export interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pdfUrl?: string;
  links?: ProjectLink[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data: Project[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Project, "id">),
      }));
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);



  // Helper for rendering the correct icon
  const renderLinkIcon = (label?: string) => {
    if (!label) return <Globe size={18} />;
    const lower = label.toLowerCase();
    if (lower.includes("figma")) return <Figma size={18} />;
    if (lower.includes("github") || lower.includes("repo")) return <Github size={18} />;
    if (lower.includes("pdf") || lower.includes("doc")) return <FileText size={18} />;
    return <Globe size={18} />;
  };

  return (
    <section id="projects" className="py-12 md:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            Projects
          </h2>
          <div className="w-16 h-1 md:w-20 bg-rose-500 mx-auto rounded-full" />
          <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-600">
            Click on a project card to see more details
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <Loader2 size={36} className="animate-spin text-rose-400" />
            <p className="text-sm">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-rose-400 gap-3">
            <AlertCircle size={36} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <FolderOpen size={36} />
            <p className="text-sm">No projects added yet.</p>
          </div>
        )}

        {/* Project Cards */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-rose-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Cover Image */}
                <div className="relative overflow-hidden h-48 bg-rose-50">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText size={48} className="text-rose-200" />
                    </div>
                  )}
                  {/* Overlay badge */}
                  <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FileText size={12} />
                    View Details
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="px-5 pb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 border border-rose-200 rounded-full px-3 py-1 group-hover:bg-rose-500 group-hover:text-white transition-all duration-200">
                    Read More
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              />

              {/* Modal Content */}
              <motion.div
                className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-full transition-colors z-30 shadow-md"
                >
                  <X size={20} />
                </button>

                {/* Top Section - Image */}
                <div className="relative w-full h-64 sm:h-80 md:h-[400px] bg-rose-100 flex-shrink-0">
                  {selectedProject.coverImage ? (
                    <img
                      src={selectedProject.coverImage}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText size={100} className="text-rose-200" />
                    </div>
                  )}
                  {/* Floating preview badge (Static) */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-rose-600 flex items-center gap-2 shadow-sm">
                    <ExternalLink size={12} />
                    Project Preview
                  </div>
                </div>

                {/* Bottom Section - Content Body */}
                <div className="w-full p-6 sm:p-10 lg:p-12 overflow-y-auto max-h-[50vh] bg-white">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                      {selectedProject.title}
                    </h3>
                    
                    <div className="space-y-8">
                      <div className="text-xs font-bold text-rose-600 uppercase tracking-[0.3em] flex items-center gap-4">
                        <div className="w-12 h-1 bg-rose-500 rounded-full" />
                        Project Description
                      </div>
                      <p className="text-slate-600 leading-relaxed text-base sm:text-xl text-justify font-light whitespace-pre-line">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Documentation Buttons */}
                    <div className="mt-12 pt-10 border-t border-slate-100">
                      {(selectedProject.links && selectedProject.links.length > 0) || selectedProject.pdfUrl ? (
                        <>
                          <p className="text-sm text-slate-500 font-medium mb-4 text-center sm:text-left">
                            Project resources & links:
                          </p>
                          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                            {/* Fallback legacy pdfUrl button if links array is not present or if they both exist */}
                            {selectedProject.pdfUrl && (
                              <a
                                href={selectedProject.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-all shadow-lg hover:-translate-y-1 active:scale-95 whitespace-nowrap"
                              >
                                <FileText size={18} />
                                Document / PDF
                              </a>
                            )}
                            
                            {/* Map through dynamic links */}
                            {selectedProject.links && selectedProject.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-slate-900 transition-all shadow-lg hover:-translate-y-1 active:scale-95 whitespace-nowrap"
                              >
                                {renderLinkIcon(link.label)}
                                {link.label || "Link"}
                              </a>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-slate-400 font-medium italic text-center sm:text-left">
                          No external links available for this project.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
