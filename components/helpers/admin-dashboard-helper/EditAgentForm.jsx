//Imports
"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  Button,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Input,
} from "./imports";
import { formFields } from "@/lib/contants";
import { Settings } from "lucide-react";

// Fetch data utility function
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function EditAgentForm({ userId, handleRefresh, role }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: userData } = useSWR(
    userId ? `/api/get-single-user?userId=${userId}` : null,
    fetcher
  );
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Populate form fields with fetched user data
  useEffect(() => {
    if (userData?.user) {
      formFields.forEach(({ id }) => {
        if (id !== "password") setValue(id, userData?.user[id] || "");
      });
    }
  }, [userData, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.put(`/api/update-user`, { newData: { userId, ...data } });
      reset(); // Reset the form
      setLoading(false);
      handleRefresh(); // Refresh the parent component's data
      setOpen(false); // Close the dialog
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {role ? (
          <Settings className="h-5 w-5 cursor-pointer" />
        ) : (
          <Button size="sm" className="h-7 gap-1 bg-emerald-600">
            <span className="text-white sm:whitespace-nowrap">Edit User</span>
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md p-6 rounded-lg shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-gray-800">
            Edit User Details
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-500 mt-2">
            Update the user details below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {formFields.map(({ id, label, type, placeholder }) => (
            <div key={id} className="flex flex-col space-y-1.5">
              <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(id, {
                  required: `${label} is required`,
                  ...(id === "contact" && {
                    validate: (value) =>
                      /^[0-9]{10}$|^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                        value
                      ) || "Contact must be valid",
                  }),
                  ...(id === "password" && {
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters",
                    },
                  }),
                })}
              />
              {errors[id] && (
                <span className="text-red-600 text-xs">
                  {errors[id].message}
                </span>
              )}
            </div>
          ))}
          <AlertDialogFooter className="mt-6 flex justify-end space-x-4">
            <AlertDialogCancel asChild>
              <Button
                className="bg-gray-700 text-white"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button
              type="submit"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {loading ? "updating.." : "Save Changes"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
