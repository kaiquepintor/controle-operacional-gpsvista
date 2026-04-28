import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  accent: string;
  onClick: () => void;
}

export function DashboardCard({ title, description, icon: Icon, index, accent, onClick }: Props) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-500 hover:border-brand/40 hover:shadow-[0_20px_60px_-25px_var(--brand)]"
    >
      {/* gradient hover glow */}
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-60 blur-3xl transition-opacity duration-700"
        style={{ background: accent }}
      />
      {/* corner index */}
      <span className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground tracking-wider">
        0{index + 1}
      </span>

      <div className="relative flex flex-col gap-5 h-full">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border border-border bg-surface-strong group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
          style={{ boxShadow: `0 0 30px -8px ${accent}` }}
        >
          <Icon className="w-6 h-6 text-foreground" strokeWidth={1.6} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold tracking-tight mb-1 text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground group-hover:text-brand transition-colors">
            Abrir painel
          </span>
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-brand group-hover:bg-brand transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-foreground group-hover:-rotate-12 transition-transform" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
