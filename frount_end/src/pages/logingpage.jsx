// src/pages/logingpage.jsx
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaFacebookF } from 'react-icons/fa'
import { GoogleLogin } from '@react-oauth/google';
import EMImage from '../assets/EM.png'

export default function Logingpage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (data.token) {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
        window.location.href = "/"; // Redirect to home page
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    console.log(credentialResponse);

    try {
      const response = await fetch("http://localhost:5001/api/users/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.token) {
        alert("Google login successful!");
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        alert(data.message || "Google login failed!");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("An error occurred during Google login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#84240c] to-[#d6b2a5]">
      <div className="flex w-full max-w-5xl bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-6">Login to continue your journey</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-purple-500 hover:underline cursor-pointer">
              Create one
            </a>
          </p>

          <div className="flex flex-col items-center gap-4 mt-6">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log('Google login Failed');
                alert('Google login failed!');
              }}
            />

            <div className="flex gap-4">
              <button className="p-3 bg-white border rounded-full shadow text-xl">
                <FaApple />
              </button>
              <button className="p-3 bg-white border rounded-full shadow text-xl text-[#1877f2]">
                <FaFacebookF />
              </button>
            </div>
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
