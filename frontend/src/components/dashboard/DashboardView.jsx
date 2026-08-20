
import { FileText, Layers, LayoutGrid, TrendingUp, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import Stamp from "../shared/Stamp";
import { stats, yearFrequency } from "../../data/mockData";

const iconMap = { FileText, Layers, LayoutGrid, TrendingUp };

export default function DashboardView() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s) => {
          const Icon = iconMap[s.icon];
          return (
            <div key={s.label} className="bg-white border border-stone-200 rounded-lg p-4 sm:p-5 flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs uppercase tracking-wide text-stone-500 font-mono truncate">{s.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-stone-900 mt-2 font-mono">{s.value}</p>
              </div>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 mt-1 shrink-0" strokeWidth={1.75} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        <div className="lg:col-span-3 bg-white border border-stone-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-stone-900 text-sm sm:text-base">Repetition frequency — Deadlock (OS)</h3>
            <BarChart3 className="w-4 h-4 text-stone-400 shrink-0" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={yearFrequency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} allowDecimals={false} width={28} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e7e5e4", fontFamily: "monospace", fontSize: 12 }}
                cursor={{ fill: "#f5f5f4" }}
              />
              <Bar dataKey="count" fill="#0f766e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-stone-900 rounded-lg p-5 sm:p-6 text-stone-100">
          <h3 className="font-semibold mb-1 text-sm sm:text-base">Top pick this term</h3>
          <p className="text-xs text-stone-400 font-mono mb-5">Operating Systems · 10 marks</p>
          <div className="flex items-center gap-4">
            <Stamp confidence={92} size="md" />
            <p className="text-sm leading-relaxed text-stone-200">
              Explain deadlock and the necessary conditions for its occurrence.
            </p>
          </div>
          <div className="mt-5 pt-5 border-t border-stone-700 text-xs font-mono text-stone-400 flex flex-col xs:flex-row justify-between gap-1">
            <span>Seen 7× since 2019</span>
            <span>Repeats every ~2 yrs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
