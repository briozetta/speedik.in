import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
export const dynamic = 'force-dynamic';

const limit = 6;

export const useVehicles = () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [vehicles, setVehicles] = useState([]); // #Renamed users to vehicles
  const { carFilter } = useSelector((state) => state.carFilters);

  // # Fetch vehicles with pagination
  const fetchCars = async (reset = false) => {
    if (loading) return; // Prevent multiple calls

    setLoading(true);

    const { data } = await axios.get(
      `/api/get-my-veichicle?limit=${limit}&skip=${reset ? 0 : limit * page}&carFilter=${carFilter}`
    );
    const activeVehicles = data.vehicles.filter((vehicle) => !vehicle.disabled);
    if (reset) {
      setVehicles(activeVehicles); // Reset the list if refreshing
      setPage(1); // Reset the page counter
    } else {
      setVehicles((prev) => [...prev, ...data.vehicles]); // Append new vehicles to the list
      setPage((prev) => prev + 1); // Increment the page counter
    }

    setHasMore(data.vehicles.length === limit); // Set hasMore based on result
    setLoading(false);
  };

  // # Load more vehicles for infinite scroll
  const next = () => fetchCars();

  // # Refresh vehicles without resetting page counter unnecessarily
  const handleRefresh = () => fetchCars(true);

  // # Trigger fetchCars when carFilter changes
  useEffect(() => {
    fetchCars(true); // #Reset and fetch vehicles when filters change
  }, [carFilter]);

  return { vehicles, loading, hasMore, next, handleRefresh, fetchCars };
};
