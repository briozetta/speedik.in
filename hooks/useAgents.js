import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
export const dynamic = 'force-dynamic';

const limit = 6;

export const useAgents = () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState([]);
  const { userFilter } = useSelector((state) => state.userFilter); // destructure correctly
  
  // # Fetch users with pagination
  const fetchUsers = async (reset = false) => {
    if (loading) return; // Prevent multiple calls

    setLoading(true);

    const { data } = await axios.get(`/api/users?limit=${limit}
      &skip=${reset ? 0 : limit * page}&userFilter=${userFilter}`);

    if (reset) {
      setUsers(data.users);  // Reset the list if refreshing
      setPage(1);            // Reset the page counter
    } else {
      setUsers((prev) => [...prev, ...data.users]); // Append new users to the list
      setPage((prev) => prev + 1);                  // Increment the page counter
    }

    setHasMore(data.users.length === limit);  // Set hasMore based on result
    setLoading(false);
  };

  // # Load more users for infinite scroll
  const next = () => fetchUsers();

  // # Refresh users without resetting page counter unnecessarily
  const handleRefresh = () => fetchUsers(true); 

  // # Trigger fetchUsers when userFilter change
  useEffect(() => {
    fetchUsers(true);  // Reset and fetch users when filters change
  }, [userFilter]); // Dependency on userFilters

  return { users, loading, hasMore, next, handleRefresh, fetchUsers };
};
