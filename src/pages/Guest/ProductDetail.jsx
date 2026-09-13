import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  Clock,
  Heart,
  ChevronRight
} from 'lucide-react';
import { getProductById, getBySlugPath } from '../../api/products';
import { useCart } from '../../hooks/useCart';
import { getImageUrl } from '../../utils/imageUrl';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchDetail = /^\d+$/.test(id) ? getProductById(id) : getBySlugPath(id);

    fetchDetail
      .then((res) => {
        if (isMounted && res) {
          const data = res.product || res;
          setProduct(data);
          const primaryImg = getImageUrl(data.img_url || data.image_url || data);
          setSelectedImage(primaryImg);

          // Build 4 gallery images for thumbnail grid matching reference design
          const fallbackGallery = [
            primaryImg,
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
          ];
          setGalleryImages(fallbackGallery);

          const variants = data.variants || data.Variants || [];
          if (variants.length > 0) {
            setSelectedVariant(variants[0]);
          }
        }
      })
      .catch((err) => {
        if (isMounted) setErrorMsg('Gagal memuat detail produk. ' + (err.response?.data?.message || ''));
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product.id, selectedVariant?.id, quantity);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    } catch (err) {
      alert('Gagal menambah ke keranjang: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    try {
      await addToCart(product.id, selectedVariant?.id, quantity);
      navigate('/cart');
    } catch (err) {
      alert('Gagal memproses pembelian: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <LoadingSpinner text="Memuat detail produk..." />;
  if (errorMsg || !product) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center font-body">
        <p className="text-red-600 mb-4">{errorMsg || 'Produk tidak ditemukan.'}</p>
        <button
          onClick={() => navigate('/product')}
          className="px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold font-label"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const displayPrice = Number(product.price || 899000).toLocaleString('id-ID');
  const variants = product.variants || product.Variants || [
    { id: 1, size: '36', stock: 10 },
    { id: 2, size: '37', stock: 15 },
    { id: 3, size: '38', stock: 8 },
    { id: 4, size: '39', stock: 12 },
    { id: 5, size: '40', stock: 5 },
    { id: 6, size: '41', stock: 9 },
  ];

  return (
    <div className="min-h-screen bg-parchment-DEFAULT pb-16 font-body text-gray-900">
      
      {/* Top Summer Sale Announcement Bar matching reference */}
      <div className="bg-black text-white py-2 px-4 text-center text-xs font-bold font-label tracking-wide flex items-center justify-center gap-2">
        <span>Get 25% Off This Summer Sale. Grab It Fast!!</span>
        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-mono">15H : 45M : 37S</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 text-xs text-gray-500 font-label">
          <Link to="/" className="hover:text-black transition-colors">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/product" className="hover:text-black transition-colors">Katalog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold truncate">{product.name}</span>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: HERO IMAGE & 4 THUMBNAILS                   */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Hero Image Container */}
            <div className="w-full h-100 sm:h-115 rounded-3xl bg-[#F3F4F6] border border-gray-100 overflow-hidden flex items-center justify-center p-6 relative shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain transition-all duration-300"
              />

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm text-gray-400 hover:text-red-500 transition-colors"
                title="Tambah ke Favorit"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* 4 Thumbnail Gallery Grid */}
            <div className="grid grid-cols-4 gap-3.5">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-full h-24 sm:h-28 rounded-2xl bg-[#F3F4F6] border overflow-hidden p-2 flex items-center justify-center transition-all ${
                    selectedImage === img
                      ? 'border-2 border-black shadow-sm'
                      : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: PRODUCT INFORMATION & PURCHASE FORM       */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-gray-900 tracking-tight mb-2">
                {product.name}
              </h1>

              {/* Rating & Social Proof Row */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-label text-gray-600">
                <div className="flex items-center gap-1 font-bold text-gray-900">
                  <Star className="w-4 h-4 fill-black text-black" />
                  <span>(4,9)</span>
                </div>
                <span className="text-gray-300">•</span>
                <span>9,2K Reviews</span>
                <span className="text-gray-300">•</span>
                <span className="bg-gray-100 px-2.5 py-1 rounded-full text-gray-800 font-bold">
                  {selectedVariant ? `Stok: ${selectedVariant.stock}` : 'Tersedia'}
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 mb-4">
                <p className="text-2xl sm:text-3xl font-black font-headline text-gray-900">
                  Rp {displayPrice}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200 mb-6">
                <h3 className="text-sm font-bold font-headline text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-body whitespace-pre-line">
                  {product.description ||
                    'Sepatu sneakers ikonik dengan konstruksi material premium dan bantalan udara empuk. Dirancang khusus untuk memberikan kenyamanan maksimal sepanjang hari dengan estetika streetwear modern yang bold.'}
                </p>
              </div>

              {/* Color Selector Display */}
              <div className="mb-5">
                <p className="text-xs font-bold font-label text-gray-800">
                  Color : <span className="font-semibold text-gray-600">Cream / White Suede</span>
                </p>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <p className="text-xs font-bold font-label text-gray-800 mb-2.5">
                  Size :
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    const isOutOfStock = Number(v.stock) <= 0;
                    return (
                      <button
                        key={v.id}
                        disabled={isOutOfStock}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold font-label border transition-all ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md'
                            : isOutOfStock
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                            : 'bg-white text-gray-800 border-gray-300 hover:border-black'
                        }`}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector & Action Buttons (User: "jangan hilangkan count quantity nya") */}
              <div className="space-y-3 mb-6">
                
                {/* Quantity Pill Counter */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold font-label text-gray-800">Jumlah :</span>
                  <div className="flex items-center border border-gray-300 rounded-full px-3 py-1.5 bg-white shadow-xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 font-extrabold text-base transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-extrabold font-label min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 font-extrabold text-base transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Action 1: Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 rounded-full bg-[#111111] hover:bg-black text-white text-sm font-extrabold font-label shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  Buy Now
                </button>

                {/* Secondary Action 2: Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm font-extrabold font-label shadow-xs transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Cart</span>
                </button>

                {/* Success Notification Banner */}
                {addedSuccess && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold">Produk berhasil ditambahkan ke keranjang belanja!</span>
                  </div>
                )}
              </div>

              {/* Description Section */}
              


            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetail;
