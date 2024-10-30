import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FloatingInput, FloatingLabel } from "@/components/ui/FloatingInput";
import { LuLoader2 } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import FileUploader from "./FileUploader";

export default function VehicleAddForm({
  setValue,formLoading,
  onSubmit,
  handleSubmit,
  register,
  errors,
  watch,
}) {
   // Watching the selected values
   const fuelType = watch("fuelType", "Select Fuel Type");
   const vehicleType = watch("vehicleType", "Select Vehicle Type");
   const transmissionType = watch("transmissionType", "Select Transmission Type");
   const ownership = watch("ownership", "Select Ownership");
   const condition = watch("condition", "Select Condition");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 rounded-lg padding-b shadow-md bg-gray-50"
    >
      {/* Vehicle Brand and Model */}
      <div className="flex w-full gap-4">
        <div className="relative flex-1">
          <FloatingInput
            id="brand"
            {...register("brand", { required: "Vehicle Brand is required" })}
          />
          <FloatingLabel htmlFor="brand">Vehicle Brand</FloatingLabel>
          {errors.brand && (
            <span className="text-red-600">{errors.brand.message}</span>
          )}
        </div>
        <div className="relative flex-1">
          <FloatingInput
            id="model"
            {...register("model", { required: "Vehicle Model is required" })}
          />
          <FloatingLabel htmlFor="model">Vehicle Model</FloatingLabel>
          {errors.model && (
            <span className="text-red-600">{errors.model.message}</span>
          )}
        </div>
      </div>

      {/* Year and Price */}
      <div className="flex w-full gap-4">
        <div className="relative flex-1">
          <FloatingInput
            id="year"
            type="number"
            {...register("year", { required: "Year is required" })}
          />
          <FloatingLabel htmlFor="year">Year</FloatingLabel>
          {errors.year && (
            <span className="text-red-600">{errors.year.message}</span>
          )}
        </div>
        <div className="relative flex-1">
          <FloatingInput
            id="price"
            type="number"
            {...register("price", { required: "Price is required" })}
          />
          <FloatingLabel htmlFor="price">Expected Price</FloatingLabel>
          {errors.price && (
            <span className="text-red-600">{errors.price.message}</span>
          )}
        </div>
      </div>

      {/* Kilometers and Fuel Type */}
      <div className="flex w-full gap-4">
        <div className="relative flex-1">
          <FloatingInput
            id="kilometers"
            type="number"
            {...register("kilometers", {
              required: "Kilometers Driven is required",
            })}
          />
          <FloatingLabel htmlFor="kilometers">Kilometers Driven</FloatingLabel>
          {errors.kilometers && (
            <span className="text-red-600">{errors.kilometers.message}</span>
          )}
        </div>
        <div className="relative flex-1">
          <Select
            onValueChange={(value) => setValue("fuelType", value)}
            {...register("fuelType", { required: "Fuel Type is required" })}
          >
            <SelectTrigger>
              <Label className="text-emerald-600">{fuelType}</Label>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.fuelType && (
            <span className="text-red-600">{errors.fuelType.message}</span>
          )}
        </div>
      </div>

      {/* Image Uploader */}
      <FileUploader />

      {/* Transmission and Ownership */}
      <div className="flex w-full gap-4">
        <div className="relative flex-1">
          <Select
            onValueChange={(value) => setValue("transmissionType", value)}
            {...register("transmissionType", {
              required: "Transmission Type is required",
            })}
          >
            <SelectTrigger>
              <Label className="text-emerald-600">
                {transmissionType}
              </Label>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="automatic">Automatic</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.transmissionType && (
            <span className="text-red-600">
              {errors.transmissionType.message}
            </span>
          )}
        </div>

        <div className="relative flex-1">
          <Select
            onValueChange={(value) => setValue("ownership", value)}
            {...register("ownership", { required: "Ownership is required" })}
          >
            <SelectTrigger>
              <Label className="text-emerald-600">{ownership}</Label>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="First owner">First owner</SelectItem>
                <SelectItem value="Second owner">Second owner</SelectItem>
                <SelectItem value="Third owner">Third owner</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.ownership && (
            <span className="text-red-600">{errors.ownership.message}</span>
          )}
        </div>
      </div>

      {/* Color and Condition */}
      <div className="flex w-full gap-4">
        <div className="relative flex-1">
          <FloatingInput
            id="colour"
            type="text"
            {...register("colour", { required: "Colour is required" })}
          />
          <FloatingLabel htmlFor="colour">Colour</FloatingLabel>
          {errors.colour && (
            <span className="text-red-600">{errors.colour.message}</span>
          )}
        </div>

        <div className="relative flex-1">
          <Select
            onValueChange={(value) => setValue("condition", value)}
            {...register("condition", { required: "Condition is required" })}
          >
            <SelectTrigger>
              <Label className="text-emerald-600">{condition}</Label>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Average">Average</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.condition && (
            <span className="text-red-600">{errors.condition.message}</span>
          )}
        </div>
      </div>

      {/* Full Name and Contact */}
      <div className="flex w-full gap-4">
        <div className="relative flex-1">
          <FloatingInput
            id="fullname"
            type="text"
            {...register("fullname", { required: "Full Name is required" })}
          />
          <FloatingLabel htmlFor="fullname">Your Fullname</FloatingLabel>
          {errors.fullname && (
            <span className="text-red-600">{errors.fullname.message}</span>
          )}
        </div>

        <div className="relative flex-1">
          <FloatingInput
            id="primaryContact"
            type="text"
            {...register("primaryContact", {
              required: "Primary Contact is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
          />
          <FloatingLabel htmlFor="primaryContact">
            Your primary contact number
          </FloatingLabel>
          {errors.primaryContact && (
            <span className="text-red-600">
              {errors.primaryContact.message}
            </span>
          )}
        </div>
      </div>
      
      {/* select vehicle type and secondary number*/}
      <div className="flex w-full gap-4">
      <div className="relative flex-1">
          <Select
            onValueChange={(value) => setValue("vehicleType", value)}
            {...register("vehicleType", { required: "vehicle type is required" })}
          >
            <SelectTrigger>
              <Label className="text-emerald-600">{vehicleType}</Label>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Two-Wheeler">Two-Wheeler</SelectItem>
                <SelectItem value="Four-Wheeler">Four-Wheeler</SelectItem>
                <SelectItem value="Commercial Vehicle">
                  Commercial Vehicle
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.condition && (
            <span className="text-red-600">{errors.condition.message}</span>
          )}
        </div>

        <div className="relative flex-1">
          <FloatingInput
            id="secondaryContact"
            type="text"
            {...register("secondaryContact", {
              
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
          />
          <FloatingLabel htmlFor="secondaryContact">
            Your secondary Contact number / WhatsApp
          </FloatingLabel>
          {errors.secondaryContact && (
            <span className="text-red-600">
              {errors.secondaryContact.message}
            </span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="px-6 mt-8  text-white rounded">
        {formLoading?<div className="flex justify-center items-center gap-2">
          Submitting <LuLoader2 className=" mt-1 animate-spin"/></div>:"Create Vehicle"}
      </Button>
    </form>
  );
}
   