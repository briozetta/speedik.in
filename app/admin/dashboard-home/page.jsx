"use client";
// Imports
import HomeDashboard from "@/components/shared/admin-dashboard-shared/HomeDashboard";
import { clearUploadedImages } from "@/redux/slices/handleFileUploadSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch();
  // Clear uploaded images from Redux state when the Dashboard loads
  useEffect(() => {
    dispatch(clearUploadedImages());
  }, [dispatch]);

  return (
    <main>
      <section className="mx-6">
        {/* Main content area with HomeDashboard component */}
        <HomeDashboard />
      </section>
    </main>
  );
}
