// 1. React & Core Libraries
import React, { useState } from 'react';

// 2. Third-Party Libraries (npm packages)
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Footprints, AlertCircle, LogIn } from 'lucide-react';

// 3. Custom Hooks & Context
import { useAuth } from '../../hooks/useAuth';

// 4. Custom Components
import { Button } from '../../components/common/Button';
import { EmailInput, PassInput } from '../../components/common/AuthInputs';

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = userState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Halaman asal sebelum redirect ke login (untuk redirect balik setelah login)
  const from = location.state?.from?.pathname || null;

  const onSubmit = async (data) => {
    setErrorMessage('');

    try {
      const user = await loginUser(data.email, data.password);
      const destination = user?.role === 'admin' ? '/admin/dashboard' : (from ?? '/');
      navigate(destination, { replace: true });
    } catch (err) {
      setErrorMessage(err.message);
      setValue("password", "");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment-DEFAULT px-4 py-12">
      <div className="relative w-full max-w-md">
        <div className="relative rounded-3xl p-8 shadow-2xl">

          {/* Header & Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-4 
            bg-parchment-100">
              <Footprints className="w-8 h-8 text-linen-600" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-wider font-headline text-parchment-100"
            >StreetWear</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email Field */}
            <EmailInput register={register} error={errors.email} />


            {/* Password Field */}
            <PassInput
              register={register}
              error={errors.password}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            {/* Error dari API Backend */}
            {errorMessage && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-label
                bg-red-100 text-red-800" >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button isLoading={isSubmitting} loadingText="Login..." icon={LogIn}>
              Login
            </Button>

          </form>

          {/* Footer Links */}
          <div className="flex justify-center items-center gap-2 mt-6 text-xs">
            <p className="font-label text-parchment-300">
              Belum punya akun?
            </p>

            <p>
              <Link to="/register" className=" font-bold underline text-desert_sand-300">
                Daftar sekarang
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};


export default Login;
