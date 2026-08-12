import React, { useContext, useState } from 'react';
import { User, Phone, Mail, Save, CheckCircle2, ShieldCheck, MapPin, Loader2, KeyRound } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);

  // Menggunakan state hanya untuk memindah antar tab, sisanya tetap UI statis
  const [activeTab, setActiveTab] = useState('profile'); 
  const isSaved = false;
  const isSubmitting = false;
  const formData = {
    name: currentUser?.name || 'Nama Lengkap',
    email: currentUser?.email || 'email@example.com',
    phone: currentUser?.phone || '08xxxxxxxx'
  };

  return (
    <div className="p-8 font-body text-parchment-100 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-wide mb-6">Pengaturan Akun</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigasi Tab */}
        <div className="space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'profile'
                ? 'bg-parchment-100 text-black font-semibold'
                : 'text-parchment-100/70 hover:bg-white/5'
            }`}
          >
            <User size={16} />
            <span>Profil Saya</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'security'
                ? 'bg-parchment-100 text-black font-semibold'
                : 'text-parchment-100/70 hover:bg-white/5'
            }`}
          >
            <ShieldCheck size={16} />
            <span>Keamanan Akun</span>
          </button>

          <button
            onClick={() => setActiveTab('address')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'address'
                ? 'bg-parchment-100 text-black font-semibold'
                : 'text-parchment-100/70 hover:bg-white/5'
            }`}
          >
            <MapPin size={16} />
            <span>Daftar Alamat</span>
          </button>
        </div>

        {/* Area Konten Tab */}
        <div className="md:col-span-3 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          
          {/* TAB 1: PROFIL */}
          {activeTab === 'profile' && (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <h2 className="text-sm font-semibold border-b border-white/10 pb-3 mb-4">
                Informasi Pribadi
              </h2>

              {isSaved && (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs">
                  <CheckCircle2 size={16} />
                  <span>Profil berhasil diperbarui!</span>
                </div>
              )}

              <div>
                <label className="block text-xs mb-1 opacity-80">Nama Lengkap</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={() => {}}
                  className="w-full p-2.5 bg-black/20 border border-white/15 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs mb-1 opacity-80">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full p-2.5 bg-black/40 border border-white/5 rounded-lg text-xs opacity-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs mb-1 opacity-80">Nomor Telepon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={() => {}}
                  className="w-full p-2.5 bg-black/20 border border-white/15 rounded-lg text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-parchment-100 text-black font-semibold rounded-lg text-xs flex justify-center items-center gap-2 mt-4"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                <span>Simpan Profil</span>
              </button>
            </form>
          )}

          {/* TAB 2: KEAMANAN (UBAH PASSWORD) */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold border-b border-white/10 pb-3 mb-4">
                Ubah Password
              </h2>
              <div>
                <label className="block text-xs mb-1 opacity-80">Password Lama</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2.5 bg-black/20 border border-white/15 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 opacity-80">Password Baru</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2.5 bg-black/20 border border-white/15 rounded-lg text-xs"
                />
              </div>
              <button className="w-full py-2.5 bg-parchment-100 text-black font-semibold rounded-lg text-xs flex justify-center items-center gap-2 mt-4">
                <KeyRound size={16} />
                <span>Update Password</span>
              </button>
            </div>
          )}

          {/* TAB 3: ALAMAT PENGIRIMAN */}
          {activeTab === 'address' && (
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <h2 className="text-sm font-semibold">Alamat Pengiriman</h2>
                <button className="px-3 py-1.5 bg-parchment-100 text-black rounded-lg text-xs font-semibold">
                  + Tambah Alamat
                </button>
              </div>

              {/* Contoh Tampilan Kartu Alamat */}
              <div className="p-4 bg-black/20 border border-white/10 rounded-lg space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs">{formData.name}</span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-parchment-100/70">Utama</span>
                </div>
                <p className="text-xs opacity-70">{formData.phone}</p>
                <p className="text-xs opacity-70">Jl. Raya Wonokromo No. 123, Surabaya, Jawa Timur, 60243</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
export default UserProfile;
