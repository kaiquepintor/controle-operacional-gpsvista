import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

type Item = {
  t: string;
  desc: string;
  i: LucideIcon;
  accent: string;
  u: string;
};

interface DashboardMarqueeProps {
  items: Item[];
  onSelect: (item: { url: string; title: string }) => void;
}

export function DashboardMarquee({ items, onSelect }: DashboardMarqueeProps) {
  // duplicate the array so the marquee loop is seamless
  const loop = [...items, ...items];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative mb-10 glass-card rounded-full overflow-hidden mask-fade-x"
    >
      {/* Live label */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center gap-2 px-4 bg-gradient-to-r from-background via-background to-transparent pr-8">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-foreground font-bold">
          Ao vivo
        </span>
      </div>

      <div className="flex animate-marquee py-3 pl-32 pr-8 w-max">
        {loop.map((d, idx) => {
          const Icon = d.i;
          return (
            <button
              key={`${d.t}-${idx}`}
              onClick={() => onSelect({ url: d.u, title: d.t })}
              className="group flex items-center gap-3 px-5 mx-1 rounded-full hover:bg-white/5 transition-colors shrink-0"
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ring-1 ring-white/10 group-hover:ring-white/30 transition"
                style={{
                  background: `linear-gradient(135deg, ${d.accent}, transparent)`,
                }}
              >
                <Icon className="w-3.5 h-3.5 text-foreground" strokeWidth={2.5} />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-foreground whitespace-nowrap">
                {d.t}
              </span>
              <span className="text-[11px] text-muted-foreground whitespace-nowrap max-w-[260px] truncate">
                {d.desc}
              </span>
              <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 transition" />
              <span className="w-1 h-1 rounded-full bg-border ml-2" />
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
