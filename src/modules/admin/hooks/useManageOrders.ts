import { useState, useEffect } from 'react';
import { getOrderHistory } from '../../profile/services/profileApi';
import { adminUpdateShipping } from '../services/adminApi';

export const defaultDisplayOrders = [
  {
    id: 'SX-882118',
    time: '12 Menit Lalu • Web Store',
    buyer: 'Aditya P. Wibowo',
    location: 'Kebayoran Baru, Jakarta Selatan',
    item: '1x NB 550 Artisanal Oatmeal (EU 42)',
    skuTag: 'NFC Tag #VAULT-991',
    payment: 'BCA Virtual Account',
    status: 'Di Meja Verifikasi',
    amount: 'Rp 2.510.000',
    action: 'Lakukan Autentikasi',
    actionColor: 'bg-black text-white hover:bg-gray-800',
  },
  {
    id: 'SX-882109',
    time: '35 Menit Lalu • iOS App',
    buyer: 'Regina Maharani',
    location: 'Cidadap, Kota Bandung',
    item: '1x StrideX Chelsea Italian (EU 38)',
    skuTag: 'NFC Tag #VAULT-843',
    payment: 'Visa ••8104',
    status: 'Sertifikat Terbit',
    amount: 'Rp 3.870.000',
    action: 'Cetak Resi Sicepat',
    actionColor: 'bg-emerald-600 text-white hover:bg-emerald-700',
  },
  {
    id: 'SX-882104',
    time: '2 Jam Lalu • Web Store',
    buyer: 'Taufik Hidayatullah',
    location: 'Gubeng, Kota Surabaya',
    item: '1x Heritage Sovereign Oxford (EU 42)',
    skuTag: 'Resi JNE-092321907',
    payment: 'GoPay E-Wallet',
    status: 'Transit Kurir',
    amount: 'Rp 3.250.000',
    action: 'Lacak Real-Time',
    actionColor: 'bg-blue-600 text-white hover:bg-blue-700',
  },
];

export const useManageOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderFilter, setSelectedOrderFilter] = useState('Semua');

  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [shippingForm, setShippingForm] = useState({
    courier: 'JNE',
    tracking_number: '',
    shipping_status: 'SHIPPED',
  });
  const [submitting, setSubmitting] = useState(false);

  const loadOrders = () => {
    setLoading(true);
    getOrderHistory()
      .then((data) => {
        const fetchedOrders = data || [];
        setOrders(fetchedOrders.length > 0 ? fetchedOrders : defaultDisplayOrders);
      })
      .catch(() => setOrders(defaultDisplayOrders))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleOpenShippingModal = (order: any) => {
    setSelectedOrder(order);
    const shipping = order.Shipping || {};
    setShippingForm({
      courier: shipping.courier || 'JNE',
      tracking_number: shipping.tracking_number || '',
      shipping_status: shipping.shipping_status || 'SHIPPED',
    });
    setIsShippingModalOpen(true);
  };

  const handleUpdateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    try {
      setSubmitting(true);
      await adminUpdateShipping(selectedOrder.id, shippingForm);
      setIsShippingModalOpen(false);
      loadOrders();
    } catch {
      setIsShippingModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
  };
};
