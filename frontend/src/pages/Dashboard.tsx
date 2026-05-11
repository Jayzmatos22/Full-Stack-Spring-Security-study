import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function getEmailFromToken(): string {
  const token = localStorage.getItem('token');
  if (!token) return '';
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.sub;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [email] = useState(() => getEmailFromToken());

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-slate-800 p-10 rounded-xl shadow-lg flex flex-col gap-6 items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-300">Logado como: <span className="text-blue-400">{email}</span></p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer">
          Sair
        </button>
      </div>
    </div>
  );
}