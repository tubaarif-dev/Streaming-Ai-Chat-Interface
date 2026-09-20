interface StatusBadgeProps {
  status: "Ready" | "Pending" | "Error";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isReady = status === "Ready";
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
      isReady 
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isReady ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
      {status}
    </span>
  );
}
