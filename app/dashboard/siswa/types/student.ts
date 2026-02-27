export type StudentStatus = "AKTIF" | "CUTI" | "NON_AKTIF";

export type Student = {
  id: string;
  name: string;
  belt: string;
  beltLevel: string;
  status: StudentStatus;
  dojo?: string;
  avatarUrl?: string;
};
