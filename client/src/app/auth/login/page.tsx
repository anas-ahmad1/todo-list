'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { API_URL } from '@/utils/config';
import { BACKEND_ROUTES, FRONTEND_ROUTES } from '@/utils/routes';
import axios from 'axios';
import { useUser } from '@/context/UserContext';

type LoginFormInputs = {
  email: string
  password: string
}


export default function Login() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>()
  
  const [showPassword, setShowPassword] = useState(false)

  const { setUser } = useUser()

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {

    const { email, password } = data
    const url = API_URL + BACKEND_ROUTES.AUTH.LOGIN;

    try {
      const res = await axios.post(url, { email, password });
      setUser(res.data);
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (err) {
      console.error((err as Error).message);
    }

  }

  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-2/5 flex flex-col justify-center items-center px-6 primary-bg hidden lg:flex">
          <h1 className="text-5xl font-bold mb-4 text-center">
            Welcome to TaskFlow
          </h1>
          <p className="text-lg text-center">
            Manage your tasks efficiently and stay organized
          </p>
        </div>


        <div className="w-full lg:w-3/5 flex items-start lg:items-center justify-center p-8 pt-12">
          <div className="w-full max-w-md p-8 container-bg rounded-2xl shadow-xl">
            
            <h1 className="text-3xl text-center">Login</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-1">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full border rounded px-3 py-2"
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full primary-bg py-2 mb-4 rounded-lg"
              >
                Login
              </button>

              <p className="text-center text-sm">
                Dont have an account?
                <button type="button" onClick={() => router.push(FRONTEND_ROUTES.AUTH.SIGNUP)} className="underline ml-2">
                  Signup
                </button>
              </p>

            </form>
            
          </div>
        </div>
      </div>
    </>
  )
}
