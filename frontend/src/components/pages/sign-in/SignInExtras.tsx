export function SignInExtras() {
  return (
    <div className="flex items-center justify-between text-xs text-text-contrast/85">
      <label className="flex items-center gap-2">
        <input type="checkbox" className="h-4 w-4 rounded border-text-contrast/70 text-primary-1" /> Remember me
      </label>
      <a className="text-text-contrast hover:underline" href="#">
        Forgot?
      </a>
    </div>
  );
}
