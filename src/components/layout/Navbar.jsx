import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footprints, Menu, Search, ShoppingBag, X, User } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { currentUser, logout } = useAuth();

  return (
    <nav className='fixed top-0 left-0 z-50 flex items-center justify-between w-full h-14 bg-linen-600 px-4 text-parchment-100 font-body shadow-md border-b border-linen-700/20'>

      {/* Left-Navbar */}
      <div className="flex items-center gap-1 lg:pl-10 xl:pl-30">
        <Link to='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-parchment-100 text-linen-600 shadow-sm">
            <Footprints className='w-5 h-5 text-linen-600' />
          </div>
          <div>
            <h1 className='font-bold text-sm text-parchment-100 tracking-wider font-headline'>NEXA</h1> {/* Next Evolution of Aerodynamics */}
          </div>
        </Link>
      </div>

      <div className="hidden md:flex justify-between items-center gap-1 max-w-2xl h-10 mt-2 p-1.5">
        {currentUser?.role === 'admin' ? (
          <>
            <Link
              to='/admin/dashboard'
              onClick={() => setIsMenuOpen(false)}
              className='flex justify-center items-center px-3 py-2 text-xs lg:text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-300/80 hover:text-linen-800 transition-colors whitespace-nowrap'
            >
              Dashboard
            </Link>

            <Link
              to='/admin/products'
              onClick={() => setIsMenuOpen(false)}
              className='flex justify-center items-center px-3 py-2 text-xs lg:text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-300/80 hover:text-linen-800 transition-colors whitespace-nowrap'
            >
              Manage Produk
            </Link>

            <Link
              to='/admin/orders'
              onClick={() => setIsMenuOpen(false)}
              className='flex justify-center items-center px-3 py-2 text-xs lg:text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-300/80 hover:text-linen-800 transition-colors whitespace-nowrap'
            >
              Manage Pesanan
            </Link>

            <Link
              to='/admin/discount'
              onClick={() => setIsMenuOpen(false)}
              className='flex justify-center items-center px-3 py-2 text-xs lg:text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-300/80 hover:text-linen-800 transition-colors whitespace-nowrap'
            >
              Manage Discount
            </Link>
          </>
        ) : (
          <>
            {/* --- GRP Kategori --- */}
            <Link
              to='/product?category=Sneakers & Kasual'
              onClick={() => setIsMenuOpen(false)}
              className='flex justify-center items-center w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-300/80 hover:text-linen-800'
            > Sneakers & Kasual
            </Link>

            <Link
              to='/product?category=Formal & Dress Shoes'
              onClick={() => setIsMenuOpen(false)}
              className='flex justify-center items-center w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-300/80 hover:text-linen-800'
            > Formal & Dress Shoes
            </Link>

            <Link
              to='/product?category=Boots'
              onClick={() => setIsMenuOpen(false)}
              className='flex justify-center items-center w-full  px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-300/80 hover:text-linen-800'
            > Boots
            </Link>

            <Link
              to='/product?category=Heels & Flats'
              onClick={() => setIsMenuOpen(false)}
              className='justify-center items-center w-full flex  px-3 py-2 text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-300/80 hover:text-linen-800'
            > Heels & Flats
            </Link>

            <Link
              to='/product?category=Athletic'
              onClick={() => setIsMenuOpen(false)}
              className='flex justify-center items-center w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-300/80 hover:text-linen-800'
            > Athletic
            </Link>
          </>
        )}
      </div>

      {/* Right-Navbar */}
      <div className="flex items-center gap-3 lg:pr-10 xl:pr-30 relative z-10">
        {/* Search Bar Melar Kecil */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Cari produk..."
            className={`bg-linen-700/40 text-parchment-100 text-xs rounded-full outline-none transition-all duration-300 border border-linen-700/20 focus:border-parchment-300/40 ${isSearchOpen ? 'w-36 py-1.5 px-3 pr-8 opacity-100' : 'w-0 opacity-0 pointer-events-none'
              }`}
          />
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`flex items-center justify-center cursor-pointer p-1.5 hover:bg-linen-700/40 rounded-full transition-all duration-300 ${isSearchOpen ? 'absolute right-1' : ''}`}
          >
            {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>
        </div>

        {/* Profile, Icon Keranjang, & Menu */}
        <div className="flex items-center gap-1 lg:gap-2">
          {currentUser && (
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-1.5 bg-linen-700/40 hover:bg-linen-700/80 cursor-pointer rounded-full mr-1 transition-colors"
            >
              <User className="w-4 h-4 text-parchment-100" />
              <span className="text-xs font-bold text-parchment-100 hidden md:block truncate max-w-100">
                {currentUser.name || currentUser.username || currentUser.email}
              </span>
            </Link>
          )}

          <Link 
            to="/cart" 
            className="flex items-center justify-center cursor-pointer p-2 relative hover:bg-linen-700/40 rounded-full transition-colors"
          >
            <ShoppingBag className='text-parchment-100 w-4 h-4' />
            {getCartCount() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-desert_sand-400 text-linen-100 text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                {getCartCount()}
              </span>
            )}
          </Link>

          {currentUser ? (
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className='px-3 py-2 text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80 cursor-pointer'
            >
              Logout
            </button>
          ) : (
            <Link
              to='/login'
              onClick={() => setIsMenuOpen(false)}
              className='px-3 py-2 text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
            > Login
            </Link>
          )}


          <div className="relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} // not !false
              className="md:hidden flex items-center justify-center cursor-pointer p-2 hover:bg-linen-700/40 rounded-full transition-colors"
            > <Menu className='text-parchment-100 w-4 h-4' />
            </button>

            {isMenuOpen && (
              <div className="md:hidden absolute right-0 z-50 w-48 mt-2 p-2 rounded-xl shadow-lg bg-linen-800 border border-linen-700/40 space-y-1">

                {currentUser?.role === 'admin' ? (
                  <>
                    <Link
                      to='/admin/dashboard'
                      onClick={() => setIsMenuOpen(false)}
                      className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                    >
                      Dashboard
                    </Link>

                    <Link
                      to='/admin/products'
                      onClick={() => setIsMenuOpen(false)}
                      className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                    >
                      Manage Produk
                    </Link>

                    <Link
                      to='/admin/orders'
                      onClick={() => setIsMenuOpen(false)}
                      className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                    >
                      Manage Pesanan
                    </Link>

                    <Link
                      to='/admin/discount'
                      onClick={() => setIsMenuOpen(false)}
                      className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                    >
                      Manage Discount
                    </Link>
                  </>
                ) : (
                  <>
                    {/* --- GRP Kategori --- */}
                    <Link
                      to='/product?category=Sneakers & Kasual'
                      onClick={() => setIsMenuOpen(false)}
                      className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                    > Sneakers & Kasual
                    </Link>

                    <Link
                      to='/product?category=Formal & Dress Shoes'
                      onClick={() => setIsMenuOpen(false)}
                      className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                    > Formal & Dress Shoes
                    </Link>

                    <Link
                      to='/product?category=Boots'
                      onClick={() => setIsMenuOpen(false)}
                      className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                    > Boots
                    </Link>

                    <Link
                      to='/product?category=Heels & Flats'
                      onClick={() => setIsMenuOpen(false)}
                      className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                    > Heels & Flats
                    </Link>

                    <Link
                      to='/product?category=Athletic'
                      onClick={() => setIsMenuOpen(false)}
                      className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                    > Athletic
                    </Link>
                  </>
                )}

                <hr className='my-1.5 border-linen-200' />

                {currentUser ? (
                  <>
                    <Link
                      to='/profile'
                      onClick={() => setIsMenuOpen(false)}
                      className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                    >
                      Profil Saya
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to='/login'
                    onClick={() => setIsMenuOpen(false)}
                    className='block w-full px-3 py-2 text-left text-sm font-bold rounded-lg text-parchment-100 hover:bg-linen-700/80'
                  > Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;