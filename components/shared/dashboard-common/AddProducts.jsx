"use client";
import VehicleAddForm from "@/components/helpers/dashboard-helper/VehicleAddForm";
import Dashboardlayout from "@/components/ui/Dashboard-layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  clearUploadedImages
} from "@/redux/slices/handleFileUploadSlice";

export default function AddProducts() {
  const { uploadedImages, isLoading, error } = useSelector(
    (state) => state.files
  );
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const userId = session?.user?._id;
  const userData = session?.user;

  useEffect(() => {
    if (formLoading) {
      toast.info("submitting please wait...", { position: "top-center" });
    }
    if (isLoading) {
      toast.info("Uploading...", { position: "top-center" });
    } else if (error) {
      console.log(error.error);

      toast.error(`${error.error}`, { position: "top-center" });
    } else if (uploadedImages.length > 0) {
      toast.success("Files uploaded successfully!", { position: "top-center" ,onAutoClose:1000});
    }
  }, [isLoading, error, formLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      fullname:
        `${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`.trim() ||
        null,
    },
  });

  const onSubmit = async (data) => {
    const imageUrls = uploadedImages.map((imageObj) => imageObj.url);
    if (imageUrls.length === 0) {
      toast.warning("Please add images", { position: "top-center" });
      return; // Exit the function if no images are present
    }
    const formData = {
      ...data,
      userId,
      uploadedImages: imageUrls,
    };
    setFormLoading(true); // Start loading
    try {
      const res = await axios.post("/api/add-vehicle", formData);

      if (res.status === 201) {
        toast.success("Vehicle added successfully!", {
          position: "top-center",
          onAutoClose: 2000,
        });
        reset(); // Clear the form on successful submit
        dispatch(clearUploadedImages());
      }
    } catch (error) {
      toast.error("Failed to add vehicle. Please try again.", {
        position: "top-center",
      });
      console.error("Error:", error);
    } finally {
      setFormLoading(false); // End loading after request completion
    }
  };

  return (
    <Dashboardlayout>
      <div className="flex justify-start">
        <h2 className="scroll-m-20 border-b px-7 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Add your vehicle
        </h2>
      </div>

      {/*vehicle add  form */}
      <VehicleAddForm
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
