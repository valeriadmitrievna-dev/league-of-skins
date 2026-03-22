import { useRef } from "react";
import { useIntersection } from "react-use";

export const useInViewport = <RefElement extends HTMLElement = HTMLElement>() => {
  const ref = useRef<RefElement>(null!);
  const intersection = useIntersection(ref, { threshold: 0.5 });

  return { ref, visible: intersection?.isIntersecting ?? false };
};
