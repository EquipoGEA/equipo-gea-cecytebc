import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import "@/App.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, 
  Zap, 
  Leaf, 
  TrendingDown, 
  Users, 
  Award,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  Calculator,
  Lightbulb,
  Clock,
  ThermometerSun,
  Monitor,
  ShowerHead,
  Send,
  Menu,
  XIcon,
  ArrowRight,
  Target,
  Heart,
  BookOpen,
  Globe,
  Home,
  Recycle,
  AlertTriangle,
  CheckCircle,
  Wrench,
  GraduationCap,
  Star,
  FileText,
  Sun,
  Moon,
  Smartphone,
  Bell,
  ExternalLink,
  Play,
  MessageSquare,
  Trash2
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Slider } from "./components/ui/slider";
import { Progress } from "./components/ui/progress";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Theme Context
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

// Logo y Video
const CECYTE_LOGO = "https://customer-assets.emergentagent.com/job_b2edef95-ed0f-48b1-a66e-80be8d22b524/artifacts/y1nijgqt_images__1_-removebg-preview.png";
const PROJECT_VIDEO = "https://customer-assets.emergentagent.com/job_b2edef95-ed0f-48b1-a66e-80be8d22b524/artifacts/7ebf76mu_WhatsApp%20Video%202026-03-26%20at%2010.32.21%20AM.mp4";

// Datos del proyecto
const projectData = {
  title: "EQUIPO GEA",
  subtitle: "Proyecto Comunitario Interdisciplinario",
  date: "Marzo 2026",
  stats: { especialidades: 5, estudiantes: 22, maestros: 8, fases: 5 }
};

// ODS con links oficiales
const odsData = [
  { id: 6, title: "Agua limpia y saneamiento", icon: Droplets, color: "water", url: "https://www.un.org/sustainabledevelopment/es/water-and-sanitation/" },
  { id: 7, title: "Energía asequible y no contaminante", icon: Zap, color: "electricity", url: "https://www.un.org/sustainabledevelopment/es/energy/" },
  { id: 11, title: "Ciudades y comunidades sostenibles", icon: Home, color: "eco", url: "https://www.un.org/sustainabledevelopment/es/cities/" },
  { id: 12, title: "Producción y consumo responsables", icon: Recycle, color: "gold", url: "https://www.un.org/sustainabledevelopment/es/sustainable-consumption-production/" }
];

// Problemáticas
const problemasData = [
  { id: 1, title: "Grifos abiertos", description: "Sanitarios con agua corriendo sin uso", severity: 8, category: "water" },
  { id: 2, title: "Manguera sin uso", description: "Manguera abierta en la jardinera", severity: 8, category: "water" },
  { id: 3, title: "Conexiones innecesarias", description: "Computadoras conectadas sin uso en biblioteca", severity: 7, category: "electricity" },
  { id: 4, title: "Uso de celulares", description: "Teléfonos móviles cargando en momentos no autorizados", severity: 6, category: "electricity" }
];

// Soluciones
const solucionesData = [
  { id: 1, title: "Sensores de presencia", description: "Iluminación automática inteligente", icon: Lightbulb, category: "electricity" },
  { id: 2, title: "Llaves automáticas", description: "Cierre automático para lavabos", icon: Droplets, category: "water" },
  { id: 3, title: "Paneles solares", description: "Energía renovable a largo plazo", icon: Sun, category: "electricity" },
  { id: 4, title: "Sanitarios ahorradores", description: "Mingitorios y WC de bajo consumo", icon: Droplets, category: "water" },
  { id: 5, title: "Riego por goteo", description: "Sistema eficiente para jardines", icon: Leaf, category: "water" },
  { id: 6, title: "Domos de luz natural", description: "Reducción de luz eléctrica", icon: Sun, category: "electricity" }
];

// Equipos
const equiposData = [
  { name: "Mantenimiento", members: ["Angel Martínez", "Fernando Campos", "Ramses Gomez", "Iván Lizarraga", "Henry Padilla"], icon: Wrench },
  { name: "Lab. Químico", members: ["Daniela Luna", "Ashanty Vázquez", "Camila Parra", "Anastasia Santana", "Fabian Terrones"], icon: BookOpen },
  { name: "Programación", members: ["Ernesto López Vargas", "Angel Galvan Munguia", "Dulce Amairani Perez Beltran"], icon: Monitor },
  { name: "Hotelería", members: ["Guillermo Sánchez", "Xitlali Morales", "Erika Barragan", "Santiago Castillo", "Sinai Herrera", "Brisa Martinez"], icon: Home },
  { name: "Música", members: ["Carlos Hernández", "Andrés Aguilar", "Juan González"], icon: Star }
];

const maestrosData = ["Guillermo Martínez", "Edras Salcedo", "Lina Castro", "Sara Lopez", "Bibiana Sanchez", "Manuel Ramirez", "Mauro Ochoa", "Ulises Muñoz"];

// Quiz
const quizQuestions = [
  { id: 1, question: "¿Cuántos litros de agua se desperdician con un grifo abierto por minuto?", options: ["2 litros", "6 litros", "12 litros", "20 litros"], correct: 2, explanation: "Un grifo abierto desperdicia aproximadamente 12 litros de agua por minuto." },
  { id: 2, question: "¿Qué significa GEA en el nombre del equipo?", options: ["Grupo Ecológico Activo", "Guardianes del Ecosistema Ambiental", "Diosa griega de la Tierra", "Gestión Energética Ambiental"], correct: 2, explanation: "GEA es la diosa griega de la Tierra, simbolizando el cuidado del planeta." },
  { id: 3, question: "¿Cuántas especialidades participan en el proyecto del Equipo GEA?", options: ["3 especialidades", "4 especialidades", "5 especialidades", "6 especialidades"], correct: 2, explanation: "Participan 5 especialidades: Mantenimiento, Lab. Químico, Programación, Hotelería y Música." },
  { id: 4, question: "¿Qué solución propuesta ayuda a reducir el consumo de luz eléctrica usando el sol?", options: ["Sensores de presencia", "Domos de luz natural", "Llaves automáticas", "Riego por goteo"], correct: 1, explanation: "Los domos permiten la entrada de luz natural, reduciendo la necesidad de luz eléctrica." },
  { id: 5, question: "¿Qué metodología utiliza el Equipo GEA para resolver problemas?", options: ["PDCA", "PAEC", "SCRUM", "DMAIC"], correct: 1, explanation: "La metodología PAEC: Problema, Alternativas, Elección, Consecuencias." }
];

// Tips
const tipsData = [
  { id: 1, icon: ShowerHead, title: "Cierra la llave", description: "Mientras te lavas las manos o los dientes", category: "water", savings: "12L/min" },
  { id: 2, icon: Lightbulb, title: "Apaga las luces", description: "Al salir del salón o baño", category: "electricity", savings: "25% energía" },
  { id: 3, icon: AlertTriangle, title: "Reporta fugas", description: "Avisa a mantenimiento si ves goteos", category: "water", savings: "100L/día" },
  { id: 4, icon: Monitor, title: "Desconecta equipos", description: "Computadoras que no uses", category: "electricity", savings: "15% energía" },
  { id: 5, icon: Smartphone, title: "Carga responsable", description: "No dejes tu celular cargando de más", category: "electricity", savings: "10% energía" },
  { id: 6, icon: Sun, title: "Usa luz natural", description: "Abre cortinas antes de prender luces", category: "electricity", savings: "20% energía" }
];

// Categorías de reportes
const reportCategories = [
  { value: "water_leak", label: "Fuga de agua", icon: Droplets, color: "water" },
  { value: "damaged_equipment", label: "Equipo dañado", icon: Wrench, color: "electricity" },
  { value: "suggestion", label: "Sugerencia general", icon: Lightbulb, color: "eco" }
];

// Animated counter
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const end = value;
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else { setCount(Math.floor(start)); }
        }, 1000 / 60);
      }
    }, { threshold: 0.5 });
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [value, duration]);
  return <span ref={countRef} className="stat-counter">{count.toLocaleString()}</span>;
};

// Theme Toggle Button
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors theme-toggle-btn"
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      data-testid="theme-toggle"
      aria-label="Cambiar tema"
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Sun className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Moon className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Navigation
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setIsOpen(false); };
  const navItems = [
    { id: "video", label: "Video" },
    { id: "proyecto", label: "Proyecto" },
    { id: "problematica", label: "Problemática" },
    { id: "soluciones", label: "Soluciones" },
    { id: "calculator", label: "Calculadora" },
    { id: "quiz", label: "Quiz" },
    { id: "reportes", label: "Reportes" },
    { id: "pledges", label: "Compromisos" }
  ];

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled py-3" : "bg-transparent py-5"}`} data-testid="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
            <img src={CECYTE_LOGO} alt="CECYTE BC" className="h-10 w-auto object-contain" />
            <div className="hidden sm:block">
              <span className="font-bold text-gold">EQUIPO GEA</span>
              <span className="text-xs block text-accent">CECYTE BC Ensenada</span>
            </div>
          </motion.div>
          <div className="hidden lg:flex items-center gap-5">
            {navItems.map((item, i) => (
              <motion.button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                className="nav-link text-sm"
                data-testid={`nav-${item.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
          <button className="lg:hidden text-gold" onClick={() => setIsOpen(!isOpen)} data-testid="mobile-menu-toggle">
            {isOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden mt-4 pb-4">
              {navItems.map((item, i) => (
                <motion.button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)} 
                  className="block w-full text-left py-3 nav-link transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="hero-gradient min-h-screen flex items-center pt-20" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img src={CECYTE_LOGO} alt="CECYTE BC" className="h-8 w-auto object-contain opacity-80" />
              <span className="text-xs font-mono text-gold tracking-widest uppercase">Plantel Ensenada • {projectData.date}</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <motion.span 
                className="text-heading block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >EQUIPO</motion.span>
              <motion.span 
                className="gradient-text-gold block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >GEA</motion.span>
            </h1>
            <motion.p 
              className="text-base md:text-lg text-body mb-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Proyecto Comunitario Interdisciplinario para analizar y resolver los problemas de{" "}
              <span className="text-[#0ea5e9] font-medium">agua</span> y{" "}
              <span className="text-[#f59e0b] font-medium">energía</span> de nuestro plantel.
            </motion.p>
            <motion.p 
              className="text-sm text-accent mb-8 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >"Los jóvenes de hoy no son solo estudiantes – son actores presentes capaces de transformar su comunidad."</motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button onClick={() => document.getElementById("video")?.scrollIntoView({ behavior: "smooth" })} className="btn-gold flex items-center gap-2" data-testid="hero-video-btn">
                <Play className="w-5 h-5" />Ver Video del Proyecto
              </Button>
              <Button onClick={() => document.getElementById("pledges")?.scrollIntoView({ behavior: "smooth" })} className="btn-outline flex items-center gap-2" data-testid="hero-join-btn">
                Únete al Movimiento<ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: projectData.stats.especialidades, label: "Especialidades", icon: GraduationCap, color: "text-[#c44d70]" },
                { value: projectData.stats.estudiantes, label: "Estudiantes", icon: Users, color: "text-[#0ea5e9]" },
                { value: projectData.stats.maestros, label: "Maestros", icon: BookOpen, color: "text-[#f59e0b]" },
                { value: projectData.stats.fases, label: "Fases PAEC", icon: CheckCircle, color: "text-[#d4af37]" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.4 + index * 0.15 }} 
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-3xl md:text-4xl font-bold text-heading mb-1">{stat.value}</div>
                  <p className="text-xs text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Video Section
const VideoSection = () => {
  return (
    <section id="video" className="py-24 section-burgundy" data-testid="video-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs font-mono text-accent tracking-widest uppercase mb-4 block">Conoce Nuestro Proyecto</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-heading">
            Video del <span className="gradient-text-gold">Equipo GEA</span>
          </h2>
          <p className="text-body text-base md:text-lg max-w-2xl mx-auto">
            Descubre cómo trabajamos juntos para crear un futuro más sustentable
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ type: "spring", stiffness: 100 }}
          className="video-container"
        >
          <video 
            controls 
            controlsList="nodownload"
            className="w-full"
            data-testid="project-video"
          >
            <source src={PROJECT_VIDEO} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </motion.div>
      </div>
    </section>
  );
};

// Team Card with expandable members
const TeamCard = ({ equipo, index }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div 
      key={equipo.name} 
      initial={{ opacity: 0, scale: 0.9 }} 
      whileInView={{ opacity: 1, scale: 1 }} 
      viewport={{ once: true }} 
      transition={{ delay: index * 0.1 }} 
      whileHover={{ y: -4, borderColor: "rgba(212, 175, 55, 0.5)" }}
      className="team-card relative"
    >
      <div className="icon-container burgundy mx-auto mb-3 w-12 h-12"><equipo.icon className="w-5 h-5" /></div>
      <h4 className="font-semibold text-gold mb-2 text-sm">{equipo.name}</h4>
      <ul className="text-xs text-body space-y-1">
        {equipo.members.slice(0, 3).map((member) => (<li key={member}>{member.split(" ")[0]}</li>))}
      </ul>
      {equipo.members.length > 3 && (
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-accent text-xs mt-2 hover:text-gold transition-colors flex items-center gap-1 mx-auto cursor-pointer"
          data-testid={`team-expand-${equipo.name}`}
        >
          +{equipo.members.length - 3} más
          <motion.span animate={{ rotate: expanded ? 180 : 0 }}>
            <ChevronDown className="w-3 h-3" />
          </motion.span>
        </button>
      )}
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden"
          >
            <div className="max-h-32 overflow-y-auto team-scroll pt-2 border-t border-[#4d1424]/30">
              <ul className="text-xs text-body space-y-1">
                {equipo.members.map((member) => (<li key={member} className="py-0.5">{member}</li>))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Proyecto Section
const ProyectoSection = () => {
  return (
    <section id="proyecto" className="py-24 section-gold bg-grid-gold" data-testid="proyecto-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-mono text-gold tracking-widest uppercase mb-4 block">Objetivos de Desarrollo Sostenible</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-heading">
            Comprometidos con la <span className="gradient-text-gold">Agenda 2030</span>
          </h2>
          <p className="text-body text-sm">Haz clic en cada ODS para conocer más información</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {odsData.map((ods, index) => (
            <motion.a
              key={ods.id}
              href={ods.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="ods-card text-center group"
              data-testid={`ods-${ods.id}`}
            >
              <div className={`icon-container ${ods.color} mx-auto mb-4`}>
                <ods.icon className="w-6 h-6" />
              </div>
              <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                ods.color === "water" ? "text-[#0ea5e9]" :
                ods.color === "electricity" ? "text-[#f59e0b]" :
                ods.color === "eco" ? "text-[#22c55e]" : "text-[#d4af37]"
              }`}>ODS {ods.id}</div>
              <p className="text-sm text-body mb-2">{ods.title}</p>
              <span className="ods-link-hint opacity-0 transition-opacity text-xs text-gold flex items-center justify-center gap-1">
                <ExternalLink className="w-3 h-3" /> Ver más
              </span>
            </motion.a>
          ))}
        </div>

        {/* Equipos */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-heading">Equipos de <span className="gradient-text-burgundy">Trabajo</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {equiposData.map((equipo, index) => (
              <TeamCard key={equipo.name} equipo={equipo} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Maestros */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
          <h4 className="text-lg font-semibold text-center mb-4 text-body">Maestros Responsables</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {maestrosData.map((maestro, i) => (
              <motion.span 
                key={maestro} 
                className="px-3 py-1 maestro-badge rounded-full text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >{maestro}</motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Problemática Section
const ProblematicaSection = () => {
  return (
    <section id="problematica" className="py-24 section-burgundy" data-testid="problematica-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-mono text-red-400 tracking-widest uppercase mb-4 block">Diagnóstico - Fase 1 PAEC</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-heading">
            Problemática <span className="text-red-400">Identificada</span>
          </h2>
          <p className="text-body text-base md:text-lg max-w-3xl mx-auto">
            El consumo excesivo de agua y electricidad representa un impacto
            <span className="text-red-400 font-medium"> económico, ético y ambiental</span> urgente.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {problemasData.map((problema, index) => (
            <motion.div 
              key={problema.id} 
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`glass rounded-2xl p-6 border-l-4 ${problema.category === "water" ? "border-[#0ea5e9]" : "border-[#f59e0b]"}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className={`icon-container ${problema.category}`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: index * 0.5 }}
                  >
                    {problema.category === "water" ? <Droplets className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-heading text-lg">{problema.title}</h3>
                    <p className="text-sm text-body">{problema.description}</p>
                  </div>
                </div>
                <div className={`severity-badge ${problema.severity >= 7 ? "severity-high" : "severity-medium"}`}>
                  <AlertTriangle className="w-3 h-3" />{problema.severity}/10
                </div>
              </div>
              <Progress value={problema.severity * 10} className="h-2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Soluciones Section
const SolucionesSection = () => {
  return (
    <section id="soluciones" className="py-24 section-gold bg-grid-burgundy" data-testid="soluciones-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-mono text-[#22c55e] tracking-widest uppercase mb-4 block">Alternativas - Fase 2 PAEC</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-heading">
            Soluciones <span className="text-[#22c55e]">Propuestas</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solucionesData.map((solucion, index) => (
            <motion.div 
              key={solucion.id} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.1 }} 
              whileHover={{ y: -6, scale: 1.02 }}
              className="solution-card"
            >
              <motion.div 
                className={`icon-container ${solucion.category === "water" ? "water" : "electricity"} mb-4`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <solucion.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="font-semibold text-heading text-lg mb-2">{solucion.title}</h3>
              <p className="text-sm text-body">{solucion.description}</p>
            </motion.div>
          ))}
        </div>
        {/* Tips */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-heading">Tips de Ahorro para <span className="gradient-text-gold">Estudiantes</span></h3>
          <div className="scroll-container flex gap-4 pb-4 -mx-4 px-4">
            {tipsData.map((tip, index) => (
              <motion.div 
                key={tip.id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.1 }} 
                whileHover={{ scale: 1.05 }}
                className="scroll-item tip-card"
              >
                <div className={`icon-container ${tip.category} mb-4`}><tip.icon className="w-6 h-6" /></div>
                <h4 className="font-semibold text-heading mb-2">{tip.title}</h4>
                <p className="text-body text-sm mb-4">{tip.description}</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${tip.category === "water" ? "bg-[#0ea5e9]/10 text-[#0ea5e9]" : "bg-[#f59e0b]/10 text-[#f59e0b]"}`}>
                  <TrendingDown className="w-3 h-3" />{tip.savings}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Calculator Section
const CalculatorSection = () => {
  const [values, setValues] = useState({ shower_minutes: 5, lights_hours: 4, ac_hours: 2, computer_hours: 3 });
  const [result, setResult] = useState(null);
  const calculateFootprint = async () => {
    try { const response = await axios.post(`${API}/calculate`, values); setResult(response.data); }
    catch (error) { console.error("Error:", error); }
  };
  useEffect(() => { const timer = setTimeout(calculateFootprint, 500); return () => clearTimeout(timer); }, [values]);

  return (
    <section id="calculator" className="py-24 section-burgundy" data-testid="calculator-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-mono text-[#f59e0b] tracking-widest uppercase mb-4 block">Herramienta Interactiva</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-heading">Calcula tu <span className="gradient-text-gold">Huella Diaria</span></h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-8">
            <div className="space-y-8">
              {[
                { key: "shower_minutes", label: "Tiempo de ducha", icon: ShowerHead, max: 20, unit: "min", color: "water" },
                { key: "lights_hours", label: "Luces encendidas", icon: Lightbulb, max: 12, unit: "hrs", color: "electricity" },
                { key: "ac_hours", label: "Aire acondicionado", icon: ThermometerSun, max: 10, unit: "hrs", color: "electricity" },
                { key: "computer_hours", label: "Computadora", icon: Monitor, max: 12, unit: "hrs", color: "electricity" }
              ].map((item) => (
                <div key={item.key}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`icon-container ${item.color} w-10 h-10`}><item.icon className="w-5 h-5" /></div>
                      <span className="font-medium text-heading">{item.label}</span>
                    </div>
                    <span className={`font-bold ${item.color === "water" ? "text-[#0ea5e9]" : "text-[#f59e0b]"}`}>{values[item.key]} {item.unit}</span>
                  </div>
                  <Slider value={[values[item.key]]} onValueChange={([val]) => setValues(v => ({ ...v, [item.key]: val }))} max={item.max} min={0} step={1} className="cursor-pointer" />
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {result && (
              <>
                <motion.div className="glass rounded-3xl p-6 border-l-4 border-[#0ea5e9]" whileHover={{ scale: 1.02 }}>
                  <div className="flex items-center gap-4 mb-4"><Droplets className="w-8 h-8 text-[#0ea5e9]" /><div><p className="text-body text-sm">Consumo de agua</p><p className="text-3xl font-bold text-[#0ea5e9]">{result.water_liters} L/día</p></div></div>
                  <p className="text-body text-sm">Costo mensual: <span className="text-heading font-medium">${result.water_cost_monthly} MXN</span></p>
                </motion.div>
                <motion.div className="glass rounded-3xl p-6 border-l-4 border-[#f59e0b]" whileHover={{ scale: 1.02 }}>
                  <div className="flex items-center gap-4 mb-4"><Zap className="w-8 h-8 text-[#f59e0b]" /><div><p className="text-body text-sm">Consumo de electricidad</p><p className="text-3xl font-bold text-[#f59e0b]">{result.electricity_kwh} kWh/día</p></div></div>
                  <p className="text-body text-sm">Costo mensual: <span className="text-heading font-medium">${result.electricity_cost_monthly} MXN</span></p>
                </motion.div>
                <motion.div className="glass rounded-3xl p-6 border-l-4 border-[#22c55e]" whileHover={{ scale: 1.02 }}>
                  <div className="flex items-center gap-4"><Leaf className="w-8 h-8 text-[#22c55e]" /><div><p className="text-body text-sm">Huella de carbono</p><p className="text-3xl font-bold text-[#22c55e]">{result.co2_kg} kg CO₂/día</p></div></div>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Quiz Section
const QuizSection = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const handleAnswer = (index) => { if (showResult) return; setSelectedAnswer(index); setShowResult(true); if (index === quizQuestions[currentQuestion].correct) setScore(s => s + 1); };
  const nextQuestion = () => { if (currentQuestion < quizQuestions.length - 1) { setCurrentQuestion(c => c + 1); setSelectedAnswer(null); setShowResult(false); } else { setQuizComplete(true); onQuizComplete(score + (selectedAnswer === quizQuestions[currentQuestion].correct ? 1 : 0), "Anónimo"); }};
  const resetQuiz = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setQuizComplete(false); };
  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <section id="quiz" className="py-24 bg-grid-gold" data-testid="quiz-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs font-mono text-gold tracking-widest uppercase mb-4 block">Pon a prueba tus conocimientos</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-heading">Quiz <span className="gradient-text-gold">GEA</span></h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass rounded-3xl p-6 md:p-8">
          {!quizComplete ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between text-sm text-body mb-2"><span>Pregunta {currentQuestion + 1} de {quizQuestions.length}</span><span className="text-gold">{score} correctas</span></div>
                <Progress value={progress} className="h-2" />
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-8 text-heading">{question.question}</h3>
              <div className="space-y-3 mb-8">
                {question.options.map((option, index) => (
                  <motion.button 
                    key={index} 
                    onClick={() => handleAnswer(index)} 
                    disabled={showResult}
                    whileHover={!showResult ? { scale: 1.02, x: 4 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    className={`quiz-option w-full text-left flex items-center gap-4 ${selectedAnswer === index ? "selected" : ""} ${showResult && index === question.correct ? "correct" : ""} ${showResult && selectedAnswer === index && index !== question.correct ? "incorrect" : ""}`}
                  >
                    <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center text-sm font-medium flex-shrink-0">{String.fromCharCode(65 + index)}</span>
                    <span className="flex-1 text-sm md:text-base">{option}</span>
                    {showResult && index === question.correct && <Check className="w-5 h-5 text-[#22c55e]" />}
                    {showResult && selectedAnswer === index && index !== question.correct && <X className="w-5 h-5 text-red-400" />}
                  </motion.button>
                ))}
              </div>
              <AnimatePresence>
                {showResult && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6">
                    <div className="bg-[#d4af37]/10 rounded-xl p-4 border border-[#d4af37]/20"><p className="text-body text-sm">{question.explanation}</p></div>
                  </motion.div>
                )}
              </AnimatePresence>
              {showResult && (<Button onClick={nextQuestion} className="btn-gold w-full flex items-center justify-center gap-2">{currentQuestion < quizQuestions.length - 1 ? "Siguiente" : "Ver resultados"}<ChevronRight className="w-5 h-5" /></Button>)}
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <motion.div 
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8b2545]/20 to-[#d4af37]/20 flex items-center justify-center mx-auto mb-6"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <Award className="w-12 h-12 text-[#d4af37]" />
              </motion.div>
              <h3 className="text-3xl font-bold mb-2 text-heading">{score} / {quizQuestions.length}</h3>
              <p className="text-body mb-2">{score >= 4 ? "¡Excelente! Eres un verdadero miembro de GEA." : score >= 3 ? "¡Muy bien! Sigue aprendiendo." : "¡Sigue intentando!"}</p>
              <p className="text-gold font-medium mb-8">{Math.round((score / quizQuestions.length) * 100)}% de aciertos</p>
              <Button onClick={resetQuiz} className="btn-outline">Intentar de nuevo</Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Reports Section (no delete for normal users, max 8 visible)
const ReportsSection = ({ reports, onAddReport, isAdmin, onDeleteReport }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("water_leak");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) { toast.error("Por favor completa todos los campos"); return; }
    setSubmitting(true);
    await onAddReport({ student_name: name, category, description });
    setName(""); setDescription("");
    setSubmitting(false);
  };

  const getCategoryInfo = (cat) => reportCategories.find(c => c.value === cat) || reportCategories[0];
  const visibleReports = showAll ? reports : reports.slice(0, MAX_VISIBLE);
  const hiddenCount = reports.length - MAX_VISIBLE;

  return (
    <section id="reportes" className="py-24 section-burgundy bg-grid-burgundy" data-testid="reports-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs font-mono text-accent tracking-widest uppercase mb-4 block">Sistema de Alertas</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-heading">
            Reporta un <span className="gradient-text-burgundy">Problema</span>
          </h2>
          <p className="text-body text-base md:text-lg max-w-2xl mx-auto">Ayúdanos a identificar problemas de agua y electricidad en el plantel</p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sticky top-24">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-2 text-heading"><Bell className="w-5 h-5 text-accent" />Nuevo Reporte</h3>
              <div className="space-y-4">
                <div><label className="text-sm text-body block mb-2">Tu nombre *</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: María García" className="input-themed" required data-testid="report-name-input" /></div>
                <div>
                  <label className="text-sm text-body block mb-2">Tipo de reporte</label>
                  <div className="grid grid-cols-1 gap-2">
                    {reportCategories.map((cat) => (
                      <button key={cat.value} type="button" onClick={() => setCategory(cat.value)}
                        className={`py-3 px-4 rounded-xl border transition-all flex items-center gap-3 ${category === cat.value 
                          ? cat.color === "water" ? "border-[#0ea5e9] bg-[#0ea5e9]/10 text-[#0ea5e9]" : cat.color === "electricity" ? "border-[#f59e0b] bg-[#f59e0b]/10 text-[#f59e0b]" : "border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]"
                          : "border-themed text-body"}`}>
                        <cat.icon className="w-5 h-5" /><span className="text-sm">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div><label className="text-sm text-body block mb-2">Descripción *</label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe el problema o sugerencia..." className="input-themed min-h-[100px]" required data-testid="report-description-input" /></div>
                <Button type="submit" disabled={submitting} className="btn-burgundy w-full flex items-center justify-center gap-2" data-testid="report-submit-btn"><Bell className="w-5 h-5" />{submitting ? "Enviando..." : "Enviar Reporte"}</Button>
              </div>
            </form>
          </motion.div>
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {visibleReports.map((report, index) => {
                  const catInfo = getCategoryInfo(report.category);
                  return (
                    <motion.div key={report.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: index * 0.05 }} className={`report-card ${report.category}`}>
                      <div className="flex items-start gap-3">
                        <div className={`icon-container ${catInfo.color} w-10 h-10 flex-shrink-0`}><catInfo.icon className="w-5 h-5" /></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-heading truncate">{report.student_name}</p>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${catInfo.color === "water" ? "bg-[#0ea5e9]/10 text-[#0ea5e9]" : catInfo.color === "electricity" ? "bg-[#f59e0b]/10 text-[#f59e0b]" : "bg-[#22c55e]/10 text-[#22c55e]"}`}>{catInfo.label}</span>
                              {isAdmin && <button onClick={() => onDeleteReport(report.id)} className="text-red-400/50 hover:text-red-400 transition-colors p-1" data-testid={`delete-report-${report.id}`}><Trash2 className="w-3.5 h-3.5" /></button>}
                            </div>
                          </div>
                          <p className="text-body text-sm">{report.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {reports.length === 0 && (<div className="col-span-2 text-center py-12 text-muted"><MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" /><p>No hay reportes aún. Sé el primero en reportar.</p></div>)}
            </div>
            {!showAll && hiddenCount > 0 && (
              <motion.button onClick={() => setShowAll(true)} className="mt-4 mx-auto block text-accent hover:text-gold transition-colors text-sm font-medium" whileHover={{ scale: 1.05 }} data-testid="reports-show-more">
                +{hiddenCount} reportes más
              </motion.button>
            )}
            {showAll && reports.length > MAX_VISIBLE && (
              <motion.button onClick={() => setShowAll(false)} className="mt-4 mx-auto block text-accent hover:text-gold transition-colors text-sm font-medium" whileHover={{ scale: 1.05 }}>
                Mostrar menos
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Pledges Section (no delete for normal users, max 8 visible)
const PledgesSection = ({ pledges, onAddPledge, isAdmin, onDeletePledge }) => {
  const [name, setName] = useState("");
  const [commitment, setCommitment] = useState("");
  const [category, setCategory] = useState("water");
  const [submitting, setSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 8;
  const handleSubmit = async (e) => { e.preventDefault(); if (!name.trim() || !commitment.trim()) { toast.error("Por favor completa todos los campos"); return; } setSubmitting(true); await onAddPledge({ student_name: name, commitment, category }); setName(""); setCommitment(""); setSubmitting(false); };
  const visiblePledges = showAll ? pledges : pledges.slice(0, MAX_VISIBLE);
  const hiddenCount = pledges.length - MAX_VISIBLE;

  return (
    <section id="pledges" className="py-24 section-gold" data-testid="pledges-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs font-mono text-gold tracking-widest uppercase mb-4 block">Únete al movimiento</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-heading">Muro de <span className="gradient-text-gold">Compromisos</span></h2>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sticky top-24">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-2 text-heading"><Heart className="w-5 h-5 text-gold" />Tu compromiso</h3>
              <div className="space-y-4">
                <div><label className="text-sm text-body block mb-2">Tu nombre</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: María García" className="input-themed" data-testid="pledge-name-input" /></div>
                <div><label className="text-sm text-body block mb-2">Me comprometo a...</label><Input value={commitment} onChange={(e) => setCommitment(e.target.value)} placeholder="Ej: Cerrar la llave mientras me lavo" className="input-themed" data-testid="pledge-commitment-input" /></div>
                <div>
                  <label className="text-sm text-body block mb-2">Categoría</label>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setCategory("water")} className={`flex-1 py-3 rounded-xl border transition-all ${category === "water" ? "border-[#0ea5e9] bg-[#0ea5e9]/10 text-[#0ea5e9]" : "border-themed text-body"}`}><Droplets className="w-5 h-5 mx-auto mb-1" /><span className="text-sm">Agua</span></button>
                    <button type="button" onClick={() => setCategory("electricity")} className={`flex-1 py-3 rounded-xl border transition-all ${category === "electricity" ? "border-[#f59e0b] bg-[#f59e0b]/10 text-[#f59e0b]" : "border-themed text-body"}`}><Zap className="w-5 h-5 mx-auto mb-1" /><span className="text-sm">Electricidad</span></button>
                  </div>
                </div>
                <Button type="submit" disabled={submitting} className="btn-gold w-full flex items-center justify-center gap-2" data-testid="pledge-submit-btn"><Send className="w-5 h-5" />{submitting ? "Enviando..." : "Publicar compromiso"}</Button>
              </div>
            </form>
          </motion.div>
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {visiblePledges.map((pledge, index) => (
                  <motion.div key={pledge.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: index * 0.05 }} className={`pledge-card ${pledge.category}`}>
                    <div className="flex items-start gap-3">
                      <div className={`icon-container ${pledge.category} w-10 h-10 flex-shrink-0`}>{pledge.category === "water" ? <Droplets className="w-5 h-5" /> : <Zap className="w-5 h-5" />}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-heading mb-1 truncate">{pledge.student_name}</p>
                          {isAdmin && <button onClick={() => onDeletePledge(pledge.id)} className="text-red-400/50 hover:text-red-400 transition-colors p-1 flex-shrink-0" data-testid={`delete-pledge-${pledge.id}`}><Trash2 className="w-3.5 h-3.5" /></button>}
                        </div>
                        <p className="text-body text-sm">"{pledge.commitment}"</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {pledges.length === 0 && (<div className="col-span-2 text-center py-12 text-muted"><Target className="w-12 h-12 mx-auto mb-4 opacity-50" /><p>Sé el primero en hacer un compromiso</p></div>)}
            </div>
            {!showAll && hiddenCount > 0 && (
              <motion.button onClick={() => setShowAll(true)} className="mt-4 mx-auto block text-accent hover:text-gold transition-colors text-sm font-medium" whileHover={{ scale: 1.05 }} data-testid="pledges-show-more">
                +{hiddenCount} compromisos más
              </motion.button>
            )}
            {showAll && pledges.length > MAX_VISIBLE && (
              <motion.button onClick={() => setShowAll(false)} className="mt-4 mx-auto block text-accent hover:text-gold transition-colors text-sm font-medium" whileHover={{ scale: 1.05 }}>
                Mostrar menos
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Alarm Modal
const TEACHER_PHONE = "526461327242";

const AlarmModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [problem, setProblem] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !location.trim() || !problem.trim()) { toast.error("Por favor completa todos los campos"); return; }
    setSubmitting(true);
    await onSubmit({ student_name: name, location, problem });
    setSubmitting(false);
    setSent(true);
    // Open WhatsApp with pre-written message
    const message = encodeURIComponent(`ALARMA EQUIPO GEA\n\nEstudiante: ${name}\nUbicacion: ${location}\nProblema: ${problem}\n\n(Enviado desde la pagina del Equipo GEA)`);
    window.open(`https://wa.me/${TEACHER_PHONE}?text=${message}`, "_blank");
  };

  const handleClose = () => {
    setName(""); setLocation(""); setProblem(""); setSent(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={handleClose}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass rounded-3xl p-6 md:p-8 w-full max-w-md relative z-10 border border-red-500/30" onClick={(e) => e.stopPropagation()}>
          <button onClick={handleClose} className="absolute top-4 right-4 text-body hover:text-heading"><X className="w-5 h-5" /></button>
          {!sent ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-red-400" /></div>
                <div><h3 className="text-xl font-bold text-heading">Alarma</h3><p className="text-body text-sm">Reporta una emergencia al profesor</p></div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="text-sm text-body block mb-2">Tu nombre *</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre completo" className="input-themed" required data-testid="alarm-name" /></div>
                <div><label className="text-sm text-body block mb-2">Donde estas *</label><Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ej: Baño del edificio B, Salon 201..." className="input-themed" required data-testid="alarm-location" /></div>
                <div><label className="text-sm text-body block mb-2">Cual es el problema *</label><Textarea value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Describe que esta pasando..." className="input-themed min-h-[80px]" required data-testid="alarm-problem" /></div>
                <Button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full transition-all" data-testid="alarm-submit">
                  <AlertTriangle className="w-5 h-5" />{submitting ? "Enviando..." : "Enviar Alarma"}
                </Button>
                <p className="text-xs text-muted text-center">Se abrira WhatsApp para enviar el mensaje a tu profesor(a)</p>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-[#22c55e]" /></div>
              <h3 className="text-xl font-bold text-heading mb-2">Alarma registrada</h3>
              <p className="text-body text-sm mb-4">Se abrio WhatsApp para enviar el mensaje. Asegurate de darle "enviar" en WhatsApp.</p>
              <Button onClick={handleClose} className="btn-outline">Cerrar</Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Alarm Floating Button
const AlarmButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    animate={{ boxShadow: ["0 0 15px rgba(239,68,68,0.3)", "0 0 30px rgba(239,68,68,0.5)", "0 0 15px rgba(239,68,68,0.3)"] }}
    transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
    data-testid="alarm-button"
    aria-label="Enviar alarma"
  >
    <AlertTriangle className="w-6 h-6" />
  </motion.button>
);

// Admin Modal
const AdminModal = ({ isOpen, onClose, onVerify }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    const success = await onVerify(password);
    setLoading(false);
    if (success) { setPassword(""); onClose(); }
    else { setError("Contraseña incorrecta"); }
  };

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass rounded-3xl p-6 md:p-8 w-full max-w-sm relative z-10" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-xl font-bold text-heading mb-2">Acceso Admin</h3>
          <p className="text-body text-sm mb-6">Ingresa la contraseña de administrador</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Contraseña" className="input-themed" required data-testid="admin-password" />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" disabled={loading} className="btn-gold w-full" data-testid="admin-submit">{loading ? "Verificando..." : "Entrar"}</Button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Footer
const Footer = ({ onAdminClick, isAdmin }) => {
  return (
    <footer className="py-12 footer-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a 
            href="https://www.cecytebc.edu.mx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            data-testid="footer-logo-link"
          >
            <img src={CECYTE_LOGO} alt="CECYTE BC" className="h-12 w-auto object-contain" />
            <div><span className="font-bold text-gold block">EQUIPO GEA</span><span className="text-xs text-accent">CECYTE BC Plantel Ensenada</span></div>
          </a>
          <p className="text-body text-sm text-center max-w-md">"Los jóvenes son actores presentes capaces de transformar su comunidad."</p>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-xs text-muted"><FileText className="w-4 h-4" />Marzo 2026</div>
            <button 
              onClick={onAdminClick}
              className={`text-xs font-medium transition-colors ${isAdmin ? "text-[#d4af37]" : "text-body hover:text-body"}`}
              data-testid="footer-credit"
            >
              Hecho por: SAGRAV {isAdmin && "(Admin)"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  const [pledges, setPledges] = useState([]);
  const [reports, setReports] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("gea-theme") || "dark");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAlarmModal, setShowAlarmModal] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("gea-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const fetchPledges = async () => { try { const response = await axios.get(`${API}/pledges`); setPledges(response.data); } catch (error) { console.error("Error:", error); }};
  const fetchReports = async () => { try { const response = await axios.get(`${API}/reports`); setReports(response.data); } catch (error) { console.error("Error:", error); }};
  
  const handleAddPledge = async (pledgeData) => { try { const response = await axios.post(`${API}/pledges`, pledgeData); setPledges(prev => [response.data, ...prev]); toast.success("¡Gracias por unirte al Equipo GEA!"); } catch (error) { toast.error("Error al guardar tu compromiso"); }};
  const handleAddReport = async (reportData) => { try { const response = await axios.post(`${API}/reports`, reportData); setReports(prev => [response.data, ...prev]); toast.success("¡Reporte enviado! Gracias por ayudar."); } catch (error) { toast.error("Error al enviar el reporte"); }};
  
  const handleDeletePledge = async (id) => { 
    try { await axios.delete(`${API}/pledges/${id}?password=SAGRAV-PJO-GEA`); setPledges(prev => prev.filter(p => p.id !== id)); toast.success("Compromiso eliminado"); } 
    catch (error) { toast.error("Error al eliminar"); }
  };
  const handleDeleteReport = async (id) => { 
    try { await axios.delete(`${API}/reports/${id}?password=SAGRAV-PJO-GEA`); setReports(prev => prev.filter(r => r.id !== id)); toast.success("Reporte eliminado"); } 
    catch (error) { toast.error("Error al eliminar"); }
  };
  
  const handleAlarm = async (alarmData) => { 
    try { await axios.post(`${API}/alarms`, alarmData); toast.success("Alarma registrada"); } 
    catch (error) { toast.error("Error al registrar la alarma"); }
  };

  const handleAdminVerify = async (password) => {
    try {
      await axios.post(`${API}/admin/verify`, { password });
      setIsAdmin(true);
      toast.success("Modo admin activado");
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleAdminClick = () => {
    if (isAdmin) { setIsAdmin(false); toast.info("Modo admin desactivado"); }
    else { setShowAdminModal(true); }
  };

  const handleQuizComplete = async (score, studentName) => { try { await axios.post(`${API}/quiz`, { student_name: studentName, score, total_questions: quizQuestions.length }); } catch (error) { console.error("Error:", error); }};

  useEffect(() => { fetchPledges(); fetchReports(); }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`App min-h-screen app-bg ${theme}`}>
        <div className="noise-overlay" />
        <Toaster position="top-center" richColors />
        <Navigation />
        <ThemeToggle />
        <AlarmButton onClick={() => setShowAlarmModal(true)} />
        <AlarmModal isOpen={showAlarmModal} onClose={() => setShowAlarmModal(false)} onSubmit={handleAlarm} />
        <AdminModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} onVerify={handleAdminVerify} />
        <HeroSection />
        <VideoSection />
        <ProyectoSection />
        <ProblematicaSection />
        <SolucionesSection />
        <CalculatorSection />
        <QuizSection onQuizComplete={handleQuizComplete} />
        <ReportsSection reports={reports} onAddReport={handleAddReport} isAdmin={isAdmin} onDeleteReport={handleDeleteReport} />
        <PledgesSection pledges={pledges} onAddPledge={handleAddPledge} isAdmin={isAdmin} onDeletePledge={handleDeletePledge} />
        <Footer onAdminClick={handleAdminClick} isAdmin={isAdmin} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
