import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-rose-200 selection:text-rose-900">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Achievements />
      </main>
      <Footer />
    </div>
  );
}
