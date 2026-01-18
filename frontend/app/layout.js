import { Poppins } from "next/font/google"
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";



export const metadata = {
  title: "BuyCart | Shop Smarter, Buy Faster",
  description:
    "BuyCart is your one-stop ecommerce platform to discover, compare, and buy products at the best prices with a seamless shopping experience.",
  icons: {
    icon: "/assets/images/favicon/favicon.png",
    shortcut: "/assets/images/favicon/favicon/favicon.ico",
    apple: "/assets/images/favicon/favicon/apple-touch-icon.png",
  },
};


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--Poppins",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={""}>
        <LenisProvider>
          <Navbar></Navbar>
          {children}</LenisProvider>
      </body>
    </html>
  );
}
