# Audit: `app/dashboard/components/topbar-premium/profile`

**Date:** 2025-02-25  
**Scope:** Profile modal, address (wilayah) flow, and related API routes.

---

## Summary

- **Root cause of "Wilayah fetch failed" in console:** All four wilayah API routes contained a bogus `return Response.json(await res.json());` that runs before the real logic. The variable `res` is undefined, so every request threw and returned 500. The real `fetchWilayahJson` logic was never reached.
- **Fixes applied:** Removed the erroneous return from `app/api/wilayah/provinces`, `regencies`, `districts`, and `villages` route handlers. Cleaned unreachable code in `app/lib/wilayah-from-package.ts`.

---

## 1. Wilayah API routes (fixed)

| File | Issue | Fix |
|------|--------|-----|
| `app/api/wilayah/provinces/route.ts` | Stray top-level `return Response.json(await res.json());` (invalid, `res` undefined) | Removed line so `GET()` runs the try/catch with `fetchWilayahJson("provinces.json")`. |
| `app/api/wilayah/regencies/route.ts` | Early `return Response.json(await res.json());` inside `GET` before try block | Removed so try block runs and `fetchWilayahJson(\`regencies/${provinceId}.json\`)` is used. |
| `app/api/wilayah/districts/route.ts` | Same early return with undefined `res` | Removed so try block runs. |
| `app/api/wilayah/villages/route.ts` | Same early return with undefined `res` | Removed so try block runs. |

After these changes, wilayah endpoints should return JSON arrays from static/package/network fallbacks instead of 500, and the address dropdowns in the profile modal should populate.

---

## 2. Profile directory structure and flow

- **Entry:** `ProfileModal.tsx` – modal UI; `useProfileModal.tsx` – open/close state.
- **Data:** `hooks/useProfileData.ts` – profile state, load from `get_profile_self`, save via `save_profile` RPC; `hooks/useAutoSave.ts`, `useWizard.ts`, `useRantingOptions.ts`.
- **Wilayah (client):** `services/wilayahService.ts` – in-memory + localStorage cache, `getProvinces`, `getRegencies`, `getDistricts`, `getVillages` calling `/api/wilayah/*`.
- **UI:** `ProfileFormLeft` (step 1), `ProfileFormRight` (step 2 – address + wilayah dropdowns), `ProfileAvatar`, `WizardStepper`, `CompletionScore`, `ProfileButtons`.

---

## 3. Wilayah service (client)

- **File:** `profile/services/wilayahService.ts`
- **Behavior:** Cache key = full URL; on `!res.ok` it logs once per URL and returns `[]` (no cache on failure). AbortError is swallowed and returns `[]`.
- **Note:** The "Wilayah fetch failed" console messages came from `!res.ok` (line 84) because the API was returning 500. With the route fixes, those logs should stop and dropdowns should fill.

---

## 4. Duplicate wilayah loading (recommendation)

- **ProfileModal.tsx:** Uses four `useEffect`s to load provinces and then regencies/districts/villages based on `profile.provinceId`, `regencyId`, `districtId`; stores options in local state for step 3 resume and `resolveWilayah`.
- **ProfileFormRight.tsx:** Has its own four `useEffect`s and local state for the same wilayah options (step 2 form).
- **Effect:** When the modal is open, both components run their effects, so each wilayah API is called twice (e.g. two calls to `/api/wilayah/provinces`, then two per regency/district/village when IDs are set). No bug, but redundant.
- **Recommendation:** Single-source wilayah options in `ProfileModal` and pass `provinceOptions`, `regencyOptions`, `districtOptions`, `villageOptions` (and loading flags if needed) as props to `ProfileFormRight` so only one set of requests runs.

---

## 5. Other files reviewed

- **useProfileData.ts:** Load/save and Supabase RPC usage look correct. Avatar upload errors are caught and logged; profile save continues without updating avatar on upload failure.
- **ProfileFormLeft / ProfileFormRight:** Form wiring and validation (via `ProfileModal`’s schema) are consistent. Step 2 shows address + wilayah; step 3 shows resume with `resolveWilayah`/`resolveRanting`.
- **app/lib/wilayah-from-package.ts:** Unreachable code after `return` in `getRegenciesFromPackage` and `getDistrictsFromPackage` (and references to non-existent `regencyId`/`districtId`) was removed.

---

## 6. Checklist

- [x] Wilayah API routes fixed (provinces, regencies, districts, villages).
- [x] Unreachable code removed in `wilayah-from-package.ts`.
- [ ] Optional: Refactor so only `ProfileModal` fetches wilayah and passes options to `ProfileFormRight` to avoid duplicate requests.

After redeploy/restart, open the profile modal and go to "Informasi Alamat"; province/regency/district/village dropdowns should load and the previous "Wilayah fetch failed" console errors should stop.
