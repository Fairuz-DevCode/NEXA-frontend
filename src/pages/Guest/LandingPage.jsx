import React from 'react';
import img1 from '../../assets/img/img1.png';
import { Truck, RotateCcw, Headset, LockKeyhole } from 'lucide-react';

import CategorySection from '../../components/common/CategorySection';
import FeaturedGrid from '../../components/common/FeatureGrid';
import PromoBanner from '../../components/common/PromoBanner';
import ProductCard from '../../components/common/ProductCard';


const mockProducts = [
  {
    id: 'm1',
    name: 'Nike Air Force 1 07',
    sub: "Men's shoes",
    price: 1650000,
    oldPrice: 1830000,
    rating: 4.9,
    gender: 'Man',
    brand: 'Nike',
    category: 'Sneakers',
    color: 'White',
    material: 'Real Skin',
    sole: 'Rubber Sole',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'm2',
    name: 'Nike Court Low Vintage',
    sub: "Men's shoes",
    price: 1725000,
    oldPrice: 1900000,
    rating: 4.9,
    gender: 'Man',
    brand: 'Nike',
    category: 'Casual Shoes',
    color: 'White',
    material: 'Real Skin',
    sole: 'Rubber Sole',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'm3',
    name: 'Nike Air Max SC SE Maroon',
    sub: "Men's shoes",
    price: 1500000,
    oldPrice: 1680000,
    rating: 4.9,
    gender: 'Man',
    brand: 'Nike',
    category: 'Sport shoes',
    color: 'Red',
    material: 'Mesh',
    sole: 'EVA Sole',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'm4',
    name: 'Nike Air Max 1 Original',
    sub: "Men's shoes",
    price: 1725000,
    oldPrice: 1860000,
    rating: 4.9,
    gender: 'Man',
    brand: 'Nike',
    category: 'Running Shoes',
    color: 'Blue',
    material: 'Mesh',
    sole: 'Rubber Sole',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'm5',
    name: 'Nike Air Max 1 Dusty Rose',
    sub: "Women's shoes",
    price: 1650000,
    oldPrice: 1830000,
    rating: 4.8,
    gender: 'Woman',
    brand: 'Nike',
    category: 'Casual Shoes',
    color: 'Red',
    material: 'Real Skin',
    sole: 'Rubber Sole',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=80',
  },
]

const LandingPage = () => {

  return (
    <>
      {/* Hero - Section */}
      <section
        // Layout -> Box Model -> Visual
        className="relative flex flex-row justify-start w-full h-90 bg-cover bg-center bg-no-repeat sm:items-center md:min-h-100 md:pt-0 md:bg-cover md:bg-right lg:min-h-120 lg:bg-cover lg:bg-right"
        style={{ backgroundImage: `url(${img1})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent md:bg-linear-to-r md:from-black/70 md:via-black/10 md:to-transparent"></div>

        {/* Kontainer Teks */}
        {/* Layout -> Box Model -> Tipografi -> Visual */}
        <div className="relative z-10 flex items-start justify-start max-w-xs px-5 py-5 text-left md:px-5 lg:p-10 lg:max-w-xl xl:max-w-2xl xl:pl-35 ">

          {/* Layout -> Box Model */}
          <div className="w-full max-w-3xs sm:max-w-sm md:max-w-md  xl:max-w-xl">

            {/* Tipografi -> Visual */}
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-parchment-600 uppercase drop-shadow-md xl:text-md xl:max-w-50">
              NEW COLLECTION 2026
            </span>

            {/* Box Model -> Tipografi -> Visual */}
            <h3 className="mt-1 mb-3 text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold text-parchment-900 leading-tight drop-shadow-lg xl:text-5xl">
              Upgrade Style Streetwear Kamu
            </h3>

            {/* Box Model -> Tipografi -> Visual */}
            <p className="mb-5 text-xs sm:text-sm md:text-base  text-parchment-700 leading-relaxed drop-shadow-md lg:text-xl lg:max-w-100 xl:max-w-150">
              Temukan koleksi sneakers terbaik untuk tampilan kasual yang tetap elegan.
            </p>

            {/* Box Model -> Tipografi -> Visual -> Interaksi */}
            <button className="w-30 py-2 px-3 rounded-xl bg-desert_sand-200 text-xs font-semibold text-desert_sand-900 shadow-lg drop-shadow-none transition-all sm:py-3 sm:text-xs md:w-50 md:px-4 md:py-3 md:text-base  hover:bg-desert_sand-100 hover:shadow-xl">
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
              <p className='text-xs' >on orders over 75$</p>
            </div>
          </div>

          <div className='w-1/2 flex flex-col items-center justify-center gap-3 md:w-1/4 md:flex-row' >
            <RotateCcw />
            <div className='flex flex-col items-center md:items-start'>
              <h3 className='text-sm md:text-md font-bold'>Easy Returs</h3>
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
      <section className='grid grid-cols-1 m-6 xl:grid-cols-2 xl:px-25 bg-linen-700'>
          {/* left container  */}
        <div >
           {/* Category Section */}
          <div>
            <CategorySection />
          </div>
          {/* Catalog Section */} 
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockProducts.map((p) => (
            <ProductCard key={p.id} product={p}/>
            ))}
          </div>
        </div>

        {/* right container  */}
        <div className='flex flex-col gap-6 w-full'>
          {/* Featured Grid */}
          <FeaturedGrid />
        
          {/* Promo Banner */}
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
  )
}


export default LandingPage;
