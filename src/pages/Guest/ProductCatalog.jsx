import React from 'react';
import { useCart } from '../../hooks/useCart';
import { PRODUCTS_DATA } from '../../services/productData';

const ProductCatalog = () => {
  return (
    <div className="my-5 mr-5 font-body text-parchment-100 lg:flex-center">
      <h2 className="text-xl font-bold mb-4 tracking-wide">Katalog StreetWear</h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4">

        {PRODUCTS_DATA.map((product) => (
          <div key={product.id} className="flex flex-col justify-between w-full p-3 rounded-2xl bg-white shadow-sm">

            {/* Bagian Atas*/}
            <div>
              {/* Box Gambar */}
              <div className="w-full h-40 mb-2 overflow-hidden rounded-xl bg-white">
                <img src={product.image} alt={product.name} className="object-cover object-center w-full h-full" />
              </div>

              {/* Nama Produk */}
              <h3 className="mt-0.5 text-md font-bold leading-snug line-clamp-2 text-parchment-100">
                {product.name}
              </h3>
            </div>

            {/* Bagian Bawah: Harga & Tombol */}
            <div className="mt-1">
              {/* Harga */}
              <p className="text-md font-extrabold text-desert-sand-300">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ProductCatalog;