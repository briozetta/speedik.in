
import Advertisement from '@/components/shared/Advertisement';
import VehicleCardList from '@/components/shared/VehicleCardList';
import SearchAndFilter from '@/components/shared/SearchAndFilter';

export default function Page() {
  return (
    <main className='bg-[#050B20]'>
      <section className='mt-10'><SearchAndFilter/></section>
      <section className=' bg-white mb-6 padding-x'>
      <VehicleCardList/>
      </section>
    </main> 
  );
}
