import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";

  import axios from "axios";
  import { useState } from "react";
  
  export function DisableVehicle({ vehicleId ,handleRefresh,enableVehicle,handleRefreshDisabled}) {
   
    const [loading, setLoading] = useState(false);
  
    const handleDisableVehicle = async () => {
      try {
        setLoading(true);
        // Make API call to disable the vehicle
       await axios.post("/api/disable-vehicle", { _id: vehicleId ,enableVehicle});
        
       (enableVehicle !== false ? handleRefresh() : handleRefreshDisabled());

       
      } catch (error) {
        console.error("Error disabling vehicle:", error);
        
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <AlertDialog>
        {/* Use a button or span wrapped with AlertDialogTrigger */}
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="outline">
            {enableVehicle === false ? "Enable": "Disable"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
           
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-emerald-600 text-white"
              onClick={handleDisableVehicle}
              disabled={loading}
            >
              {loading ? "loading..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  