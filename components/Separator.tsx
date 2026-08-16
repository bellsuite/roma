export default function Separator() {
  return (
    <div className="py-15 bg-bianco px-padding-global">
      <div className="max-w-container-large mx-auto flex items-center justify-center gap-3">
        {/* Left Decoration */}
        <img src="/decor.svg" alt="Decoration Left" className="w-12 h-auto text-oro" />
        
        {/* Two Gold Lines */}
        <div className="flex-1 flex flex-col gap-[4px]">
          <div className="w-full h-[1px] bg-oro"></div>
          <div className="w-full h-[1px] bg-oro"></div>
        </div>
        
        {/* Right Decoration (Flipped) */}
        <img src="/decor.svg" alt="Decoration Right" className="w-12 h-auto transform scale-x-[-1] text-oro" />
      </div>
    </div>
  );
}
