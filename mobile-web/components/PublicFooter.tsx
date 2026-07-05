import Image from "next/image";

export default function PublicFooter() {
  return (
    <footer className="mt-8 px-4 pb-24 text-center">
      <div className="mx-auto mb-3 h-px w-16 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      <div className="mx-auto mb-2 flex justify-center">
        <Image src="/logo.png" alt="" aria-hidden width={28} height={28} />
      </div>
      <p className="text-xs text-white/60">
        © 2026 Institut Karate-Do Indonesia (INKAI)
      </p>
      <p className="text-[11px] text-white/35">All Rights Reserved</p>
      <a
        href="https://inkai.or.id"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-xs text-sky-400 hover:underline"
      >
        inkai.or.id
      </a>
    </footer>
  );
}
