import type { FC } from "react";

interface ChromaCircleProps {
  colors: string[];
}

const ChromaCircle: FC<ChromaCircleProps> = ({ colors }) => {
  colors = [...new Set(colors)];

  return (
    <div
      className="w-8 h-8 cursor-pointer border-2 rounded-full overflow-hidden flex gap-px rotate-45"
      style={{ background: colors.length > 1 ? "transparent" : colors[0] }}
    >
      {colors.length > 1 && (
        <>
          <div className="w-[50%]" style={{ background: colors[0] }} />
          <div className="w-[50%]" style={{ background: colors[1] }} />
        </>
      )}
    </div>
  );
};

export default ChromaCircle;
