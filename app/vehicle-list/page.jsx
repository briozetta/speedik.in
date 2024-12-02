import FullScreenLoader from '@/components/ui/SkeletonLoadings/FullScreenLoader';
import dynamic from 'next/dynamic';

const VehicleListings = dynamic(() => import('@/components/shared/VehiclceListings'), {
  loading: () => <FullScreenLoader/>, // Optional: A fallback loader
});

export default function Page() {
  return (
    <main>
      <section>
        <VehicleListings />
      </section>
    </main>
  );
}
