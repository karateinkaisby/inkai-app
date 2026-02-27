/**
 * Loading UI saat navigasi antar menu sidebar.
 * Menampilkan skeleton sehingga pengguna langsung dapat feedback, bukan layar kosong.
 */
export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header skeleton */}
      <div className="h-8 w-48 rounded-lg bg-slate-800/80" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-slate-800/60 border border-slate-700/50"
          />
        ))}
      </div>
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-slate-800/60" />
        <div className="grid gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-slate-800/50" />
          ))}
        </div>
      </div>
    </div>
  );
}
