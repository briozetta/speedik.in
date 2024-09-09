import Image from 'next/image';
import Advertisement from '@/components/shared/Advertisement';
import CarCardList from '@/components/shared/CarCardList';
import SearchAndFilter from '@/components/shared/SearchAndFilter';
import bggrid from "@/public/assets/bggrid2.png"

export default function Page() {
  return (
    <main className='bg-[#050B20]'>
      <section className='mt-10'><SearchAndFilter/></section>
      <section className=' bg-white mb-6 padding-x'>
      <CarCardList/>
      </section>
    </main> 
  );
}
