//import { useState } from 'react'
import './App.css'
import HeaderMain from './pages/Header'
import LoginUser from './pages/Login'
import RegisterUser from './pages/Register'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'sonner';



export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">

      <Toaster position="top-right" theme="dark" richColors />
      
      {/* Imagem de fundo */}
      <div className="absolute inset-0 bg-cover bg-animate"
        style={{ backgroundImage: "url('/bg-unsplash.jpg')" }}>
      </div>
      
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-[#0d1117]/98"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <HeaderMain />
        <main className="grow flex items-center justify-center p-4">
          <Routes>
            <Route path="/" element={<RegisterUser />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}