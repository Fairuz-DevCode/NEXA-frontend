import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '../../cart';
import { getImageUrl } from '../../../shared/utils/imageUrl';
import { Product } from '../../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const displayPrice = product.price
    ? Number(product.price).toLocaleString('id-ID')
    : '0';

  const primaryImage = getImageUrl(product.img_url || (product as any).image_url || product.image || product);

  const productPath = (product as any).slug
    ? `/product/${(product as any).Category?.slug ? `${(product as any).Category.slug}/` : ''}${(product as any).slug}`
    : `/product/${product.id}`;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variants = (product as any).variants || (product as any).Variants || [];
    const firstVariantId = variants[0]?.id;
    addToCart(product.id, firstVariantId, 1);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const brandName = product.brand || (product as any).Brand?.name || 'Nike';
  const tagLabel = (product as any).tag || 'Best Seller';

  return (
    <div className="group relative flex flex-col justify-between w-full p-4 sm:p-5 rounded-3xl bg-white shadow-md shadow-gray-200/50 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Top Image Container */}
      <div className="relative w-full h-52 sm:h-56 mb-4 flex items-center justify-center p-1 overflow-hidden">
        {/* Brand Logo Pill Top-Left */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-xs flex items-center justify-center border border-gray-100">
          {brandName.toLowerCase() === 'nike' ? (
            <svg className="w-6 h-3 text-black fill-current" viewBox="0 0 24 24">
              <path d="M21.71 5.3a.5.5 0 0 0-.64-.06L4.7 17.15a.5.5 0 0 1-.7-.16l-1.84-3.13a.5.5 0 0 0-.8-.08l-.22.25a.5.5 0 0 0 .04.68l3.66 3.66a.5.5 0 0 0 .73 0l16.14-12.8a.5.5 0 0 0-.2-.27z" />
            </svg>
          ) : (
            <span className="text-[10px] font-extrabold font-label tracking-wider uppercase text-gray-900">
              {brandName}
            </span>
          )}
        </div>

        {/* Product Image */}
        <Link to={productPath} className="w-full h-full flex items-center justify-center">
          <img
            src={primaryImage}
            alt={product.name}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80';
            }}
            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Bottom Carousel Dots */}
        <div className="absolute bottom-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
        </div>
      </div>

      {/* Card Info Body */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold font-label bg-emerald-50 text-emerald-700 border border-emerald-100">
            {tagLabel}
          </span>
          <button
            onClick={toggleFavorite}
            className="p-1 text-gray-400 hover:scale-110 transition-transform cursor-pointer"
            title="Tambah ke Favorit"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-red-500 fill-red-500'
              }`}
            />
          </button>
        </div>

        <Link to={productPath} className="block mt-2 mb-3">
          <h3 className="text-sm sm:text-base font-extrabold font-headline text-gray-900 line-clamp-1 hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div>
            <span className="block text-[10px] text-gray-400 font-bold font-label uppercase tracking-wider">
              Price
            </span>
            <span className="text-base sm:text-lg font-black font-headline text-emerald-600">
              Rp {displayPrice}
            </span>
          </div>
          <button
            onClick={handleBuyNow}
            className="px-5 sm:px-6 py-2.5 rounded-full bg-[#222222] hover:bg-black text-white text-xs font-extrabold font-label shadow-sm hover:shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
