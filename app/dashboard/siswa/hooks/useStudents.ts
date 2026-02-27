import { useEffect, useState } from "react";
import { Student } from "../types/student";
import { fetchStudents } from "../services/studentService";

export function useStudents() {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
