import whitecar from "@/public/assets/whitecar.png";
import Image from "next/image";
import Link from "next/link";
import Loginform from "../helpers/authentication-helper/Loginform";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
    {/* Left side - login form section */}
    <div className="flex-1 flex items-center justify-center p-8 bg-black text-white">
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to your account
        </h2>
        <p className="mb-4 text-center">
          Enter your credentials below to access your account
        </p>

        {/* login form */}
        
        <Loginform/>

        <p className="text-center mt-4 text-gray-500 text-sm">
          Only authorized users can access this feature. Regular users can go back to the{" "}
          <Link href="/" className="underline text-emerald-400">
            homepage
          </Link>.
        </p>
      </div>
    </div>

    {/* Right side - image/quote section */}
    <div className="lg:w-1/2 flex items-center justify-center p-8 bg-gray-900 text-white">
      <div className="max-w-lg">
        <Image src={whitecar} priority alt="White car" className="mb-4" />
        <p className="italic">
          "This login page is strictly for authorized users. If you don't have
          the necessary credentials, please return to the{" "}
          <Link href="/" className="underline">
            homepage
          </Link>."
        </p>
      </div>
    </div>
  </div>
  )
}
