import React from "react";
import { Eye, EyeOff } from "lucide-react";

const NameField = ({register, error}) => {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5 font-label text-parchment-200">
        Nama Lengkap
      </label>

      <div className="relative rounded-xl transition-all duration-200 shadow-xs shadow-parchment-400">
        <input
          {...register('name', { required: 'Nama tidak boleh kosong' })}
          type="text"
          placeholder="Masukkan Nama Anda"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none font-body bg-parchment-700 text-parchment-100"
        />
      </div>

      {error && (
        <p className="text-red-400 text-xs mt-1">{error.message}</p>
      )}

    </div>
  )
};

const EmailInput = ({register, error}) => {
  return(
    <div>
      <label className="block text-xs font-semibold mb-1.5 font-label text-parchment-200" >Email</label>

      <div className="relative rounded-xl transition-all duration-200 shadow-xs shadow-parchment-400 ">
        <input
          {...register('email', { 
            required: 'Email tidak boleh kosong',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Format email tidak valid'
            }
          })}
          type="email"
          placeholder="contoh@gmail.com"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none font-body bg-parchment-700 text-parchment-100"
        />
      </div>

      {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
    </div>
  )
};

const PassInput = ({register, error, showPassword, setShowPassword}) => {
  return(
    <div>
      <label className="block text-xs font-semibold mb-1.5 font-label text-parchment-200">Password</label>

      <div className="relative rounded-xl transition-all duration-200 shadow-xs shadow-parchment-400 ">

        <input
          {...register('password', { 
            required: 'Password tidak boleh kosong',
            minLength: { value: 6, message: 'Password minimal 6 karakter' }
          })}
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none font-body bg-parchment-700 text-parchment-100"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-parchment-300"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>

      </div>

      {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
    </div>

  )
};

export {NameField, EmailInput, PassInput};