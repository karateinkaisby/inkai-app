# AGENTS.md

## Cursor Cloud specific instructions

### Service overview

This is a **Next.js 15** (App Router) application for the INKAI (Indonesian National Karate Association) membership management system. The only external dependency is **Supabase** (PostgreSQL + Auth + Storage), which runs locally via `supabase start` (requires Docker).

### Running the dev environment

1. **Supabase local** must be running before the Next.js dev server. Start it with `sudo supabase start` from the workspace root. It uses Docker under the hood.
2. **Dev server**: `NEXT_DISABLE_TURBOPACK=1 npx next dev --port 3000` (or `npm run dev`). The `npm run dev` script uses `set NEXT_DISABLE_TURBOPACK=1` which is Windows-specific; on Linux, set the env var separately.
3. **Environment variables**: `.env.local` must contain `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Get these from `supabase status -o env` after starting Supabase locally.

### Key gotchas

- **Missing `profiles` table**: The Supabase migrations in `supabase/migrations/` reference `public.profiles`, but this table is not created by any migration — it was originally created via the Supabase dashboard. A bootstrap SQL script is needed to create base tables (`profiles`, `ranting`, `villages`, `menus`, `permissions`, etc.) before running migrations. See the schema setup in the dev environment setup process.
- **`npm run build` has a pre-existing type error** in `app/dashboard/modules/settings/components/ProfilePanel.tsx` (property `telepon` missing from `UserRow`). The dev server still works fine.
- **`npm run lint`** reports ~61 pre-existing errors (mostly `@typescript-eslint/no-explicit-any` and `no-img-element` warnings). These are in the existing codebase.
- **Test user creation**: In local Supabase, create users via the Auth API (`POST http://127.0.0.1:54321/auth/v1/signup`) and insert corresponding rows into `public.profiles` to match.

### Standard commands

See `CLAUDE.md` and `package.json` for standard dev/build/lint commands. Key scripts:
- `npm run dev` — dev server (port 3000)
- `npm run build` — production build
- `npm run lint` — ESLint
- `supabase start` / `supabase stop` — local Supabase
