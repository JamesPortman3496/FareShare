export function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-[-12%] top-[-18%] h-[320px] w-[320px] rounded-full bg-warning/45 blur-3xl" />
      <div className="absolute right-[-10%] bottom-[-20%] h-[340px] w-[340px] rounded-full bg-danger/30 blur-3xl" />
    </div>
  );
}
