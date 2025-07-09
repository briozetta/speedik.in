import { Poppins } from "next/font/google";
import "./globals.css";
import DynamicNavbar from "@/components/helpers/DynamicNavbar";
import SmoothScrollProvider from "@/components/helpers/SmoothScrollProvider";
import ClientWrapper from "@/redux/ClientWrapper";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "sonner";
import { Suspense } from "react";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-Poppins",
});

export const metadata = {
  title: 'Speedik - Buy and Sell Used Vehicles',
  description: "Speedik is your trusted platform for buying and selling used vehicles, including cars, bikes, and commercial vehicles. Find your perfect vehicle or sell effortlessly with our seamless interface. Start your journey today!",
  openGraph: {
    title: 'Speedik - Used Vehicle Marketplace',
    description: "Explore Speedik for the best deals on used cars, bikes, and commercial vehicles. Buy or sell with ease on our reliable platform designed for vehicle enthusiasts. Your journey to the perfect ride starts here!",
    url: 'https://Speedik.in',
    type: 'website',
    images: [
      {
        url: 'https://Speedik.in/public/assets/logo.png',
        width: 1200,
        height: 630,
        alt: 'Home page image',
      },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <AuthProvider>
        <ClientWrapper>
          <SmoothScrollProvider>
            <nav className=" sm:padding-x shadow-lg shadow-slate-100"> <DynamicNavbar /></nav>
            <Suspense>
            {children}
            </Suspense>
          </SmoothScrollProvider>
        </ClientWrapper>
        </AuthProvider>
      </body>
      <Toaster/>
    </html>
  );
}
