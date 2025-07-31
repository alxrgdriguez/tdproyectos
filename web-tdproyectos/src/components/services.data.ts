export type Service = {
  title: string;
  desc: string;
  color: string;
  icon: string;
};

export const services: Service[] = [
  {
    title: "Proyectos Técnicos",
    desc: "Viviendas, naves, locales, reformas, instalaciones eléctricas y piscinas.",
    color: "bg-blue-500",
    icon: "lucide:home",
  },
  {
    title: "Legalización y Certificados",
    desc: "Legalizaciones, certificados de solidez, eficiencia y acústica.",
    color: "bg-orange-500",
    icon: "lucide:file-check",
  },
  {
    title: "Gestión Catastral",
    desc: "Cambios de uso, mediciones, cultivos, trámites y actualizaciones.",
    color: "bg-yellow-500",
    icon: "lucide:map",
  },
  {
    title: "Tasaciones y Valoraciones",
    desc: "Peritaciones judiciales, informes técnicos y valoraciones económicas.",
    color: "bg-red-500",
    icon: "lucide:scale",
  },
  {
    title: "Eficiencia Energética",
    desc: "Certificados, simulaciones, auditorías y mejoras técnicas.",
    color: "bg-emerald-500",
    icon: "lucide:bolt",
  },
  {
    title: "Modelado 3D & Tours",
    desc: "Infografías hiperrealistas y recorridos virtuales interactivos.",
    color: "bg-purple-500",
    icon: "lucide:camera",
  },
];
