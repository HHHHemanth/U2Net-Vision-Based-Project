import BlurText from "./BlurText";

export default function Header() {
  return (
    <div className="flex flex-wrap items-center bg-white px-4 lg:px-6 py-3 shadow-lg">

      <img
        src="/logo.png"
        alt="CMTI Logo"
        className="h-10 lg:h-12 w-auto"
      />

      <div className="ml-auto">

        <BlurText
          text="Branch Measurement System"
          delay={500}
          animateBy="words"
          direction="top"
          className="text-xl lg:text-3xl font-bold text-[#0071B6]"
        />

      </div>

    </div>
  );
}