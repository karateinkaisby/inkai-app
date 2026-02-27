/**
 * Loading UI untuk halaman Siswa (modul berat: WilayahProvider, StudentContext, list).
 */
export default function SiswaLoading() {
  return (
    <div className="grid grid-cols-12 gap-4 h-full animate-pulse">
      <div className="col-span-2 rounded-xl bg-slate-800/60 border border-slate-700/50 min-h-[200px]" />
      <div className="col-span-6 flex flex-col gap-4">
        <div className="h-12 rounded-lg bg-slate-800/60" />
        <div className="h-10 rounded-lg bg-slate-800/50 w-1/3" />
        <div className="flex-1 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 rounded-lg bg-slate-800/50" />
          ))}
        </div>
      </div>
      <div className="col-span-4 space-y-4">
        <div className="rounded-xl bg-slate-800/60 border border-slate-700/50 min-h-[280px]" />
        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 min-h-[120px]" />
      </div>
    </div>
  );
}
