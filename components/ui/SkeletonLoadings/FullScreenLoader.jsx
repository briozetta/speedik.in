export default function FullScreenLoader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600">
        {/* Title */}
        <h1 className="mb-8 text-5xl font-extrabold text-white tracking-wide animate-pulse">Gaadi9</h1>
  
        {/* Car Animation and Loading Text */}
        <div className="flex flex-col items-center">
          {/* Car SVG Animation */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 512"
              className="h-40 w-auto animate-bounce"
              fill="none"
            >
              {/* Car body */}
              <rect x="100" y="200" width="800" height="100" rx="20" fill="#ffffff" />
              <path
                d="M150 250 h700 v-50 q0 -40 -40 -40 h-620 q-40 0 -40 40 z"
                fill="#10b981"
              />
              {/* Wheels */}
              <circle cx="250" cy="350" r="50" fill="#2d3748" />
              <circle cx="750" cy="350" r="50" fill="#2d3748" />
              <circle cx="250" cy="350" r="30" fill="#ffffff" />
              <circle cx="750" cy="350" r="30" fill="#ffffff" />
              {/* Headlights */}
              <circle cx="120" cy="260" r="20" fill="#fbbf24" />
              <circle cx="900" cy="260" r="20" fill="#fbbf24" />
            </svg>
            {/* Road Effect */}
            <div className="absolute bottom-[-10px] left-0 w-full h-2 bg-gray-300 animate-pulse"></div>
          </div>
  
          {/* Loading Text */}
          <p className="mt-12 text-2xl text-white animate-fadeIn">Loading your vehicles...</p>
        </div>
      </div>
    );
  }
  