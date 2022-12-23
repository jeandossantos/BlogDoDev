import { TfiEmail } from 'react-icons/tfi';
import { FiUser } from 'react-icons/fi';
import { AiOutlineLoading, AiOutlineLock } from 'react-icons/ai';

import { InputIcon } from './InputIcon';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

interface TabsModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

export function RegisterTab({ setIsOpen }: TabsModalProps) {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (username.length < 2) {
      toast.error('Username precisa ter pelo menos 2 caracteres!');
      setLoading(false);

      return;
    }

    if (password.length < 6) {
      toast.error('Senha precisa ter pelo menos 6 caracteres!');
      setLoading(false);

      return;
    }

    if (password !== confirmPassword) {
      toast.error('Senhas não coincidem!');
      setLoading(false);

      return;
    }

    try {
      await register({
        username,
        email,
        password,
        confirmPassword,
      });

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
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
    <form className="px-10" onSubmit={handleRegister}>
      <h2 className="font-[Lalezar]  text-3xl text-zinc-100 text-center mt-6">
        Crie sua conta
      </h2>
      <label
        htmlFor="username"
        className="font-medium text-sm text-zinc-100 my-3"
      >
        Username:
      </label>
      <InputIcon
        icon={FiUser}
        additionalCss="bg-zinc-900 w-96"
        type="text"
        id="username"
        name="username"
        placeholder="John Smith"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label htmlFor="email" className="font-medium text-sm text-zinc-100 my-3">
        E-mail:
      </label>
      <InputIcon
        icon={TfiEmail}
        additionalCss="bg-zinc-900 w-96"
        type="email"
        id="email"
        name="username"
        placeholder="John Smith"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="grid grid-cols-2  gap-7">
        <div className="col-span-1">
          <label
            htmlFor="password"
            className="font-medium text-sm text-zinc-100 my-3"
          >
            Senha:
          </label>
          <InputIcon
            icon={AiOutlineLock}
            additionalCss="bg-zinc-900 w-44"
            id="password"
            name="username"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="col-span-1  ">
          <label
            htmlFor="confirmPassword"
            className="font-medium text-sm text-zinc-100 my-3"
          >
            Senha:
          </label>
          <InputIcon
            icon={AiOutlineLock}
            additionalCss="bg-zinc-900 w-44"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-zinc-100 flex items-center justify-center text-zinc-900 rounded font-bold  h-12 text-center
        mt-6 hover:bg-zinc-200"
      >
        {loading ? (
          <AiOutlineLoading className="animate-spin h-5 w-5" />
        ) : (
          'Registre-se'
        )}
      </button>
    </form>
  );
}
