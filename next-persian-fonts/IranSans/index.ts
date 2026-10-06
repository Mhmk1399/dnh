import localFont from "next/font/local";

export const iranSans = localFont({
  src: [
    {
      path: "../IranSans/IRANSansWeb(FaNum)_UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../IranSans/IRANSansWeb(FaNum)_Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../IranSans/IRANSansWeb(FaNum).woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../IranSans/IRANSansWeb(FaNum)_Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../IranSans/IRANSansWeb(FaNum)_Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../IranSans/IRANSansWeb(FaNum)_Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../IranSans/IRANSansWeb(FaNum)_Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../IranSans/IRANSansWeb(FaNum)_Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iran-sans",
  display: "swap",
});
