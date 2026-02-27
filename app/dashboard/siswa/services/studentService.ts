import { Student } from "../types/student";

export async function fetchStudents(): Promise<Student[]> {
  // placeholder → ganti Supabase / API nanti
  return [
    // KYU (Putih → Coklat)
    {
      id: "IK-2023-001",
      name: "Budi Santoso",
      belt: "Putih",
      beltLevel: "Kyu 10",
      status: "AKTIF",
    },
    {
      id: "IK-2023-014",
      name: "Raka Pratama",
      belt: "Kuning",
      beltLevel: "Kyu 9",
      status: "AKTIF",
    },
    {
      id: "IK-2023-027",
      name: "Alif Maulana",
      belt: "Oranye",
      beltLevel: "Kyu 8",
      status: "AKTIF",
    },
    {
      id: "IK-2022-056",
      name: "Dimas Saputra",
      belt: "Hijau",
      beltLevel: "Kyu 6",
      status: "AKTIF",
    },
    {
      id: "IK-2022-118",
      name: "Ahmad Rizki",
      belt: "Hijau",
      beltLevel: "Kyu 6",
      status: "CUTI",
    },
    {
      id: "IK-2021-041",
      name: "Fajar Nugroho",
      belt: "Biru",
      beltLevel: "Kyu 5",
      status: "AKTIF",
    },
    {
      id: "IK-2021-077",
      name: "Yoga Prasetyo",
      belt: "Coklat",
      beltLevel: "Kyu 3",
      status: "AKTIF",
    },

    // DAN (Hitam 1–10)
    {
      id: "IK-2019-009",
      name: "Rizal Hidayat",
      belt: "Hitam",
      beltLevel: "Dan 1",
      status: "AKTIF",
    },
    {
      id: "IK-2017-003",
      name: "Agus Setiawan",
      belt: "Hitam",
      beltLevel: "Dan 2",
      status: "AKTIF",
    },
    {
      id: "IK-2015-001",
      name: "Eko Susanto",
      belt: "Hitam",
      beltLevel: "Dan 3",
      status: "AKTIF",
    },
    {
      id: "IK-2012-001",
      name: "Heri Kurniawan",
      belt: "Hitam",
      beltLevel: "Dan 5",
      status: "AKTIF",
    },
    {
      id: "IK-2008-001",
      name: "Sensei Dharma Tungga",
      belt: "Hitam",
      beltLevel: "Dan 7",
      status: "AKTIF",
    },
    {
      id: "IK-1998-001",
      name: "Grand Master Surya",
      belt: "Hitam",
      beltLevel: "Dan 10",
      status: "AKTIF",
    },
  ];
}
