import { useState } from 'react';
import { UsersRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { toast } from 'sonner';

export default function RegisterUser() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
    toast.error('Preencha todos os campos');
    return;
    }

    if (name.trim().length < 3) {
        toast.error('Nome deve ter pelo menos 3 caracteres');
        return;
    }

    if (!email.includes('@')) {
        toast.error('Email inválido');
        return;
    }

    if (password.length < 6) {
        toast.error('Senha deve ter pelo menos 6 caracteres');
        return;
    }

    toast.promise(authService.register({ name, email, password }), {
      loading: 'Criando sua conta...',
      success: () => { navigate('/login'); return 'Conta criada com sucesso!'; },
      error: 'Erro ao cadastrar. Tente novamente.'
    });
  };

  return (
    <div className="w-full max-w-lg flex items-center justify-center mt-5 p-4">
      <form onSubmit={handleRegister} className="w-full max-w-lg bg-slate-800 p-8 sm:p-10 rounded-xl shadow-lg flex flex-col gap-5 mx-4">

        <h2 className="font-app font-bold text-white flex items-center justify-center gap-2">
          <UsersRound size={28} className="text-blue-500 hover:scale-110 cursor-pointer UsersRound" />
          Registre-se
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-300">Nome</label>
          <input type="text" required value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-3 bg-slate-900 text-white placeholder:text-slate-400 border border-slate-600 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="Insira seu nome" />
          <hr className="border-cyan-300" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-300">Email</label>
          <input type="email" required value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 bg-slate-900 text-white placeholder:text-slate-400 border border-slate-600 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="Insira seu email" />
          <hr className="border-cyan-300" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-300">Senha</label>
          <input type="password" required value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 bg-slate-900 text-white placeholder:text-slate-400 border border-slate-600 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="Crie uma senha" />
          <hr className="border-cyan-300" />
        </div>

        <button type="submit"
          className="w-full bg-purple-800 hover:bg-purple-950 text-white font-medium py-3 border border-blue-800 rounded-lg transition-colors cursor-pointer">
          Criar conta
        </button>
        <button type="button">
          <Link to="/login" className="text-white hover:underline">
            Já tem uma conta? Faça login
          </Link>
        </button>
      </form>
    </div>
  );
}