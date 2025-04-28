// src/pages/signin.jsx
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaFacebookF } from 'react-icons/fa'
import EMImage from "../assets/EM.png";



export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#84240c] to-[#d6b2a5]">
      <div className="flex w-full max-w-5xl bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create account</h1>
          <p className="text-sm text-gray-500 mb-6">Let’s get started with your 30 days trial</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#7d5b63] text-white py-3 rounded-md hover:bg-[#68464d] transition-all shadow-md"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-purple-500 hover:underline cursor-pointer">
              Login
            </a>
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button className="p-3 bg-white border rounded-full shadow text-xl">
              <FcGoogle />
            </button>
            <button className="p-3 bg-white border rounded-full shadow text-xl">
              <FaApple />
            </button>
            <button className="p-3 bg-white border rounded-full shadow text-xl text-[#1877f2]">
              <FaFacebookF />
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-1/2">
          <img src={EMImage} alt="Scenery" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}
