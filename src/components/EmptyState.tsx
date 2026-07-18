import { RiShoppingBag3Line } from "react-icons/ri";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onClick?: () => void;
}

export default function EmptyState({
  title,
  description,
  icon,
  buttonText,
  onClick,
}: EmptyStateProps) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      p-10
      flex
      flex-col
      items-center
      justify-center
      text-center
      "
    >
      <div
        className="
        w-16
        h-16
        rounded-full
        bg-purple-100
        flex
        items-center
        justify-center
        text-[#aa3bff]
        mb-5
        "
      >
        {icon || <RiShoppingBag3Line size={32} />}
      </div>

      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

      <p className="text-gray-500 mt-2 max-w-sm">{description}</p>

      {buttonText && (
        <button
          onClick={onClick}
          className="
          mt-6
          lg:text-[15px] md:text-[15px] text-[14px]
    lg:px-3 md:px-3 px-2 py-2
          rounded-xl
          bg-[#aa3bff]
          text-white
          font-semibold
          hover:bg-purple-700
          transition
          hover:cursor-pointer
          "
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
