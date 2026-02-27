"use client";

const ACTIONS = ["read", "create", "update", "delete"] as const;
type Action = (typeof ACTIONS)[number];

type PermissionMap = Record<string, Partial<Record<Action, boolean>>>;

interface PermissionToolbarProps {
  permissions: PermissionMap;
  setPermissions: (
    p: PermissionMap | ((prev: PermissionMap) => PermissionMap),
  ) => void;
}

export default function PermissionToolbar({
  permissions,
  setPermissions,
}: PermissionToolbarProps) {
  /* ===============================
   * CHECK STATUS (ALL TRUE?)
   * =============================== */
  const isAllChecked = (action: Action) => {
    const scopes = Object.keys(permissions);
    if (scopes.length === 0) return false;

    return scopes.every((scope) => permissions?.[scope]?.[action]);
  };

  /* ===============================
   * TOGGLE BULK
   * =============================== */
  const toggleAll = (action: Action) => {
    setPermissions((prev) => {
      const next: PermissionMap = {};
      const checked = isAllChecked(action);

      Object.keys(prev).forEach((scope) => {
        next[scope] = {
          ...prev[scope],
          [action]: !checked,
        };
      });

      return next;
    });
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 rounded border border-white/10 bg-white/5">
      {ACTIONS.map((action) => {
        const active = isAllChecked(action);

        return (
          <button
            key={action}
            type="button"
            onClick={() => toggleAll(action)}
            className={[
              "px-3 py-1 text-xs rounded transition",
              active
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20",
            ].join(" ")}
          >
            {action.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
