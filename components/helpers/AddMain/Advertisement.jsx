import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FloatingInput, FloatingLabel } from '@/components/ui/FloatingInput';
import FileUploader from '../dashboard-helper/FileUploader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdvertisementsPage() {


  const [ads, setAds] = useState([]);
  console.log("ads", ads);

  const [newAd, setNewAd] = useState({
    title: '',
    description: '',
    uploadedImages: [],
    addType: 'Two Wheeler Top',
    isActive: false,
  });
  const [editAd, setEditAd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // State for delete confirmation
  const [adToDeleteId, setAdToDeleteId] = useState(null); // State to store the ID of the ad to delete
  const [uploadedImagesFetched, setUploadedImagesFetched] = useState([]);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch('/api/get-advertisement');
      if (!response.ok) {
        throw new Error('Failed to fetch advertisements');
      }
      const result = await response.json();
      setAds(result.advertisements);
    } catch (err) {
      setError(err.message);
    }
  };

  const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000); // Auto-scroll every 3 seconds
      return () => clearInterval(interval);
    }, [images]);

    return (
      <div className="w-1/3">
        <img
          src={images[currentIndex]}
          alt={`carousel-${currentIndex}`}
          className="h-29  w-full object-fit-cover rounded-lg"
        />
      </div>
    );
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAd({ ...newAd, [name]: value });
  };

  // const handleImageUpload = (images) => {
  //   setNewAd({ ...newAd, uploadedImages: images });
  // };

  const handleImageUpload = async (files) => {
    try {
      // Assuming you handle file uploads here (you can use an API or any other method)
      const uploadedImages = await uploadedImages(files);
      setNewAd({
        ...newAd,
        uploadedImages: [...newAd.uploadedImages, ...uploadedImages],
      });
    } catch (error) {
      setError("Failed to upload images.");
    }
  };

  const handleCheckboxChange = (e) => {
    setNewAd({ ...newAd, isActive: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = editAd ? `/api/update-advertisement` : '/api/add-advertisement';
      const method = editAd ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAd),
      });

      if (!response.ok) {
        throw new Error(editAd ? 'Failed to update advertisement' : 'Failed to create advertisement');
      }

      const result = await response.json();

      if (editAd) {
        setAds(ads.map((ad) => (ad._id === editAd._id ? result.advertisement : ad)));
        setEditAd(null);
      } else {
        setAds([...ads, result.advertisement]);
      }
      setNewAd({ title: '', description: '', uploadedImages: [], addType: 'Two Wheeler Top', isActive: false });
      setIsDialogOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ad) => {
    setNewAd(ad);
    setEditAd(ad);
    setIsDialogOpen(true); // Open the dialog when editing
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/delete-advertisement`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete advertisement');
      }

      setAds(ads.filter((ad) => ad._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setDeleteConfirmationOpen(false); // Close the confirmation modal after deletion
    }
  };

  const openDeleteConfirmation = (id) => {
    setAdToDeleteId(id); // Store the ID of the ad to delete
    setDeleteConfirmationOpen(true); // Open the confirmation modal
  };

  const closeDeleteConfirmation = () => {
    setAdToDeleteId(null); // Clear the stored ID
    setDeleteConfirmationOpen(false); // Close the confirmation modal
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Advertisements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Create New Advertisement</CardTitle>
            <CardDescription>Fill in the details for a new ad</CardDescription>
          </CardHeader>
          {ads.length >= 3 ? (
            <p className="text-red-500 text-center mt-25">You can only post up to 3 advertisements.</p>

          ) : (
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="relative flex-1">
                    <FloatingInput
                      id="title"
                      name="title"
                      value={newAd.title}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                    <FloatingLabel htmlFor="title">Title</FloatingLabel>
                  </div>
                  <div className="relative flex-1">
                    <FloatingInput
                      id="description"
                      name="description"
                      value={newAd.description}
                      onChange={handleInputChange}
                      disabled={loading}
                      rows="4"
                    />
                    <FloatingLabel htmlFor="description">Description</FloatingLabel>
                  </div>

                  <div className="relative flex-1">
                    <label htmlFor="addType" className="block text-sm font-medium mb-1">Ad Type</label>
                    <select
                      id="addType"
                      name="addType"
                      value={newAd.addType}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="border p-2 rounded-md w-full"
                    >
                      <option value="Two Wheeler Top">Two Wheeler Top</option>
                      <option value="Four Wheeler Top">Four Wheeler Top</option>
                      <option value="Commercial Wheeler Top">Commercial Wheeler Top</option>
                    </select>
                  </div>

                  <div className="relative flex-1">
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={newAd.isActive}
                        onChange={handleCheckboxChange}
                        disabled={loading}
                        className="form-checkbox"
                      />
                      <span className="ml-2">Active</span>
                    </label>
                  </div>

                  <FileUploader onUpload={handleImageUpload} uploadedImagesFetched={uploadedImagesFetched} />
                </div>

                <Button type="submit" className="mt-4" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Advertisement'}
                </Button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </form>
            </CardContent>
          )
          }

        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Advertisements</CardTitle>
            <CardDescription>Manage your current ads</CardDescription>
          </CardHeader>
          <CardContent>
            {ads.map((ad) => (
              <Card key={ad._id} className="mb-4">
                <div className="flex items-start justify-between">
                  {/* Left Side Content */}
                  <div className="flex-1 pr-4">
                    <CardHeader>
                      <CardTitle>{ad.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{ad.description}</p>
                      <p><strong>Type:</strong> {ad.addType}</p>
                      <p><strong>Active:</strong> {ad.isActive ? 'Yes' : 'No'}</p>
                    </CardContent>
                  </div>

                  {/* Right Side Image */}
                  <ImageCarousel images={ad.uploadedImages} />

                </div>

                <CardFooter>
                  <Button variant="outline" className="mr-2" onClick={() => handleEdit(ad)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => openDeleteConfirmation(ad._id)}>
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>

          {/* <CardContent>
            {ads.map((ad) => (
              <Card key={ad._id} className="mb-4">
                <CardHeader>
                  <CardTitle>{ad.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{ad.description}</p>
                  <p><strong>Type:</strong> {ad.addType}</p>
                  <p><strong>Active:</strong> {ad.isActive ? 'Yes' : 'No'}</p>
                  <img height={100} width={100} src={ad.uploadedImages[0]}alt="load"/>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="mr-2" onClick={() => handleEdit(ad)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => openDeleteConfirmation(ad._id)}>
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent> */}
        </Card>
      </div>

      {/* Dialog for Editing Advertisement */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Advertisement</DialogTitle>
            <DialogDescription>
              Make changes to your advertisement here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={newAd.title}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={newAd.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="addType" className="text-right">
                  Ad Type
                </Label>
                <select
                  id="addType"
                  name="addType"
                  value={newAd.addType}
                  onChange={handleInputChange}
                  className="col-span-3 border p-2 rounded-md"
                >
                  <option value="Two Wheeler Top">Two Wheeler Top</option>
                  <option value="Four Wheeler Top">Four Wheeler Top</option>
                  <option value="Commercial Wheeler Top">Commercial Wheeler Top</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isActive" className="text-right">
                  Active
                </Label>
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={newAd.isActive}
                  onChange={handleCheckboxChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? 'Updating...' : 'Update Advertisement'}
            </Button>

            <Button className="mt-4 m-2">
              Close
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for Delete Confirmation */}
      <Dialog open={deleteConfirmationOpen} onOpenChange={setDeleteConfirmationOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this advertisement?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 pt-5">
            <Button variant="outline" onClick={closeDeleteConfirmation}>
              No
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(adToDeleteId)}>
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}