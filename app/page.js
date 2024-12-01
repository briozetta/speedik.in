import FullScreenLoader from '@/components/ui/SkeletonLoadings/FullScreenLoader';
import dynamic from 'next/dynamic';

const HomeSection = dynamic(() => import('@/components/shared/HomeSection'), {
  loading: () => <FullScreenLoader/>, // Optional: A fallback loader
});
const Page = () => {
  return (
    <main >
      <section><HomeSection /></section>
    </main>
  );
};

export default Page;
