import localFont from "next/font/local";

export const sfProDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
});
