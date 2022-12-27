import { TfiEmail } from 'react-icons/tfi';
import { AiOutlineLoading, AiOutlineLock } from 'react-icons/ai';

import { InputIcon } from '../../InputIcon';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

interface LoginTabProps {
  setIsOpen: (isOpen: boolean) => void;
}

export function LoginTab({ setIsOpen }: LoginTabProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!email || password.length < 6) {
      toast.error('E-mail/Senha invalido(s)!');
      setPassword('');
      setLoading(false);

      return;
    }

    try {
      await login({
        email,
        password,
      });

      setEmail('');
      setPassword('');
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    }
  }

  return (
    <form className="px-10" onSubmit={handleLogin}>
      <h2 className="font-[Lalezar] text-3xl text-zinc-100 text-center mt-6">
        Faça login
      </h2>
      <label htmlFor="email" className="font-medium text-sm text-zinc-100 my-3">
        E-mail:
      </label>
      <InputIcon
        icon={TfiEmail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        additionalCss="bg-zinc-900"
        type="email"
        id="email"
        name="email"
        placeholder="John Smith"
        required
      />

      <label
        htmlFor="password"
        className="font-medium text-sm text-zinc-100 my-3"
      >
        Senha:
      </label>

      <InputIcon
        icon={AiOutlineLock}
        additionalCss="bg-zinc-900"
        id="password"
        name="password"
        type="password"
        placeholder="********"
        min={6}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-zinc-100 flex items-center justify-center text-zinc-900 rounded font-bold  h-12 text-center
        mt-6 hover:bg-zinc-200 cursor-pointer"
        value={'Entrar'}
      >
        {loading ? (
          <AiOutlineLoading className="animate-spin h-5 w-5" />
        ) : (
          'Entrar'
        )}
      </button>
    </form>
  );
}
