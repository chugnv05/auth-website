import gifs from "@/shared/assets/gifs";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <img src={gifs.loading} className="size-24 object-contain" alt="Loading..." />
    </div>
  );
}
