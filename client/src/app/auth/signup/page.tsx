'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { API_URL } from '@/utils/config';
import { BACKEND_ROUTES, FRONTEND_ROUTES } from '@/utils/routes';
import axios from 'axios';
import { useUser } from '@/context/UserContext';

type SignupFormInputs = {
  name: string
  email: string
  password: string
}


export default function Signup() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>()
  
  const [showPassword, setShowPassword] = useState(false)

  const { setUser } = useUser()

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {

    const { name, email, password } = data
    const url = API_URL + BACKEND_ROUTES.AUTH.REGISTER;

    try {
      const res = await axios.post(url, { name, email, password });
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
        <div className="w-2/5 bg-black flex flex-col justify-center items-center px-6">
          <h1 className="text-5xl font-bold text-white mb-4 text-center">
            Create Your TaskFlow Account
          </h1>
          <p className="text-lg text-gray-300 text-center">
            Join TaskFlow and start organizing your tasks effortlessly
          </p>
        </div>


        <div className="w-3/5 flex bg-white items-center justify-center">
          <div className="w-full max-w-md bg-black p-8">
            
            <h1 className="text-3xl text-center text-white">Signup</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1 text-white">Name</label>
                <input
                  id="name"
                  type="name"
                  className="w-full border px-3 py-2"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 text-white">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full border px-3 py-2"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 text-white">Password</label>
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
                className="w-full bg-white text-black py-2 mb-4"
              >
                Signup
              </button>

              <p className="text-center text-sm text-white">
                Already have an account?
                <button type="button" onClick={() => router.push(FRONTEND_ROUTES.AUTH.LOGIN)} className="text-white underline">
                  Login
                </button>
              </p>

            </form>
            
          </div>
        </div>
      </div>
    </>
  )
}
