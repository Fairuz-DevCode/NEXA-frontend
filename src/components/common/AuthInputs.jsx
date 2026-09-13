import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { nameSchema, emailSchema, passwordSchema } from "../../schemas/authSchema.js";

const NameField = ({ register, error }) => {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5 font-label text-parchment-200">
        Nama Lengkap
      </label>

      <div className="relative rounded-xl transition-all duration-200 shadow-xs shadow-parchment-400">
        <input
          {...register('name', {
            validate: (value) => {
              const result = nameSchema.safeParse(value);
              if (!result.success) {
                return result.error.issues[0].message;
              }
              return true;
            }
          })}
          type="text"
          maxLength={50}
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

const EmailInput = ({ register, error, isLogin = false }) => {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5 font-label text-parchment-200" >Email</label>

      <div className="relative rounded-xl transition-all duration-200 shadow-xs shadow-parchment-400 ">
        <input
          {...register('email', {
            validate: (value) => {
              if (isLogin) {
                if (!value) return "Email wajib diisi";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format email tidak valid";
                return true;
              }
              const result = emailSchema.safeParse(value);
              if (!result.success) {
                return result.error.issues[0].message;
              }
              return true;
            }
          })}
          type="email"
          autoComplete="off"
          maxLength={70}
          placeholder="contoh@gmail.com"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none font-body bg-parchment-700 text-parchment-100"
        />
      </div>

      {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
    </div>
  )
};

const PassInput = ({ register, error, showPassword, setShowPassword, isLogin = false }) => {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5 font-label text-parchment-200">Password</label>

      <div className="relative rounded-xl transition-all duration-200 shadow-xs shadow-parchment-400 ">

        <input
          {...register('password', {
            required: 'Password wajib diisi',
            validate: (value) => {
              if (isLogin) {
                return true;
              }
              const result = passwordSchema.safeParse(value);
              if (!result.success) {
                return result.error.issues[0].message;
              }
              return true;
            }
          })}
          type={showPassword ? 'text' : 'password'}
          autoComplete="off"
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

export { NameField, EmailInput, PassInput };