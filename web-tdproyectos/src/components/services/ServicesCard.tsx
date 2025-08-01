import { Icon } from "@iconify-icon/react";
import type { Service } from "./services.data.ts";

type Props = {
  services: Service;
};

export default function ServicesCard({ services }: Props) {
  return (
    <div
      className="group relative bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl
                 hover:shadow-blue-300/30 transition-all duration-300 hover:scale-[1.03] border border-white/20 flex flex-col items-center"
    >
      <div
        className={`w-16 h-16 mb-6 rounded-xl flex items-center justify-center text-white text-2xl shadow-md ${services.color}`}
      >
        <Icon icon={services.icon} className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:underline decoration-2 text-center">
        {services.title}
      </h3>
      <p className="text-gray-700 text-base leading-relaxed text-center">
        {services.desc}
      </p>
    </div>
  );
}
