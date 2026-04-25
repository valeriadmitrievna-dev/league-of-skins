/* eslint-disable react-hooks/purity */
import { type FC, type PropsWithChildren } from "react";

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            }}
          ></div>
        ))}
      </div>
      <div className='z-1'>{children}</div>
    </>
  );
};

export default ThemeProvider;
