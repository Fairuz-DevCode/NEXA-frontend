import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  Search,
  Heart,
  Star,
  ShoppingBag,
  RotateCcw,
  Check,
  ChevronDown,
  X
} from 'lucide-react';
import { getProducts } from '../../api/products';
import { getImageUrl } from '../../utils/imageUrl';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCart } from '../../hooks/useCart';
import ProductCard from '../../components/common/ProductCard';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const { addToCart } = useCart();
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState({});

  // Filter States
  const [selectedTopCategory, setSelectedTopCategory] = useState('All Product');
  const [selectedGenders, setSelectedGenders] = useState(
    categoryParam === 'man' ? ['Man'] : categoryParam === 'girl' ? ['Woman'] : categoryParam === 'kids' ? ['Children'] : []
  );
  const [selectedBrands, setSelectedBrands] = useState(
    categoryParam === 'brand' ? ['Nike'] : []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSoles, setSelectedSoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Top Category Pills
  const topCategories = [
    'All Product',
    'Limited Edition',
    'Sneakers',
    'Boots',
    'Slippers',
    'Formal Shoes',
    'Sport shoes',
    'Slip-Ons',
    'Casual Shoes',
    'Loafers Shoes',
    'Running Shoes',
    'Basket Shoes',
  ];

  // Gender options
  const genders = ['Man', 'Woman', 'Children'];

  // Brand options
  const brandsList = ['Nike', 'Adidas', 'Reebook', 'Hoka', 'Converse', 'Nineten'];

  // Price range options
  const priceRanges = [
    { label: 'Under Rp 500rb', max: 500000 },
    { label: 'Rp 500rb - Rp 1.5jt', min: 500000, max: 1500000 },
    { label: 'Rp 1.5jt - Rp 3jt', min: 1500000, max: 3000000 },
    { label: 'Over Rp 3jt', min: 3000000 },
  ];

  // Color options with hex values
  const colorsList = [
    { name: 'Black', hex: '#000000', border: false },
    { name: 'Yellow', hex: '#FACC15', border: false },
    { name: 'Red', hex: '#EF4444', border: false },
    { name: 'Purple', hex: '#A855F7', border: false },
    { name: 'Blue', hex: '#3B82F6', border: false },
    { name: 'White', hex: '#FFFFFF', border: true },
    { name: 'Green', hex: '#22C55E', border: false },
    { name: 'Multicolor', gradient: 'linear-gradient(135deg, #ff0000, #00ff00, #0000ff)', border: false },
  ];

  // Material options
  const materialsList = ['Real Skin', 'Canvas', 'Synthetic Skin', 'Mesh'];

  // Sole options
  const solesList = ['Rubber Sole', 'EVA Sole'];

  // Mock catalog products matching reference image
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
    {
      id: 'm6',
      name: 'Nike V2K Run Metallic Black',
      sub: "Men's shoes",
      price: 2115000,
      oldPrice: 2275000,
      rating: 4.9,
      gender: 'Man',
      brand: 'Nike',
      category: 'Running Shoes',
      color: 'Black',
      material: 'Mesh',
      sole: 'EVA Sole',
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'm7',
      name: 'Nike Vomero 5 Deep Blue',
      sub: "Men's shoes",
      price: 2010000,
      oldPrice: 2085000,
      rating: 4.9,
      gender: 'Man',
      brand: 'Nike',
      category: 'Running Shoes',
      color: 'Blue',
      material: 'Mesh',
      sole: 'Rubber Sole',
      image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'm8',
      name: 'Nike Dunk Retro Pine Green',
      sub: "Men's shoes",
      price: 1875000,
      oldPrice: 1980000,
      rating: 4.9,
      gender: 'Man',
      brand: 'Nike',
      category: 'Sneakers',
      color: 'Green',
      material: 'Real Skin',
      sole: 'Rubber Sole',
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'm9',
      name: 'Nike Dunk Low Twice Gold',
      sub: "Men's shoes",
      price: 1965000,
      oldPrice: 2130000,
      rating: 4.9,
      gender: 'Man',
      brand: 'Nike',
      category: 'Limited Edition',
      color: 'Yellow',
      material: 'Real Skin',
      sole: 'Rubber Sole',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'm10',
      name: "Nike Air Force 1 '08 Royal Blue",
      sub: "Men's shoes",
      price: 1650000,
      oldPrice: 1770000,
      rating: 4.9,
      gender: 'Man',
      brand: 'Nike',
      category: 'Sneakers',
      color: 'Blue',
      material: 'Real Skin',
      sole: 'Rubber Sole',
      image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'm11',
      name: 'Nike Dunk Low Sky Blue',
      sub: "Men's shoes",
      price: 1800000,
      oldPrice: 1905000,
      rating: 4.9,
      gender: 'Man',
      brand: 'Nike',
      category: 'Sneakers',
      color: 'Blue',
      material: 'Real Skin',
      sole: 'Rubber Sole',
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'm12',
      name: 'Nike Air Force High Volt',
      sub: "Men's shoes",
      price: 2100000,
      oldPrice: 2280000,
      rating: 4.9,
      gender: 'Man',
      brand: 'Nike',
      category: 'Basket Shoes',
      color: 'Yellow',
      material: 'Synthetic Skin',
      sole: 'Rubber Sole',
      image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500&auto=format&fit=crop&q=80',
    },
  ];

  useEffect(() => {
    let isMounted = true;
    getProducts(1, 100)
      .then((data) => {
        if (isMounted) {
          const list = data?.products || data || [];
          setApiProducts(list);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Update gender filter when URL category param changes
  useEffect(() => {
    if (categoryParam === 'man') setSelectedGenders(['Man']);
    else if (categoryParam === 'girl') setSelectedGenders(['Woman']);
    else if (categoryParam === 'kids') setSelectedGenders(['Children']);
    else if (categoryParam === 'brand') setSelectedBrands(['Nike']);
    else if (categoryParam === 'sale') setSelectedTopCategory('Limited Edition');
    else if (categoryParam === 'newArrivals') setSelectedTopCategory('All Product');
  }, [categoryParam]);

  // Combined product list (API products + mock products for full display)
  const allProducts = useMemo(() => {
    const formattedApi = apiProducts.map((p) => ({
      id: p.id,
      name: p.name,
      sub: p.Category?.name || 'Streetwear Shoes',
      price: Number(p.price || 1500000),
      oldPrice: Math.round(Number(p.price || 1500000) * 1.15),
      rating: 4.9,
      gender: p.name.toLowerCase().includes('girl') || p.name.toLowerCase().includes('women') ? 'Woman' : 'Man',
      brand: p.name.split(' ')[0] || 'StreetWear',
      category: p.Category?.name || 'Sneakers',
      color: 'White',
      material: 'Real Skin',
      sole: 'Rubber Sole',
      image: getImageUrl(p.img_url || p.image_url || p),
      slug: p.slug,
    }));

    return [...formattedApi, ...mockProducts];
  }, [apiProducts]);

  // Filter handlers
  const handleToggleGender = (g) => {
    setSelectedGenders((prev) =>
      prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]
    );
  };

  const handleToggleBrand = (b) => {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((item) => item !== b) : [...prev, b]
    );
  };

  const handleToggleColor = (cName) => {
    setSelectedColors((prev) =>
      prev.includes(cName) ? prev.filter((item) => item !== cName) : [...prev, cName]
    );
  };

  const handleToggleMaterial = (m) => {
    setSelectedMaterials((prev) =>
      prev.includes(m) ? prev.filter((item) => item !== m) : [...prev, m]
    );
  };

  const handleToggleSole = (s) => {
    setSelectedSoles((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAllFilters = () => {
    setSelectedTopCategory('All Product');
    setSelectedGenders([]);
    setSelectedBrands([]);
    setSelectedPriceRange('');
    setSelectedColors([]);
    setSelectedMaterials([]);
    setSelectedSoles([]);
    setSearchQuery('');
    setSearchParams({});
  };

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      // Top category filter
      if (
        selectedTopCategory !== 'All Product' &&
        !p.category.toLowerCase().includes(selectedTopCategory.toLowerCase())
      ) {
        return false;
      }

      // Gender filter
      if (selectedGenders.length > 0 && !selectedGenders.includes(p.gender)) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // Color filter
      if (selectedColors.length > 0 && !selectedColors.includes(p.color)) {
        return false;
      }

      // Material filter
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(p.material)) {
        return false;
      }

      // Sole filter
      if (selectedSoles.length > 0 && !selectedSoles.includes(p.sole)) {
        return false;
      }

      // Price filter
      if (selectedPriceRange) {
        const range = priceRanges.find((r) => r.label === selectedPriceRange);
        if (range) {
          if (range.min && p.price < range.min) return false;
          if (range.max && p.price > range.max) return false;
        }
      }

      // Search query
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [
    allProducts,
    selectedTopCategory,
    selectedGenders,
    selectedBrands,
    selectedColors,
    selectedMaterials,
    selectedSoles,
    selectedPriceRange,
    searchQuery,
  ]);

  if (loading) return <LoadingSpinner text="Memuat katalog sepatu terbaru..." />;

  return (
    <div className="min-h-screen bg-parchment-DEFAULT px-4 sm:px-6 lg:px-10 py-8 font-body text-gray-900">
      
      {/* Page Title & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-headline tracking-tight text-gray-900">
            Product Catalog
          </h1>
          <p className="text-xs text-gray-500 font-label mt-0.5">
            Temukan koleksi sneakers terbaik dari top brand StreetWear
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Cari sepatu favorit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs outline-none focus:border-black transition-colors"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-2xl text-xs font-bold font-label shadow-sm shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. TOP CATEGORY PILLS BAR (WRAP IN MULTIPLE LINES)      */}
      {/* ======================================================== */}
      <div className="flex flex-wrap items-center gap-2.5 mb-8">
        {topCategories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTopCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold font-label transition-all ${
              selectedTopCategory === cat
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MAIN CONTAINER: SIDEBAR + PRODUCT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ======================================================== */}
        {/* 2. LEFT FILTER SIDEBAR (DESKTOP & MOBILE MODAL)           */}
        {/* ======================================================== */}
        <aside
          className={`lg:col-span-3 self-start sticky bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm space-y-6 lg:block ${
            isMobileFilterOpen ? 'block fixed inset-0 z-50 overflow-y-auto m-4 bg-white shadow-2xl' : 'hidden'
          }`}
        >
          {/* Mobile Modal Close Button */}
          {isMobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 lg:hidden">
              <h3 className="font-extrabold font-headline text-base">Filter Katalog</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-gray-500 hover:text-black rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Sidebar Title & Reset */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold font-headline text-base text-gray-900">Categories</h3>
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            </div>
            <button
              onClick={resetAllFilters}
              className="text-[11px] font-label font-bold text-gray-400 hover:text-black flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* 1. GENDER FILTER */}
          <div>
            <h4 className="text-xs font-bold font-label text-gray-800 mb-3">Gender</h4>
            <div className="space-y-2">
              {genders.map((g) => (
                <label key={g} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-black">
                  <input
                    type="checkbox"
                    checked={selectedGenders.includes(g)}
                    onChange={() => handleToggleGender(g)}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 2. BRAND FILTER */}
          <div>
            <h4 className="text-xs font-bold font-label text-gray-800 mb-3">Brand</h4>
            <div className="grid grid-cols-2 gap-2">
              {brandsList.map((b) => (
                <label key={b} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-black">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => handleToggleBrand(b)}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. PRICE FILTER */}
          <div>
            <h4 className="text-xs font-bold font-label text-gray-800 mb-3">Price Range</h4>
            <div className="space-y-2">
              {priceRanges.map((p) => (
                <label key={p.label} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-black">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === p.label}
                    onChange={() =>
                      setSelectedPriceRange(selectedPriceRange === p.label ? '' : p.label)
                    }
                    className="w-4 h-4 border-gray-300 text-black focus:ring-black accent-black"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. COLOR FILTER */}
          <div>
            <h4 className="text-xs font-bold font-label text-gray-800 mb-3">Color</h4>
            <div className="grid grid-cols-2 gap-2">
              {colorsList.map((c) => {
                const isSelected = selectedColors.includes(c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => handleToggleColor(c.name)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-xs text-left transition-all ${
                      isSelected
                        ? 'border-black bg-gray-50 font-bold text-gray-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full shrink-0 ${c.border ? 'border border-gray-300' : ''}`}
                      style={{ background: c.gradient || c.hex }}
                    />
                    <span className="truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. MATERIAL FILTER */}
          <div>
            <h4 className="text-xs font-bold font-label text-gray-800 mb-3">Material</h4>
            <div className="space-y-2">
              {materialsList.map((m) => (
                <label key={m} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-black">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(m)}
                    onChange={() => handleToggleMaterial(m)}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                  />
                  <span>{m}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 6. ON SOLE FILTER */}
          <div>
            <h4 className="text-xs font-bold font-label text-gray-800 mb-3">On Sole</h4>
            <div className="space-y-2">
              {solesList.map((s) => (
                <label key={s} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-black">
                  <input
                    type="checkbox"
                    checked={selectedSoles.includes(s)}
                    onChange={() => handleToggleSole(s)}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ======================================================== */}
        {/* 3. RIGHT PRODUCT CARDS GRID                             */}
        {/* ======================================================== */}
        <main className="lg:col-span-9">
          
          {/* Active Filter Chips Summary */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-label text-gray-500 font-bold">
              Menampilkan {filteredProducts.length} Produk
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-xs">
              <p className="text-sm text-gray-500 font-label mb-3">
                Tidak ada sepatu yang sesuai dengan kriteria filter Anda.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 bg-black text-white rounded-2xl text-xs font-bold font-label hover:bg-gray-800 transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>

    </div>
  );
};

export default ProductCatalog;