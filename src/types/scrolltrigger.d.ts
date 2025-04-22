declare module 'gsap/ScrollTrigger' {
  export const ScrollTrigger: any;
  export default ScrollTrigger;
}

declare module "@gsap/react" {
  export const useGSAP: any;
}

import { ScrollTrigger } from "gsap/ScrollTrigger";

declare module "gsap/ScrollTrigger" {
  interface ScrollTrigger {
    getAll(): ScrollTrigger[];
  }
}
