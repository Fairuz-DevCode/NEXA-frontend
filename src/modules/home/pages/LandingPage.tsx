import React from 'react';
import img1 from '../../../assets/img/img1.png';
import { Truck, RotateCcw, Headset, LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import CategorySection from '../components/CategorySection';
import FeatureGrid from '../components/FeatureGrid';
import PromoBanner from '../components/PromoBanner';
import ProductCard from '../../catalog/components/ProductCard';
import { mockProducts } from '../../catalog/constants/catalogOptions';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex flex-row justify-start w-full h-90 bg-cover bg-center bg-no-repeat sm:items-center md:min-h-100 md:pt-0 md:bg-cover md:bg-right lg:min-h-120 lg:bg-cover lg:bg-right"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent md:bg-linear-to-r md:from-black/70 md:via-black/10 md:to-transparent"></div>

        <div className="relative z-10 flex items-start justify-start max-w-xs px-5 py-5 text-left md:px-5 lg:p-10 lg:max-w-xl xl:max-w-2xl xl:pl-35">
          <div className="w-full max-w-3xs sm:max-w-sm md:max-w-md xl:max-w-xl">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-parchment-600 uppercase drop-shadow-md xl:text-md xl:max-w-50">
              NEW COLLECTION 2026
            </span>
            <h3 className="mt-1 mb-3 text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold text-parchment-900 leading-tight drop-shadow-lg xl:text-5xl">
              Upgrade Style Streetwear Kamu
            </h3>
            <p className="mb-5 text-xs sm:text-sm md:text-base text-parchment-700 leading-relaxed drop-shadow-md lg:text-xl lg:max-w-100 xl:max-w-150">
              Temukan koleksi sneakers terbaik untuk tampilan kasual yang tetap elegan.
            </p>
            <button
              onClick={() => navigate('/product')}
              className="w-30 py-2 px-3 rounded-xl bg-desert_sand-200 text-xs font-semibold text-desert_sand-900 shadow-lg transition-all sm:py-3 sm:text-xs md:w-50 md:px-4 md:py-3 md:text-base hover:bg-desert_sand-100 hover:shadow-xl cursor-pointer"
            >
              Jelajahi Katalog
            </button>
          </div>
        </div>
      </section>

      {/* Proposional Section */}
      <section className='left-0 w-full h-60 flex items-center justify-center border-gray-200 bg-white md:h-20'>
        <div className='w-full max-w-1500 flex flex-wrap justify-around gap-y-6 py-3 text-almond_silk-100'>
          <div className='w-1/2 flex flex-col items-center justify-center gap-3 md:w-1/4 md:flex-row'>
            <Truck />
            <div className='flex flex-col items-center md:items-start'>
              <h3 className='text-sm md:text-md font-bold'>Free Delivery</h3>
              <p className='text-xs'>on orders over 75$</p>
            </div>
          </div>
          <div className='w-1/2 flex flex-col items-center justify-center gap-3 md:w-1/4 md:flex-row'>
            <RotateCcw />
            <div className='flex flex-col items-center md:items-start'>
              <h3 className='text-sm md:text-md font-bold'>Easy Returns</h3>
              <p className='text-xs'>30-days return policy</p>
            </div>
          </div>
          <div className='w-1/2 flex flex-col items-center justify-center gap-3 md:w-1/4 md:flex-row'>
            <LockKeyhole />
            <div className='flex flex-col items-center md:items-start'>
              <h3 className='text-sm md:text-md font-bold'>Secure Checkout</h3>
              <p className='text-xs'>100% secure payments</p>
            </div>
          </div>
          <div className='w-1/2 flex flex-col items-center justify-center gap-3 md:w-1/4 md:flex-row'>
            <Headset />
            <div className='flex flex-col items-center md:items-start'>
              <h3 className='text-sm md:text-md font-bold'>24/7 Support</h3>
              <p className='text-xs'>We're here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main section */}
      <section className='grid grid-cols-1 m-6 xl:grid-cols-2 xl:px-25 bg-linen-700 gap-6'>
        <div>
          <CategorySection />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {mockProducts.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-6 w-full'>
          <FeatureGrid />
          <PromoBanner />
        </div>
      </section>

      {/* Brand Logos Section */}
      <section className="w-full bg-white py-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-80 grayscale">
          <span className="font-black italic text-3xl tracking-tighter">NIKE</span>
          <span className="font-bold text-2xl lowercase tracking-tight">adidas</span>
          <span className="font-black text-3xl uppercase tracking-tighter">PUMA</span>
          <div className="flex flex-col items-center leading-none">
            <span className="font-black text-2xl italic tracking-tighter">NB</span>
            <span className="text-[10px] font-bold tracking-widest mt-1">new balance</span>
          </div>
          <span className="font-black text-2xl uppercase tracking-widest">CONVERSE</span>
          <div className="flex flex-col items-center leading-none">
            <span className="font-black text-3xl uppercase">VANS</span>
            <span className="text-[8px] font-bold tracking-widest mt-1">"OFF THE WALL"</span>
          </div>
          <span className="font-black italic text-3xl lowercase tracking-tighter text-blue-900">asics</span>
          <span className="font-black text-2xl uppercase tracking-tighter">Reebok</span>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
