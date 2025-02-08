import { FaCarSide } from "react-icons/fa";
import { motion } from "framer-motion";

import React from 'react'

export default function NoVehiclesFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full padding-x  bg-white">
      {/* Icon with Animation */}
      <motion.div
        className="text-emerald-500"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <FaCarSide size={80} />
      </motion.div>

      {/* Message */}
      <motion.h2
        className="mt-6 text-2xl font-semibold text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
      >
        No Vehicles Found
      </motion.h2>

      {/* Suggestion */}
      <motion.p
        className="mt-2 text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
      >
        Try adjusting your search filters or check back later.
      </motion.p>
    </div>
  )
}
