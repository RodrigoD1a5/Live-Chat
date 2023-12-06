import clsx from "clsx";

export function Logo({ size }: { size?: "small" | "big" }) {
  return (
    <h1
      className={clsx(
        "before:w-30 bg-gradient-to-r from-lightBlue to-lightPurple bg-clip-text font-bold text-transparent",
        {
          "text-5xl": size === "big",
          "text-4xl": !size,
          "text-3xl": size === "small",
        },
      )}
    >
      Live Chat
    </h1>
  );
}
