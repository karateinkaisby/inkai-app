"use client";

import BlockInput from "./BlockInput";
import BlockSelect from "./BlockSelect";
import { ProfileData } from "../hooks/useProfileData";

export type WilayahOption = { label: string; value: string };

type Props = {
  profile: ProfileData | null;
  update: <K extends keyof ProfileData>(
    field: K,
    value: ProfileData[K],
  ) => void;
  step: number;
  errors: Record<string, boolean>;
  provinceOptions: WilayahOption[];
  regencyOptions: WilayahOption[];
  districtOptions: WilayahOption[];
  villageOptions: WilayahOption[];
  provincesLoading?: boolean;
  regenciesLoading?: boolean;
  districtsLoading?: boolean;
  villagesLoading?: boolean;
};

export default function ProfileFormRight({
  profile,
  update,
  step,
  errors,
  provinceOptions,
  regencyOptions,
  districtOptions,
  villageOptions,
  provincesLoading = false,
  regenciesLoading = false,
  districtsLoading = false,
  villagesLoading = false,
}: Props) {
  if (step !== 2) return null;
  if (!profile) return null;

  return (
    <div className="space-y-4">
      <BlockInput
        label="Alamat Lengkap"
        value={profile.alamat ?? ""}
        onChange={(v) => update("alamat", v)}
        error={errors?.alamat}
        dataField="alamat"
      />

      <BlockSelect
        label="Provinsi"
        value={profile.provinceId}
        options={provinceOptions}
        placeholder={provincesLoading ? "Memuat provinsi..." : "Pilih..."}
        disabled={provincesLoading}
        error={errors?.provinceId}
        onChange={(v) => {
          update("provinceId", v);
          update("regencyId", "");
          update("districtId", "");
          update("villageId", "");
        }}
      />

      <BlockSelect
        label="Kabupaten / Kota"
        value={profile.regencyId}
        options={regencyOptions}
        placeholder={regenciesLoading ? "Memuat kabupaten..." : "Pilih..."}
        disabled={!profile.provinceId || regenciesLoading}
        error={errors?.regencyId}
        onChange={(v) => {
          update("regencyId", v);
          update("districtId", "");
          update("villageId", "");
        }}
      />

      <BlockSelect
        label="Kecamatan"
        value={profile.districtId}
        options={districtOptions}
        placeholder={districtsLoading ? "Memuat kecamatan..." : "Pilih..."}
        disabled={!profile.regencyId || districtsLoading}
        error={errors?.districtId}
        onChange={(v) => {
          update("districtId", v);
          update("villageId", "");
        }}
      />

      <BlockSelect
        label="Kelurahan"
        value={profile.villageId}
        options={villageOptions}
        placeholder={villagesLoading ? "Memuat kelurahan..." : "Pilih..."}
        disabled={!profile.districtId || villagesLoading}
        error={errors?.villageId}
        onChange={(v) => update("villageId", v)}
      />
    </div>
  );
}
