"use client";
// Import dependencies and components
import VehicleAddForm from "@/components/helpers/dashboard-helper/VehicleAddForm";
import Dashboardlayout from "@/components/ui/Dashboard-layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { clearUploadedImages } from "@/redux/slices/handleFileUploadSlice";
import useSWR from "swr";

export default function AddProducts({ id }) {
  const { uploadedImages, isLoading, error } = useSelector((state) => state.files);
  const fetcher = (url) => fetch(url).then((r) => r.json());

  // Fetch vehicle data if `id` is provided for editing
  const { data } = useSWR(id ? `/api/get-single-vehicle?id=${id}` : null, fetcher);

  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const [uploadedImagesFetched, setUploadedImagesFetched] = useState([]);
  const userId = session?.user?._id;
  const userData = session?.user;

  // Initialize form with user's full name if available
  const {
    register,control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      fullname: `${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`.trim() || null,
    },
  });

  // Populate form fields with vehicle data if editing
  useEffect(() => {
    if (data && data.vehicle) {
      const vehicle = data.vehicle;
      Object.keys(vehicle).forEach((key) => {
        setValue(key, vehicle[key]);
      });
      setUploadedImagesFetched(data?.vehicle?.uploadedImages);
    }
  }, [data, setValue]);

  // Show loading or error toast notifications based on upload state
  useEffect(() => {
    if (formLoading) {
      toast.info("Submitting, please wait...", { position: "top-center" });
    }
    if (isLoading) {
      toast.info("Uploading...", { position: "top-center" });
    } else if (error) {
      toast.error(error.error, { position: "top-center" });
    }
  }, [isLoading, error, formLoading]);

  // Handle form submission
  const onSubmit = async (formData) => {
    const imageUrls = uploadedImages.map((imageObj) => imageObj.url);
    if (imageUrls.length === 0) {
      toast.warning("Please add images", { position: "top-center", duration: 500 });
      return;
    }

    const dataToSubmit = {
      ...formData,
      userId,
      uploadedImages: imageUrls,
    };
    setFormLoading(true);

    try {
      const res = id
        ? await axios.put(`/api/update-vehicle?id=${id}`, dataToSubmit) // Edit vehicle if `id` exists
        : await axios.post("/api/add-vehicle", dataToSubmit); // Add vehicle otherwise

      if (res.status === 201 || res.status === 200) {
        toast.success("Vehicle saved successfully!", { position: "top-center", duration: 4000 });
        if (!id) {
          reset();
          dispatch(clearUploadedImages());
        }
      }
    } catch (error) {
      toast.error("Failed to save vehicle. Please try again.", { position: "top-center" });
      console.error("Error:", error);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Dashboardlayout>
      <div className="flex justify-start">
        <h2 className="scroll-m-20 border-b px-7 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {id ? "Edit your vehicle" : "Add your vehicle"}
        </h2>
      </div>

      {/* Pass props to vehicle form component */}
      <VehicleAddForm
      control={control}
        uploadedImagesFetched={uploadedImagesFetched}
        id={id}
        formLoading={formLoading}
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </Dashboardlayout>
  );
}
