import type { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: IconType;
}

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-gray-100
      bg-white
      lg:p-6 md:p-6 p-4
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-purple-200
      hover:shadow-lg
    "
    >
      {/* subtle purple glow */}
      <div
        className="
        absolute
        -right-8
        -top-8
        h-24
        w-24
        rounded-full
        bg-purple-100/40
        blur-3xl
      "
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-2xl font-bold text-gray-900">{value}</h2>
        </div>

        <div className="h-14 w-14 rounded-2xl bg-purple-50 text-[#aa3bff] flex items-center justify-center">
          <Icon size={26} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="h-1 w-16 rounded-full bg-purple-100">
          <div className="h-1 w-8 rounded-full bg-[#aa3bff]" />
        </div>

        <span className="text-xs font-medium text-gray-400">Live</span>
      </div>
    </div>
  );
}
