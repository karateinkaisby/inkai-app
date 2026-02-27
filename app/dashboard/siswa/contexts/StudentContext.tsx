"use client";

import { createContext, useContext, useState } from "react";
import { Student } from "../types/student";
import { useStudents } from "../hooks/useStudents";

type StudentContextType = {
  students: Student[];
  loading: boolean;

  selectedStudent: Student | null;
  selectStudent: (student: Student) => void;
};

const StudentContext = createContext<StudentContextType | null>(null);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const { data, loading } = useStudents();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <StudentContext.Provider
      value={{
        students: data,
        loading,
        selectedStudent,
        selectStudent: setSelectedStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  const ctx = useContext(StudentContext);
  if (!ctx)
    throw new Error("useStudentContext must be used inside StudentProvider");
  return ctx;
}
