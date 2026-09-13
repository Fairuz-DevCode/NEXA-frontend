import { z } from 'zod';

export const addressSchema = z.object({
  label: z.string().min(1, 'Label alamat harus diisi (cth: Rumah, Kantor)'),
  phone: z.string().min(8, 'Nomor telepon minimal 8 digit'),
  street_address: z.string().min(5, 'Alamat lengkap minimal 5 karakter'),
  city: z.string().min(2, 'Nama kota harus diisi'),
  country: z.string().min(2, 'Nama negara/provinsi harus diisi'),
  postal_code: z.string().min(3, 'Kode pos harus diisi'),
});

export const checkoutSchema = z.object({
  address_id: z.number({ required_error: 'Pilih alamat pengiriman' }),
  shipping_cost: z.number().min(0, 'Biaya ongkir valid'),
});
