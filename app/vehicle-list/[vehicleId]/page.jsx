import FullScreenLoader from '@/components/ui/SkeletonLoadings/FullScreenLoader';
import dynamic from 'next/dynamic';

const VehicleListings = dynamic(() => import('@/components/shared/VehiclceListings'), {
  loading: () => <FullScreenLoader/>, // Optional: A fallback loader
});

export function generateMetadata({ params }) {
  const { vehicleId } = params;
  const title = `Vehicle Listings - ${vehicleId}`;
  const description = `Browse through the vehicle listings for vehicle with ${vehicleId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function Page({params}) {
  
  return (
    <main>
      <section>
        <VehicleListings id={params.vehicleId} />
      </section>
    </main>
  );
}
