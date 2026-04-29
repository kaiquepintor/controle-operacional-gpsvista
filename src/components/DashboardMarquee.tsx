import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

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
  // duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative mb-10 glass-card rounded-2xl overflow-hidden mask-fade-x"
    >
      {/* Live label */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur border border-border">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-foreground font-bold">
          Ao vivo
        </span>
      </div>

      <div className="flex animate-marquee py-4 px-4 gap-4 w-max">
        {loop.map((d, idx) => {
          const Icon = d.i;
          return (
            <button
              key={`${d.t}-${idx}`}
              onClick={() => onSelect({ url: d.u, title: d.t })}
              className="group relative shrink-0 w-[360px] h-[200px] rounded-xl overflow-hidden ring-1 ring-white/10 hover:ring-white/40 transition-all hover:scale-[1.02]"
              style={{
                boxShadow: `0 10px 40px -15px ${d.accent}`,
              }}
            >
              {/* Live BI iframe preview */}
              <div className="absolute inset-0 bg-background">
                <iframe
                  src={d.u}
                  title={d.t}
                  loading="lazy"
                  className="absolute top-0 left-0 origin-top-left pointer-events-none"
                  style={{
                    width: "1280px",
                    height: "720px",
                    transform: "scale(0.28)",
                    border: 0,
                  }}
                />
              </div>

              {/* Color overlay accent */}
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${d.accent}, transparent 60%)`,
                }}
              />

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background via-background/90 to-transparent flex items-center gap-2">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ring-1 ring-white/15"
                  style={{
                    background: `linear-gradient(135deg, ${d.accent}, transparent)`,
                  }}
                >
                  <Icon className="w-3.5 h-3.5 text-foreground" strokeWidth={2.5} />
                </span>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground truncate">
                    {d.t}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {d.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
