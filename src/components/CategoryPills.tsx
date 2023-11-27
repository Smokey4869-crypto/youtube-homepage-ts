import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) => {
  const [translatePos, setTranslatePos] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) return

    const observer = new ResizeObserver(entries => {
      const container = entries[0]?.target

      setIsLeftVisible(translatePos > 0)
      setIsRightVisible(translatePos + container.clientWidth < container.scrollWidth)
    })

    observer.observe(containerRef.current)
  }, [categories, translatePos])

  return (
    <div ref={containerRef} className="overflow-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(${-translatePos}px) ` }}
      >
        {categories.map((item) => (
          <Button
            key={item}
            onClick={() => onSelect(item)}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
            variant={`${selectedCategory === item ? "dark" : "default"}`}
          >
            <span>{item}</span>
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslatePos((prevPos) => {
                const newPos = prevPos - TRANSLATE_AMOUNT;
                if (newPos <= 0) {
                  return 0;
                } else {
                  return newPos;
                }
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}

      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslatePos((prevPos) => {
                if (containerRef.current == null) return prevPos;
                const newPos = prevPos + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;

                if (newPos + width >= edge) {
                  return edge - width;
                } else {
                  return newPos;
                }
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
