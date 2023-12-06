export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      required
      {...props}
      className="rounded-md border border-slate-300 px-4 py-2 outline-none placeholder:text-slate-400"
    />
  );
}
