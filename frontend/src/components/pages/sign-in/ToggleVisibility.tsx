type ToggleVisibilityProps = {
  pressed: boolean;
  onToggle: () => void;
  ariaLabel: string;
};

export function ToggleVisibility({ pressed, onToggle, ariaLabel }: ToggleVisibilityProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      className="flex h-8 w-8 items-center justify-center rounded-full text-text-3 transition hover:text-primary-1"
    >
      {pressed ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
    </button>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.9 4.2A10.25 10.25 0 0 1 12 4c7 0 11 8 11 8a17.7 17.7 0 0 1-3.07 4.17" />
      <path d="M6.61 6.61C3.81 8.45 1.73 12 1.73 12A17.72 17.72 0 0 0 6.62 17.4" />
      <path d="M12 15a3 3 0 0 0 3-3" />
      <path d="M9 9a3 3 0 0 0 0 4.24" />
      <path d="m1 1 22 22" />
    </svg>
  );
}
