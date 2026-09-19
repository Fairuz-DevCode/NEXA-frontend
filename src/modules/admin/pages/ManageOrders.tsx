import React from 'react';
import { ShoppingBag, Truck } from 'lucide-react';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import Modal from '../../../shared/components/Modal';
import { useManageOrders } from '../hooks/useManageOrders';

export const ManageOrders: React.FC = () => {
  const {
    orders,
    loading,
    selectedOrderFilter,
    setSelectedOrderFilter,
    isShippingModalOpen,
    setIsShippingModalOpen,
    selectedOrder,
    shippingForm,
    setShippingForm,
    submitting,
    handleOpenShippingModal,
    handleUpdateShipping,
  } = useManageOrders();

  if (loading) return <LoadingSpinner text="Memuat daftar pesanan..." />;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xl shadow-gray-200/40 mb-8 font-body">
      {/* Header & Status Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h2 className="text-xl font-extrabold font-headline text-gray-900">
              Fulfillment Pipeline & Verifikasi Pesanan
            </h2>
          </div>
          <p className="text-xs text-gray-500 font-label mt-1">
            Proses intake otorisasi fisik, pencetakan sertifikat NFC, hingga serah terima logistik.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            'Semua Pesanan (1.428)',
            'Menunggu Pembayaran (18)',
            'Kurasi & Autentikasi (42)',
            'Dalam Pengiriman (84)',
            'Selesai (1.270)',
          ].map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOrderFilter(tab.split(' ')[0])}
              className={`px-3 py-1.5 rounded-full text-xs font-bold font-label transition-all cursor-pointer ${
                selectedOrderFilter === tab.split(' ')[0]
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full text-left text-xs font-body border-collapse">
          <thead>
            <tr className="bg-gray-50/80 text-gray-500 font-label font-bold border-b border-gray-200">
              <th className="py-3.5 px-4">ID PESANAN & WAKTU</th>
              <th className="py-3.5 px-4">PEMBELI / DESTINASI</th>
              <th className="py-3.5 px-4">ITEM PRODUK (SKU)</th>
              <th className="py-3.5 px-4">GATEWAY BAYAR</th>
              <th className="py-3.5 px-4">STATUS KURASI</th>
              <th className="py-3.5 px-4">NILAI TRANSAKSI</th>
              <th className="py-3.5 px-4 text-center">MANAJEMEN</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {orders.map((order) => {
              const orderId = order.id ? `#SX-${order.id}` : (order.id || '#SX-882118');
              const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              }) : (order.time || '12 Menit Lalu');
              const buyerName = order.buyer || order.User?.name || 'Pelanggan';
              const location = order.location || order.Address?.city || 'Jakarta';
              const itemText = order.item || (order.OrderItems?.[0]?.product_name ? `1x ${order.OrderItems[0].product_name}` : '1x Sneaker Item');
              const amount = order.amount || `Rp ${Number(order.total_amount || 2500000).toLocaleString('id-ID')}`;
              const statusText = order.status || 'PENDING';
              const actionLabel = order.action || 'Update Resi';
              const actionColor = order.actionColor || 'bg-black text-white hover:bg-gray-800';

              return (
                <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-gray-900 font-mono">{orderId}</span>
                    <p className="text-[11px] text-gray-400">{dateStr}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <h4 className="font-bold text-gray-900">{buyerName}</h4>
                    <p className="text-[11px] text-gray-500">{location}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-gray-800">{itemText}</p>
                    <span className="text-[10px] text-gray-400 font-mono">{order.skuTag || 'NFC Tag #VAULT-991'}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-700">{order.payment || 'BCA Virtual Account'}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
                      • {statusText}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-gray-900">{amount}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleOpenShippingModal(order)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold font-label transition-all shadow-xs flex items-center gap-1.5 mx-auto cursor-pointer ${actionColor}`}
                    >
                      <Truck size={14} />
                      <span>{actionLabel}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Update Resi */}
      <Modal
        isOpen={isShippingModalOpen}
        onClose={() => setIsShippingModalOpen(false)}
        title={`Update Pengiriman ${selectedOrder?.id}`}
      >
        <form onSubmit={handleUpdateShipping} className="space-y-4 font-body">
          <div>
            <label className="block text-xs font-label font-bold text-gray-700 mb-1">Kurir Pengiriman</label>
            <input
              type="text"
              required
              placeholder="JNE / J&T / Sicepat"
              value={shippingForm.courier}
              onChange={(e) => setShippingForm({ ...shippingForm, courier: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-black outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-label font-bold text-gray-700 mb-1">Nomor Resi (Tracking Number)</label>
            <input
              type="text"
              required
              placeholder="e.g. JNE1234567890"
              value={shippingForm.tracking_number}
              onChange={(e) => setShippingForm({ ...shippingForm, tracking_number: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-black outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-label font-bold text-gray-700 mb-1">Status Pengiriman</label>
            <select
              value={shippingForm.shipping_status}
              onChange={(e) => setShippingForm({ ...shippingForm, shipping_status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-black outline-none bg-white font-label"
            >
              <option value="PROCESSING">PROCESSING</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-black text-white font-label font-bold rounded-xl text-sm hover:bg-gray-800 transition-colors mt-2 cursor-pointer"
          >
            {submitting ? 'Menyimpan...' : 'Simpan Update Resi'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageOrders;
