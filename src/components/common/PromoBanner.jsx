import React from 'react';
import PromoImg from '../../assets/img/promo.png'

const PromoBanner = () => {
  return (
    // 1. TAG TERLUAR: Pakai w-full SAJA. Hapus mx-*, px-* di sini agar sejajar dengan card atasnya!
    <div 
      className="relative flex flex-row items-center justify-start w-full h-60 rounded-2xl bg-cover bg-center bg-no-repeat sm:h-56 "
      style={{ backgroundImage: `url(${PromoImg})` }}
    >
      
      {/* 2. KONTAINER TEKS: Padding p-6/pl-6 ditaruh DI DALAM sini untuk ngatur jarak tulisan */}
      <div className="flex flex-col items-start justify-center w-1/2 max-w-xs p-3 text-left sm:pl-8 md:max-w-sm lg:p-8">
        
        <div className="w-full">
          <span className="font-bold text-xs text-black tracking-widest uppercase">
            SPECIAL OFFER
          </span>

          <h3 className="mt-1 mb-2 font-extrabold text-xl text-black leading-tight sm:text-2xl lg:text-2xl">
            Summer Essentials
          </h3>

          <p className="mb-4 font-medium text-xs text-black leading-relaxed sm:text-sm">
            Dapatkan diskon hingga 30% untuk koleksi pilihan minggu ini.
          </p>

          <button className="px-4 py-2 rounded-xl bg-black font-semibold text-xs text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg sm:px-5 sm:py-2.5 md:text-sm">
            Shop Sale Now
          </button>
        </div>

      </div>

    </div>
  );
};

export default PromoBanner;