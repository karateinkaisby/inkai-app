import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-2">404</h1>
      <p className="text-gray-400 mb-6">Halaman tidak ditemukan.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium"
      >
        Kembali ke beranda
      </Link>
    </div>
  );
}
