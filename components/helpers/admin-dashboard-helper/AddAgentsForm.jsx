// imports
"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { formFields, validateContact } from "@/lib/contants";
import { useDispatch, useSelector } from 'react-redux';
import {submitForm} from "@/redux/api/userThunks"
import {
  AlertDialog,AlertDialogCancel,AlertDialogContent,Button,
  AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,
  AlertDialogTitle,AlertDialogTrigger,User2,Input,
} from "./imports";
import { toast } from "sonner";

export default function AddAgentsForm({handleRefresh}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch(); 
  const { loading ,success,error} = useSelector((state) => state.user);
  const {register,handleSubmit,formState: { errors },reset,} = useForm();

  const date = new Date();

  useEffect(() => {
    if (success) {
      toast.message('Agent has been created', {
        description: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
      })
      setOpen(false); // Close the dialog after successful submission
      reset(); // Reset the form after submission
     
      handleRefresh(); // This should trigger the refresh logic

    }
  }, [success,reset]);

  // form submit
  const onSubmit = (data) => {
    dispatch(submitForm(data));
  };

  return (
   <>
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1 bg-emerald-600">
          <User2 className="h-3.5 w-3.5" />
          <span className="text-emerald-50 sm:whitespace-nowrap">
            Add Agent
          </span>
        </Button>
      </AlertDialogTrigger>
    
      <AlertDialogContent className="max-w-md p-6 rounded-lg shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-gray-800">
            Add New Agent
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-500 mt-2">
            Fill in the details to add a new agent to the system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {formFields.slice(0, 2).map(({ id, label, type, placeholder }) => (
              <div key={id} className="flex flex-col space-y-1.5">
                <label
                  htmlFor={id}
                  className="text-xs font-medium text-gray-700"
                >
                  {label}
                </label>
                <Input
                  className="py-1 text-sm"
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  {...register(id, { required: `${label} is required` })}
                />
                {errors[id] && (
                  <span className="text-red-600 text-xs">
                    {errors[id].message}
                  </span>
                )}
                
              </div>
            ))}
          </div>

          {formFields.slice(2).map(({ id, label, type, placeholder }) => (
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
                    validate: validateContact,
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
          {error && (
              <span className="text-red-600 text-xs">{error.error}</span>
            )}

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
              variant="outline"
              className="bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white"
            >
              {loading?"creating agent...":"Add Agent"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  
        
   </>
  );
}
