"use client"
//Imports
import { FileUpload } from "@/components/ui/file-upload";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {deleteImage,setUploadedImages,setPrimaryImage,uploadFiles,
} from "@/redux/slices/handleFileUploadSlice";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { FiTrash2, FiStar } from "react-icons/fi";
import {Tooltip,TooltipContent,TooltipTrigger,TooltipProvider,
} from "@/components/ui/tooltip";
import { useEffect } from "react";

export default function FileUploader({ uploadedImagesFetched }) {

  const dispatch = useDispatch();
  const { uploadedImages, primaryImage } = useSelector((state) => state.files);
  // UseEffect for setting images when uploadedImagesFetched is available
  useEffect(() => {
    
    if (uploadedImagesFetched && uploadedImages.length === 0) {
      // Only dispatch if uploadedImages is empty to prevent repeated updates
      dispatch(setUploadedImages(uploadedImagesFetched));
    }

    
  }, [uploadedImagesFetched, uploadedImages.length,dispatch]);

  const handleFileUpload = (files) => {
    dispatch(uploadFiles(files));
  };

  const handleDeleteImage = (url) => {
    dispatch(deleteImage(url));
    toast.success("Image deleted!");
  };

  const handleSetPrimary = (url) => {
    dispatch(setPrimaryImage(url));
    toast.info("Primary image set!");
  };

  

  return (
    <div className="flex sm:flex-row flex-col w-full gap-4">
      <div className="flex-1 w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
         <FileUpload onChange={handleFileUpload} /> {/*file uploader UI component */}
      </div>
      <div className="flex-1 flex justify-center bg-white items-center">
        {/* map Images*/}
        {uploadedImages?.length > 0 ? ( 
          <div className="grid grid-cols-3 gap-4">
            {uploadedImages.map((image, index) => (
              <div key={image.url || index} className="relative">
                <Image
                  src={image.url }
                  alt={image.url || index}
                  quality={30}
                  width={200}
                  height={200}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover rounded-lg ${
                    primaryImage === image.url
                      ? "border-4 border-emerald-600"
                      : ""
                  }`}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(image.url)}
                          className=" text-red-600 bg-white rounded-full p-2 bg-opacity-25 text-lg"
                        >
                          <FiTrash2 />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">{"delete"}</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(image.url)}
                          className={`p-2 rounded ${
                            primaryImage === image.url
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-300 text-black"
                          }`}
                        >
                          <FiStar />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {"set as primary"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Label className="text-xl">
            Uploaded picture will show here. <br />{" "}
            <span className="text-emerald-600">
              You can delete or arrange them
            </span>
            <p className="text-sm text-center">No images uploaded.</p>
          </Label>
        )}
      </div>
    </div>
  );
}
