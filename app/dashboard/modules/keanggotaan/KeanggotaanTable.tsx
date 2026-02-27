import { Keanggotaan } from "./types";

export default function KeanggotaanTable({ data }: { data: Keanggotaan[] }) {
  return (
    <table className="w-full text-sm border">
      <thead>
        <tr className="border-b">
          <th>Nama</th>
          <th>Ranting</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((a) => (
          <tr key={a.id} className="border-b">
            <td>{a.nama}</td>
            <td>{a.rantingNama}</td>
            <td>{a.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
