export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            required
            {...props}
            className="placeholder:text-darkGray/50 border-darkGray/10 rounded-md border px-4 py-2 outline-none"
        />
    );
}