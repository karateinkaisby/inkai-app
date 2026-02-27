/**
 * Loading UI untuk halaman Keanggotaan (modul dengan tabs + data anggota).
 */
export default function KeanggotaanLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 w-24 rounded-md bg-slate-800/60" />
        ))}
      </div>
      <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 min-h-[320px]" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-lg bg-slate-800/50" />
        ))}
      </div>
    </div>
  );
}
