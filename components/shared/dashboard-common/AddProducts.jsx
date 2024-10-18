"use client";
import VehicleAddForm from "@/components/helpers/dashboard-helper/VehicleAddForm";
import Dashboardlayout from "@/components/ui/Dashboard-layout";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function AddProducts() {
  const { uploadedImages,isLoading, error } = useSelector((state) => state.files);

  useEffect(() => {
    if (isLoading) {
      toast.info('Uploading...',{position:"top-center"});
    } else if (error) {
      console.log(error.error);
      
      toast.error(`${error.error}`,{position:"top-center"});
    } else if (uploadedImages.length > 0) {
      toast.success('Files uploaded successfully!',{position:"top-center"});
    }
  }, [isLoading, error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log("form inputs", data,uploadedImages); // Handle form submission
  };

  return (
    <Dashboardlayout>
      <div className="flex justify-start">
        <h2 className="scroll-m-20 border-b px-7 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Add your vehicles
        </h2>
      </div>

      {/*vehicle add  form */}
      <VehicleAddForm
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
