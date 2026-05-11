import { useState } from 'react';
import { UserRoundMinus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { toast } from 'sonner'; 

export default function LoginUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  toast.promise(authService.login({ email, password }), {
    loading: 'Verificando credenciais...',
    success: () => { navigate('/dashboard'); return 'Bem-vindo!'; },
    error: 'Email ou senha inválidos'
  });
};

  return (
    <div className="w-full max-w-lg b flex items-center justify-center mt-5 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-lg bg-slate-800 p-8 sm:p-10 rounded-xl shadow-lg flex flex-col gap-5 mx-4">

        <h2 className="font-app border-b border-slate-500 pb-3  text-white flex items-center justify-center gap-2">
          <UserRoundMinus size={28} className="text-blue-500 hover:scale-110 user-login-icon" />
          Faça login
        </h2>

        <div className="flex flex-col gap-2.5">
          <label className="text-sm text-slate-300">Email</label>
          <input type="email" required value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 bg-slate-900 text-white placeholder:text-slate-400 border border-slate-600 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="Insira seu email" />
          <hr className="border-cyan-300" />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-sm text-slate-300">Senha</label>
          <input type="password" required value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 bg-slate-900 text-white placeholder:text-slate-400 border border-slate-600 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="Insira sua senha" />
          <hr className="border-cyan-300" />
        </div>

        <button type="submit"
          className="w-full bg-purple-800 hover:bg-purple-950 text-white font-medium py-3 border border-blue-800 rounded-lg transition-colors cursor-pointer">
          Entrar
        </button>
        <button type="button">
          <Link to="/register" className="text-white hover:underline">
            Não tem uma conta? Registre-se
          </Link>
        </button>
      </form>
    </div>
  );
}