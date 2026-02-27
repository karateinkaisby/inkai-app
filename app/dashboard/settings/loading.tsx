/**
 * Loading UI untuk halaman Settings (permissions, menu).
 */
export default function SettingsLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-40 rounded-lg bg-slate-800/60" />
      <div className="flex gap-4">
        <div className="h-10 w-48 rounded-lg bg-slate-800/50" />
        <div className="h-10 flex-1 rounded-lg bg-slate-800/40" />
      </div>
      <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 min-h-[300px]" />
    </div>
  );
}
