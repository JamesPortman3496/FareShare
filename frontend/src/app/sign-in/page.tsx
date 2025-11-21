export default function SignInPage() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Login Page</h1>
        <p className="mt-2 text-sm text-text-3">
          Log in or create an account to keep your groups in sync.
        </p>
      </div>

      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-background-2 p-6 shadow-sm md:flex-row">
        <div className="flex flex-1 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-primary-1/15 via-background-3 to-background-1 p-6">
          <div className="text-center text-sm text-text-2">
            <div className="mb-2 text-base font-semibold text-text-1">Image</div>
            <p className="text-text-3">Add a welcome illustration or brand image here.</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col rounded-xl border border-border bg-background-1 p-6">
          <div className="text-center">
            <div className="text-sm font-semibold text-text-2">Login / Signup</div>
            <p className="text-xs text-text-3">Enter your details to continue.</p>
          </div>

          <form className="mt-6 flex flex-col gap-3">
            <label className="text-sm font-medium text-text-1">
              <span className="sr-only">Email</span>
              <input
                type="email"
                placeholder="Email"
                className="mt-1 w-full rounded-md border border-border bg-background-1 px-3 py-2 text-sm text-text-1 outline-none ring-primary-2 focus:ring-2"
              />
            </label>

            <label className="text-sm font-medium text-text-1">
              <span className="sr-only">Password</span>
              <input
                type="password"
                placeholder="Password"
                className="mt-1 w-full rounded-md border border-border bg-background-1 px-3 py-2 text-sm text-text-1 outline-none ring-primary-2 focus:ring-2"
              />
            </label>

            <button
              type="submit"
              className="mt-2 w-full rounded-md border border-border bg-background-2 px-4 py-2 text-sm font-semibold text-text-1 hover:bg-background-3"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
