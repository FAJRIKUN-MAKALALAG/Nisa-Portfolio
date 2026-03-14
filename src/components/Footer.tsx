import { useState, useEffect } from "react";
import { Linkedin, Mail, Phone, MessageCircle } from "lucide-react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase";

export default function Footer() {
  const [phone, setPhone] = useState("+62 898-0835-200");
  const [email, setEmail] = useState("fahrunnisa.cahyani@gmail.com");
  const [linkedin, setLinkedin] = useState("https://www.linkedin.com/in/fahrunnisa-indah-cahyani-b54252271");
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const q = query(collection(db, "profile"), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const profileData = querySnapshot.docs[0].data();
          if (profileData.phone) setPhone(profileData.phone);
          if (profileData.email) setEmail(profileData.email);
          if (profileData.linkedin) setLinkedin(profileData.linkedin);
          if (profileData.whatsapp) setWhatsapp(profileData.whatsapp);
        }
      } catch (error) {
        console.error("Error fetching profile info in footer:", error);
      }
    };
    fetchProfile();
  }, []);

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
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors">
              <Linkedin size={20} className="md:w-5 md:h-5" />
              <span className="text-sm">Fahrunnisa Indah Cahyani</span>
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors">
              <Mail size={20} className="md:w-5 md:h-5" />
              <span className="text-sm">{email}</span>
            </a>
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors">
              <Phone size={20} className="md:w-5 md:h-5" />
              <span className="text-sm">{phone}</span>
            </a>
            {whatsapp && (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors">
                <MessageCircle size={20} className="md:w-5 md:h-5" />
                <span className="text-sm">WhatsApp</span>
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-slate-500 text-xs md:text-sm">
          &copy; {new Date().getFullYear()} Fahrunnisa Indah Cahyani. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
