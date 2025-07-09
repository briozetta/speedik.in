export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100">
      {/* Spinner Animation */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-emerald-500 border-emerald-200 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-gray-200 border-gray-300 rounded-full animate-spin-slow"></div>
      </div>

      {/* Logo */}
      <h1 className="mt-6 text-2xl font-semibold text-gray-800 tracking-wide">
        Speed<span className="text-emerald-500">Dik</span>
      </h1>

      {/* Loading Text */}
      <p className="mt-2 text-lg text-gray-600">
        Loading, please wait...
      </p>
    </div>
  );
}
