"use client";
import Advertisement from "@/components/shared/Advertisement";
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SearchAndFilter from "@/components/shared/SearchAndFilter";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { useVehiclesByQuery } from "@/hooks/useVehiclesByQuery";
import { useDispatch, useSelector } from "react-redux";
import { setVehicleSecondFilter } from "@/redux/slices/carFilterDashboad";
import { Loader2 } from "lucide-react";
import FullScreenLoader from "../ui/SkeletonLoadings/FullScreenLoader";
import dynamic from "next/dynamic";
import imgshow from '../../public/assets/banner3.jpg'
import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from "../../public/assets/banner3.jpg";
// import img2 from "../../public/assets/bggrid.png";
// import img3 from "../../public/assets/pickup.jpg";
// import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation , Autoplay } from "swiper/modules";


const VehicleCardList = dynamic(() => import('@/components/shared/VehicleCardList'), {
  loading: () => <FullScreenLoader />,
});

export default function VehiclceListings({ id }) {
  const imgshow = [img1, img1, img1];



  const [ads, setAds] = useState([])
  const [filteredAds, setFilteredAds] = useState([]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const VehicleType = id?.replace(/%20/g, " ");

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch('/api/get-advertisement');
      if (!response.ok) {
        throw new Error('Failed to fetch advertisements');
      }
      const result = await response.json();
      setAds(result.advertisements);
    } catch (err) {
      console.error("Error fetching advertisements", err.message);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  // Filter ads when ads or VehicleType changes
  useEffect(() => {
    const matchedAds = ads.filter(ad => ad.addType === VehicleType);
    console.log("matchedAds",matchedAds);
    
    setFilteredAds(matchedAds);
  }, [ads, VehicleType]);


  const { searchTerm } = useSelector((state) => state.carFilters);

  const { vehicles, loading, hasMore, next } = useVehiclesByQuery();

  const dispatch = useDispatch();
  dispatch(setVehicleSecondFilter(id));

  const filteredvehicles = vehicles
    .filter(
      (vehicle) =>
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
    )
  console.log("filtervichle", filteredvehicles);


  // const imgshow = [img1, img1, img1];
  console.log("imagshow", imgshow);
  console.log("ads", ads);


  return (
    <>
      <div className="pt-10 bg-[#050B20]">
        <SearchAndFilter />
      </div>

      {
        filteredAds.length > 0 ? (
          <div className="relative overflow-hidden bg-[rgb(52_211_153_/var(--tw-text-opacity))] text-white">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-20 bg-cover bg-center" />
            <div className="container mx-auto px-4 py-8 relative">
              {
                filteredAds.map((ad) => (
                  <div className="grid md:grid-cols-2 gap-8 items-center" key={ad.id}>
                    {/* Left Section */}
                    <div className="space-y-4">
                      <Badge className="bg-white/20 hover:bg-white/30 text-white">Limited Time Offer</Badge>
                      <h2 className="text-4xl font-bold">{ad?.title || "No Data Found"}</h2>
                      <p className="text-xl opacity-90">{ad?.description || "No Data Found"}</p>
                      <div className="flex gap-4">
                        <Button size="lg" variant="secondary">View Offers</Button>
                        <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/20">
                          Learn More
                        </Button>
                      </div>
                    </div>
                    {/* Right Section */}
                    <div className="relative w-full h-full">
                      
                      <Swiper spaceBetween={20} 
                      slidesPerView={1}
                      navigation={true}
                      autoplay={{
                        delay: 2000, 
                        disableOnInteraction: false,  
                      }}
                      loop={true}  
                      modules={[Navigation, Autoplay]}  
                       >
                      {ad.uploadedImages.map((img, index) => (
                          <SwiperSlide key={index}>
                            <div className="relative w-full h-72">
                              <Image
                                src={img}
                                alt={`Featured Vehicle ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-tl-lg rounded-bl-lg"
                                priority
                                unoptimized
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <></>
        )
      }







      {(filteredvehicles.length === 0) & !loading ? (
        <div className="text-center text-gray-500">No vehicles available</div>
      ) : (
        <div className=" bg-white mb-6 padding-x " style={{ paddingTop: "2rem" }}>
          <VehicleCardList vehicles={filteredvehicles} />
        </div>
      )}

      <div className="flex items-center lg:flex-row flex-col gap-2 justify-center">
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={next}
          threshold={1}
        >
          {hasMore && (
            <Loader2 className="my-12 h-12 w-12 animate-spin text-black" />
          )}
        </InfiniteScroll>
      </div>
    </>
  );
}
