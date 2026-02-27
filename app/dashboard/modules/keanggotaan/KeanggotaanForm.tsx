"use client";
import { Anggota } from "./types";

export default function KeanggotaanForm({
  initial,
  onSubmit,
}: {
  initial?: Anggota;
  onSubmit: (data: Anggota) => void;
}) {
  return <button onClick={() => onSubmit(initial!)}>Simpan (dummy)</button>;
}
