import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Download,
  Plus,
  Activity,
  ShieldCheck,
  Check,
  QrCode,
  XCircle,
  Lock,
  Layers,
} from 'lucide-react';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ManageProduct from './ManageProduct';
import ManageOrders from './ManageOrders';
import ManageDiscount from './ManageDiscount';
import { useAdminDashboard } from '../hooks/useAdminDashboard';

export const Dashboard: React.FC = () => {
  const { loading } = useAdminDashboard();

  if (loading) return <LoadingSpinner text="Memuat Pusat Komando Admin..." />;

  const topMetrics = [
    {
      title: 'Total Nilai Omset (GMV)',
      value: 'Rp 842.650.000',
      change: '+18.4% MoM',
      subtext: 'Target: Rp 900B (93.6%)',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'Total Transaksi Bulanan',
      value: '1.428 Unit',
      change: '+12.1% vs prev',
      subtext: '95 Pesanan / Hari',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'Akurasi Verifikasi Kurasi',
      value: '99.8% Pass',
      change: 'Rate: Optimal',
      subtext: '3 Void Internal • 1.415 Passed',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'Rata-rata Keranjang (AOV)',
      value: 'Rp 2.450.000',
      change: '+4.3% Basket Lift',
      subtext: 'Paling Tinggi: Sneakers',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  const auditLogs = [
    {
      time: '28/09 14:41:03',
      actor: 'fafa.ops (SuperAdmin)',
      action: 'UPDATE_PRICE_BATCH',
      target: 'SKU: STX-CBL-BRN-04',
      status: 'SUCCESS (200)',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      time: '28/09 13:20:18',
      actor: 'dimas.curator (Inspector)',
      action: 'NFC_TAG_ISSUED',
      target: 'OID: SX-882109',
      status: 'SUCCESS (200)',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      time: '28/09 11:05:44',
      actor: 'asia.gateway (System)',
      action: 'PAYMENT_WEBHOOK',
      target: 'VR: 02741300218',
      status: 'SETTLED',
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      time: '28/09 09:12:30',
      actor: 'guest.attempt (Unknown)',
      action: 'FAILED_AUTH_CHALLENGE',
      target: 'IP: 180.229.181.4',
      status: 'BLOCKED (401)',
      statusColor: 'bg-red-100 text-red-800',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-10 font-body text-gray-900">
      {/* 1. TOP HEADER & DASHBOARD CONTROLS */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-lg shadow-gray-200/40">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase font-label bg-black text-white tracking-wider">
                STRIDEX BACKOFFICE ENGINE
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-label bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Sync Real-Time
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-headline text-gray-900 tracking-tight">
              Pusat Komando Operasional & Inventaris
            </h1>
            <p className="text-xs text-gray-500 font-label mt-1">
              Ringkasan performa penjualan, autentikasi fisik kurasi, matriks stok vault, & fulfillment pipeline.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 px-3.5 py-2 rounded-2xl border border-gray-200 text-xs font-bold text-gray-700">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>Q3 2026 (1 Jul – 30 Sep)</span>
            </div>

            <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-2xl border border-gray-300 text-xs font-bold shadow-xs transition-all cursor-pointer">
              <Download className="w-4 h-4 text-gray-600" />
              <span>Eksper Ledger</span>
            </button>

            <Link
              to="/admin/products"
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Produk Baru</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. 4 EXECUTIVE STAT METRIC CARDS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {topMetrics.map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-md shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold font-label text-gray-400 uppercase tracking-wider">
                {card.title}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${card.badgeColor}`}>
                {card.change}
              </span>
            </div>

            <p className="text-2xl sm:text-3xl font-black font-headline text-gray-900 tracking-tight mb-2">
              {card.value}
            </p>

            <p className="text-xs text-gray-500 font-label font-medium">
              {card.subtext}
            </p>

            <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-gray-100/60 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          </div>
        ))}
      </div>

      {/* 3. CHART & LIVE CURATION AUDIT STREAM */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xl shadow-gray-200/40 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-black" />
                <h2 className="text-lg font-extrabold font-headline text-gray-900">
                  Kecepatan Transaksi & Arus Kas Harian
                </h2>
              </div>
              <p className="text-xs text-gray-500 font-label mt-1">
                Agregasi 14 hari terakhir di portal checkout nasional
              </p>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-2xl border border-gray-200 text-xs font-bold text-gray-600">
              <button className="px-3 py-1.5 rounded-xl bg-white text-black shadow-xs cursor-pointer">Sneakers / Kasual</button>
              <button className="px-3 py-1.5 rounded-xl hover:text-black transition-colors cursor-pointer">Boots & Formal</button>
            </div>
          </div>

          <div className="relative w-full h-56 pt-4 pb-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#111111" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#111111" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path
                d="M 0 110 Q 50 140 100 80 T 200 60 T 300 100 T 400 30 T 500 70 L 500 150 L 0 150 Z"
                fill="url(#chartGradient)"
              />

              <path
                d="M 0 110 Q 50 140 100 80 T 200 60 T 300 100 T 400 30 T 500 70"
                fill="none"
                stroke="#111111"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <circle cx="400" cy="30" r="6" fill="#111111" className="animate-pulse" />
              <circle cx="400" cy="30" r="10" fill="none" stroke="#111111" strokeWidth="2" opacity="0.5" />
            </svg>

            <div className="flex justify-between items-center text-[10px] font-bold font-label text-gray-400 mt-4 px-1">
              <span>16 Sep</span>
              <span>19 Sep</span>
              <span>22 Sep</span>
              <span>25 Sep</span>
              <span>29 Sep</span>
              <span className="text-black font-extrabold bg-gray-100 px-2 py-0.5 rounded-full border border-gray-300">
                Hari ini (Puncak Rp 74.2M)
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xl shadow-gray-200/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-black" />
                <h3 className="text-base font-extrabold font-headline text-gray-900">
                  Log Audit Kurasi Langsung
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase font-label bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                LIVE FEED
              </span>
            </div>
            <p className="text-xs text-gray-500 font-label mb-4">
              Pemeriksaan fisik NFC Tag & jahitan 100% terverifikasi
            </p>

            <div className="space-y-3.5">
              <div className="p-3 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-start gap-3">
                <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-xl mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">New Balance 550 v6 Grey</h4>
                  <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                    Lolos autentikasi fisik oleh Kurator #04 (Jakarta Vault)
                  </p>
                  <span className="text-[9px] text-gray-400 font-label">1m lalu</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-start gap-3">
                <div className="p-1.5 bg-blue-100 text-blue-700 rounded-xl mt-0.5">
                  <QrCode className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Air Jordan 1 Lost & Found</h4>
                  <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                    Inbound konfirmasi diterima dari Seller #STR-8091
                  </p>
                  <span className="text-[9px] text-gray-400 font-label">14m lalu</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-start gap-3">
                <div className="p-1.5 bg-red-100 text-red-700 rounded-xl mt-0.5">
                  <XCircle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Yeezy Boost 350 Bone</h4>
                  <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                    Gagal verifikasi UV Barcode & box label font mismatch
                  </p>
                  <span className="text-[9px] text-gray-400 font-label">22m lalu</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full mt-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-2xl text-xs font-bold font-label transition-colors cursor-pointer">
            Buka Seluruh Audit Trail (2.492 Log)
          </button>
        </div>
      </div>

      {/* 4. MODULARIZED MANAGEMENT COMPONENTS */}
      <div className="max-w-7xl mx-auto space-y-8">
        <ManageProduct />
        <ManageOrders />
        <ManageDiscount />
      </div>

      {/* 5. KREDENSIAL SUPER ADMIN & LOG AKSES KEAMANAN VAULT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xl shadow-gray-200/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-black" />
                <h3 className="text-base font-extrabold font-headline text-gray-900">
                  Kredensial Super Admin
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase font-label bg-emerald-100 text-emerald-800">
                ROOT LEVEL
              </span>
            </div>

            <p className="text-xs text-gray-500 font-label mb-5">
              Akses kontrol utama database vault & penetapan wewenang rasio.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold text-xs">
                    FA
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Faris Al-Kautsar</h4>
                    <p className="text-[10px] text-gray-400 font-mono">auth.ops@streetwear.id</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-gray-200 rounded-md text-[10px] font-bold text-gray-700">
                  Tier 1 Owner
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-[10px] text-gray-400">Yubikey 5C NFC Terhubung</p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-bold">
                  AKTIF
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-label">
            <span>Status Verifikasi: <strong className="text-emerald-600">98.4%</strong></span>
            <span>v2.4.1</span>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xl shadow-gray-200/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-black" />
              <h3 className="text-base font-extrabold font-headline text-gray-900">
                Audit Log Akses & Keamanan Vault
              </h3>
            </div>
            <span className="text-xs text-gray-400 font-label">Unduh Log System</span>
          </div>

          <p className="text-xs text-gray-500 font-label mb-4">
            Rekaman aktivitas manipulasi harga, override status autentikasi, dan login admin.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-xs font-body border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-gray-500 font-label font-bold border-b border-gray-200">
                  <th className="py-3 px-3.5">TIMESTAMP (WIB)</th>
                  <th className="py-3 px-3.5">AKTOR (PERAN)</th>
                  <th className="py-3 px-3.5">AKSI OPERASI</th>
                  <th className="py-3 px-3.5">TARGET PARAMETER</th>
                  <th className="py-3 px-3.5 text-center">HASIL STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white font-mono text-[11px]">
                {auditLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-3.5 text-gray-400">{log.time}</td>
                    <td className="py-3 px-3.5 font-bold text-gray-900">{log.actor}</td>
                    <td className="py-3 px-3.5 text-gray-700">{log.action}</td>
                    <td className="py-3 px-3.5 text-gray-500">{log.target}</td>
                    <td className="py-3 px-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${log.statusColor}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
