import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
export default function CarouselButton({ onClick, direction }) {
    const positionClasses = direction === "left" ? "left-0" : "right-0";
    const Icon = direction === "left" ? FaArrowLeft : FaArrowRight;
  
    return (
      <button
        onClick={onClick}
        className={`absolute mx-3 ${positionClasses} top-1/2 transform -translate-y-1/2
         bg-gray-800 text-white p-2 rounded-full`}
      >
        <Icon />
      </button>
    );
  }