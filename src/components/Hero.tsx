import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Download, Linkedin, Mail, Phone, MapPin, Edit2, X, AlertCircle, MessageCircle } from "lucide-react";
import { collection, getDocs, limit, query, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Hero() {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [location, setLocation] = useState("Airmadidi, Minahasa Utara");
  const [phone, setPhone] = useState("+62 898-0835-200");
  const [email, setEmail] = useState("fahrunnisa.cahyani@gmail.com");
  const [linkedin, setLinkedin] = useState("https://www.linkedin.com/in/fahrunnisa-indah-cahyani-b54252271");
  const [whatsapp, setWhatsapp] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [profileDocId, setProfileDocId] = useState<string | null>(null);

  // Edit Mode State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [savingLoading, setSavingLoading] = useState(false);
  const [editData, setEditData] = useState({
    foto: "",
    location: "",
    phone: "",
    email: "",
    linkedin: "",
    whatsapp: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const q = query(collection(db, "profile"), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const profileDoc = querySnapshot.docs[0];
          setProfileDocId(profileDoc.id);
          const profileData = profileDoc.data();
          if (profileData.foto) setProfileImg(profileData.foto);
          if (profileData.location) setLocation(profileData.location);
          if (profileData.phone) setPhone(profileData.phone);
          if (profileData.email) setEmail(profileData.email);
          if (profileData.linkedin) setLinkedin(profileData.linkedin);
          if (profileData.whatsapp) setWhatsapp(profileData.whatsapp);
          
          setEditData({
            foto: profileData.foto || "",
            location: profileData.location || "Airmadidi, Minahasa Utara",
            phone: profileData.phone || "+62 898-0835-200",
            email: profileData.email || "fahrunnisa.cahyani@gmail.com",
            linkedin: profileData.linkedin || "https://www.linkedin.com/in/fahrunnisa-indah-cahyani-b54252271?...",
            whatsapp: profileData.whatsapp || "",
          });
        } else {
          // Initialize defaults for edit form if no document exists
          setEditData({
            foto: "",
            location: "Airmadidi, Minahasa Utara",
            phone: "+62 898-0835-200",
            email: "fahrunnisa.cahyani@gmail.com",
            linkedin: "https://www.linkedin.com/in/fahrunnisa-indah-cahyani-b54252271?...",
            whatsapp: "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setSavingLoading(true);
    try {
      const docRef = doc(collection(db, "profile"), profileDocId || "main");
      await setDoc(docRef, editData, { merge: true });
      
      // Update local state
      setProfileImg(editData.foto);
      setLocation(editData.location);
      setPhone(editData.phone);
      setEmail(editData.email);
      setLinkedin(editData.linkedin);
      setWhatsapp(editData.whatsapp);
      
      alert("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile. Check Firestore rules.");
    } finally {
      setSavingLoading(false);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 bg-transparent overflow-hidden">
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
            Fresh graduate in Information Systems from Klabat University with a GPA of 3.98. Interested in data analysis, business analysis, system analysis, and ERP implementation.
            Skilled in Microsoft Excel, Python for data cleaning, Power BI for data visualization, and familiar with Odoo ERP. A fast learner who adapts quickly and is motivated to develop data-driven solutions for business decision-making.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center md:justify-start pt-2 md:pt-4 text-slate-600 text-xs sm:text-sm">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <MapPin size={16} className="text-rose-500" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Phone size={16} className="text-rose-500" />
              <span>{phone}</span>
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
              <motion.a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 md:p-3 bg-white text-slate-700 rounded-full shadow-md hover:text-rose-600 transition-colors flex items-center justify-center gap-2"
              >
                <Linkedin size={18} className="md:w-5 md:h-5 text-rose-500" />
              </motion.a>
              <motion.a
                href={`mailto:${email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 md:p-3 bg-white text-slate-700 rounded-full shadow-md hover:text-rose-600 transition-colors flex items-center justify-center gap-2"
                title="Email"
              >
                <Mail size={18} className="md:w-5 md:h-5 text-rose-500" />
              </motion.a>
              {whatsapp && (
                <motion.a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 md:p-3 bg-white text-slate-700 rounded-full shadow-md hover:text-rose-600 transition-colors flex items-center justify-center gap-2"
                  title="WhatsApp"
                >
                  <MessageCircle size={18} className="md:w-5 md:h-5 text-rose-500" />
                </motion.a>
              )}
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

            {loading ? (
              <div className="relative w-full h-full bg-slate-200 rounded-3xl animate-pulse z-10 flex items-center justify-center border-4 border-white shadow-2xl">
                <div className="w-12 h-12 border-4 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : profileImg ? (
              <img
                src={profileImg}
                alt="Fahrunnisa Indah Cahyani"
                className="relative w-full h-full object-cover rounded-3xl border-4 border-white shadow-2xl z-10"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="relative w-full h-full bg-slate-100 rounded-3xl z-10 flex items-center justify-center border-4 border-white shadow-2xl text-slate-400 text-center p-4">
                <p className="text-xs">Profile photo not set in Firebase</p>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
