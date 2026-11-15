import Image from "next/image";

/** Laptop mockup drawn in CSS; the screenshot fills the 16:10 screen, anchored to the top. */
export function Laptop({
  src,
  alt,
  sizes = "(max-width: 768px) 90vw, 720px",
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      {/* lid */}
      <div className="relative mx-auto w-[88%] rounded-t-[14px] border border-black/40 bg-[#0d0d0f] p-[1.6%] pb-[2.2%] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
        <span className="absolute top-[0.7%] left-1/2 h-[0.6%] min-h-[3px] w-[0.6%] min-w-[3px] -translate-x-1/2 rounded-full bg-white/20" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-[#1b1b1f]">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        </div>
      </div>
      {/* base */}
      <div className="relative mx-auto h-[10px] w-full rounded-b-[10px] bg-gradient-to-b from-[#d6d6db] to-[#9a9aa1] shadow-[0_8px_14px_-6px_rgba(0,0,0,0.45)] sm:h-[14px] dark:from-[#4a4a50] dark:to-[#2a2a2f]">
        <span className="absolute top-0 left-1/2 h-[45%] w-[14%] -translate-x-1/2 rounded-b-md bg-black/15" />
      </div>
    </div>
  );
}

/** Phone mockup drawn in CSS; 9:19.5 screen with a dynamic-island notch. */
export function Phone({
  src,
  alt,
  sizes = "220px",
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[18%/8.5%] border border-black/50 bg-[#0d0d0f] p-[3.5%] shadow-[0_24px_40px_-14px_rgba(0,0,0,0.65)] ring-1 ring-white/10 ${className}`}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[14%/6.5%] bg-[#1b1b1f]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        <span className="absolute top-[1.6%] left-1/2 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

/** Laptop with the phone overlapping its lower-right corner. */
export function DeviceShowcase({
  desktop,
  mobile,
  name,
  priority,
  laptopSizes,
  className = "",
}: {
  desktop: string;
  mobile: string;
  name: string;
  priority?: boolean;
  laptopSizes?: string;
  className?: string;
}) {
  return (
    <div className={`relative pr-[11%] pb-[6%] ${className}`}>
      <Laptop src={desktop} alt={`${name} on desktop`} priority={priority} sizes={laptopSizes} />
      <div className="absolute right-0 bottom-0 w-[24%]">
        <Phone src={mobile} alt={`${name} on mobile`} priority={priority} />
      </div>
    </div>
  );
}
