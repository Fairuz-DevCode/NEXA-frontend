import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, CheckCircle2, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

import { createOrder } from '../../api/orders';
import { createPayment } from '../../api/payments';
import { calculateShippingCost } from '../../api/admin';
import { getAddresses, createAddress } from '../../api/address';

import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/ui/Modal';

import { getImageUrl } from '../../utils/imageUrl';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartData, clearCart, cartLoading } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  // New address modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddrForm, setNewAddrForm] = useState({
    label: '',
    phone: '',
    street_address: '',
    city: '',
    country: 'Indonesia',
    postal_code: '',
  });

  // Shipping & Payment
  const [shippingCost, setShippingCost] = useState(25000);
  const [courier, setCourier] = useState('JNE Regular');
  const [paymentType, setPaymentType] = useState('bank_transfer');
  const [submittingOrder, setSubmittingOrder] = useState(false);

  // Success modal state
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  const items = cartData?.items || [];
  const totalHargaProduk = cartData?.total_price || 0;
  const totalGrand = totalHargaProduk + shippingCost;

  // Load addresses
  useEffect(() => {
    let isMounted = true;
    setLoadingAddresses(true);
    getAddresses()
      .then((data) => {
        if (isMounted && data) {
          setAddresses(data);
          if (data.length > 0) setSelectedAddressId(data[0].id);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoadingAddresses(false);
      });
    return () => { isMounted = false; };
  }, []);

  // Update shipping cost on address selection
  useEffect(() => {
    if (selectedAddressId) {
      calculateShippingCost({ address_id: selectedAddressId, courier })
        .then((res) => {
          if (res?.cost) setShippingCost(Number(res.cost));
        })
        .catch(() => {
          setShippingCost(25000);
        });
    }
  }, [selectedAddressId, courier]);

  // Handle new address submit
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const created = await createAddress(newAddrForm);
      const updated = await getAddresses();
      setAddresses(updated);
      if (created?.id) setSelectedAddressId(created.id);
      setIsModalOpen(false);
      setNewAddrForm({
        label: '',
        phone: '',
        street_address: '',
        city: '',
        country: 'Indonesia',
        postal_code: '',
      });
    } catch (err) {
      alert('Gagal menambah alamat: ' + (err.response?.data?.message || err.message));
    }
  };

  // Submit Order
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert('Silakan pilih atau tambahkan alamat pengiriman terlebih dahulu.');
      return;
    }

    try {
      setSubmittingOrder(true);
      // 1. Create order
      const order = await createOrder({
        address_id: selectedAddressId,
        shipping_cost: shippingCost,
      });

      // 2. Create payment
      let paymentRes = null;
      if (order?.id) {
        try {
          paymentRes = await createPayment({
            order_id: order.id,
            payment_type: paymentType,
          });
        } catch {
          // Payment creation optional fallback
        }
      }

      // 3. Clear cart
      clearCart();
      setOrderSuccessData({ order, payment: paymentRes });
    } catch (err) {
      alert('Gagal membuat order: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmittingOrder(false);
    }
  };

  if (cartLoading || loadingAddresses) {
    return <LoadingSpinner text="Memuat halaman checkout..." />;
  }

  if (items.length === 0 && !orderSuccessData) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-body">
      <h1 className="text-2xl font-extrabold font-headline text-gray-900 mb-6">
        Checkout & Pembayaran
      </h1>

      {orderSuccessData ? (
        /* SUCCESS ORDER SCREEN */
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold font-headline text-gray-900 mb-2">
            Pesanan Berhasil Dibuat!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Nomor Pesanan: <strong className="text-gray-900">#{orderSuccessData.order?.id}</strong>
          </p>

          <div className="bg-gray-50 p-4 rounded-xl text-left text-xs space-y-2 mb-6 font-label">
            <div className="flex justify-between">
              <span className="text-gray-500">Status Order:</span>
              <span className="font-bold text-amber-600 uppercase">
                {orderSuccessData.order?.status || 'PENDING'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Metode Pembayaran:</span>
              <span className="font-bold text-gray-800 uppercase">
                {paymentType.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Pembayaran:</span>
              <span className="font-bold text-desert_sand-600 text-sm">
                Rp {totalGrand.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/orders')}
            className="w-full py-3 rounded-xl bg-black text-white font-label font-bold text-sm hover:bg-gray-800 transition-colors"
          >
            Lihat Status Pesanan Saya
          </button>
        </div>
      ) : (
        /* CHECKOUT FORM */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Address & Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Alamat Pengiriman */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-900" />
                  <h2 className="text-base font-bold font-headline text-gray-900">
                    1. Alamat Pengiriman
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-label font-bold text-gray-900 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Alamat
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">
                  <p className="text-xs text-gray-500 mb-3">Belum ada alamat pengiriman tersimpan.</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-black text-white text-xs font-label rounded-xl"
                  >
                    + Tambah Alamat Pertama
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-black bg-gray-50 ring-1 ring-black'
                            : 'border-gray-200 bg-white hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-label font-bold uppercase text-gray-900 bg-gray-200 px-2 py-0.5 rounded-md">
                            {addr.label}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <p className="text-xs font-bold text-gray-900 mt-1">{addr.phone}</p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {addr.street_address}, {addr.city}, {addr.postal_code}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Kurir Pengiriman */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
                <Truck className="w-5 h-5 text-gray-900" />
                <h2 className="text-base font-bold font-headline text-gray-900">
                  2. Metode Pengiriman
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['JNE Regular (Rp 25.000)', 'J&T Express (Rp 28.000)', 'Sicepat Best (Rp 30.000)'].map((opt) => {
                  const isSelected = courier.startsWith(opt.split(' ')[0]);
                  return (
                    <button
                      key={opt}
                      onClick={() => setCourier(opt)}
                      className={`p-3 rounded-xl border text-left text-xs font-label transition-all ${
                        isSelected ? 'border-black bg-gray-50 font-bold' : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Metode Pembayaran */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
                <CreditCard className="w-5 h-5 text-gray-900" />
                <h2 className="text-base font-bold font-headline text-gray-900">
                  3. Metode Pembayaran
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'bank_transfer', label: 'Transfer Bank / VA' },
                  { id: 'qris', label: 'QRIS / E-Wallet' },
                  { id: 'credit_card', label: 'Kartu Kredit' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentType(pm.id)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-label transition-all ${
                      paymentType === pm.id
                        ? 'border-black bg-gray-50 font-bold text-gray-900'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary Sidebar */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit space-y-4">
            <h2 className="text-base font-bold font-headline text-gray-900 border-b border-gray-100 pb-3">
              Ringkasan Pesanan
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={getImageUrl(item.product_img_url || item.Product?.img_url || item)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 line-clamp-1">{item.product_name || item.Product?.name || 'Produk'}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-gray-900">
                    Rp {(Number(item.price_at_addition || item.Product?.price || 0) * item.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-xs font-body">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal Produk</span>
                <span className="font-semibold text-gray-900">Rp {totalHargaProduk.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Biaya Pengiriman</span>
                <span className="font-semibold text-gray-900">Rp {shippingCost.toLocaleString('id-ID')}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-sm font-bold">
                <span className="text-gray-900">Total Tagihan</span>
                <span className="text-lg font-black text-desert_sand-600 font-headline">
                  Rp {totalGrand.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              disabled={submittingOrder}
              onClick={handlePlaceOrder}
              className="w-full py-3 px-4 rounded-xl bg-black text-white font-label font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 disabled:bg-gray-400 transition-all shadow-md"
            >
              {submittingOrder ? 'Memproses Pesanan...' : 'Buat Pesanan Sekarang'} <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-gray-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Transaksi 100% Aman & Terenkripsi</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Address */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Alamat Baru">
        <form onSubmit={handleAddAddress} className="space-y-4">
          <div>
            <label className="block text-xs font-label font-bold text-gray-700 mb-1">Label Alamat</label>
            <input
              type="text"
              required
              placeholder="Rumah / Kantor / Apartemen"
              value={newAddrForm.label}
              onChange={(e) => setNewAddrForm({ ...newAddrForm, label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-black outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-label font-bold text-gray-700 mb-1">Nomor Telepon Penerima</label>
            <input
              type="text"
              required
              placeholder="08123456789"
              value={newAddrForm.phone}
              onChange={(e) => setNewAddrForm({ ...newAddrForm, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-black outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-label font-bold text-gray-700 mb-1">Alamat Lengkap</label>
            <textarea
              required
              rows={2}
              placeholder="Nama Jalan, RT/RW, No. Rumah"
              value={newAddrForm.street_address}
              onChange={(e) => setNewAddrForm({ ...newAddrForm, street_address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-black outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-label font-bold text-gray-700 mb-1">Kota</label>
              <input
                type="text"
                required
                placeholder="Jakarta Selatan"
                value={newAddrForm.city}
                onChange={(e) => setNewAddrForm({ ...newAddrForm, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-black outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-label font-bold text-gray-700 mb-1">Kode Pos</label>
              <input
                type="text"
                required
                placeholder="12340"
                value={newAddrForm.postal_code}
                onChange={(e) => setNewAddrForm({ ...newAddrForm, postal_code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-black outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-black text-white font-label font-bold rounded-xl text-sm hover:bg-gray-800 transition-colors mt-2"
          >
            Simpan Alamat
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Checkout;
