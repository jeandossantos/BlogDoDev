import { InputIcon } from '../../components/InputIcon';
import { TfiEmail } from 'react-icons/tfi';
import { RiShutDownLine } from 'react-icons/ri';
import { FiUser } from 'react-icons/fi';
import { FaTrash, FaUser } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { LoginRegisterModal } from './RemoveUserModal';
import { ChangeUserPasswordModal } from './ChangeUserPasswordModal';
import { Label } from '../../components/Label';

export function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [isChangeUserPasswordModalOpen, setIsChangeUserPasswordModalOpen] =
    useState(false);
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState(false);

  useEffect(() => {
    setUsername(user?.username!);
    setEmail(user?.email!);
  }, [user]);

  async function handleUpdateUser(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (username!.length < 2) {
      toast.error('username deve ter pelo menos 2 caracteres!');
      setUsername(user?.username!);
      setLoading(false);
      return;
    }
    try {
      await updateUser({ username: username!, userId: user?.id! });

      setUsername(username);
      setLoading(false);
    } catch (error: any) {
      console.log(error.response);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);

        setUsername(user?.username!);
        setLoading(false);
      }
    }
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  function handleIsChangeUserPasswordModalOpen(isOpen: boolean) {
    setIsChangeUserPasswordModalOpen(isOpen);
  }

  function handleIsRemoveUserModalOpen(isOpen: boolean) {
    setIsRemoveUserModalOpen(isOpen);
  }

  return (
    <main
      className="flex flex-col items-center row-span-1 col-span-1
     bg-zinc-800 mx-3  text-zinc-100 mt-6 rounded-lg border-zinc-500
      border-4 px-6 py-6"
    >
      <h1 className="font-[Lalezar] text-3xl text-zinc-100  text-center">
        Perfil
      </h1>
      <div className="flex justify-center items-center mt-6">
        <span className="w-24 h-24 rounded-full bg-zinc-100 flex justify-center items-center">
          <FaUser size={48} color="#060606" />
        </span>
      </div>

      <form className="mt-8 max-w-2xl" onSubmit={handleUpdateUser}>
        <Label htmlFor="username" label="Username:" />
        <InputIcon
          icon={FiUser}
          additionalCss="bg-zinc-900"
          type="text"
          id="username"
          name="username"
          placeholder="John Smith"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Label htmlFor="email" label="E-mail:" />
        <InputIcon
          icon={TfiEmail}
          additionalCss="bg-zinc-900 disabled:opacity-75"
          type="text"
          id="email"
          value={email}
          disabled
        />

        <button
          type="submit"
          className="w-full flex justify-center items-center bg-zinc-100 text-zinc-900 
          rounded font-bold  h-12 text-center
        mt-6 hover:bg-zinc-200"
        >
          {loading ? (
            <AiOutlineLoading className="animate-spin h-5 w-5" />
          ) : (
            'Salvar alterações'
          )}
        </button>
      </form>
      <div className="flex justify-between w-[300px]">
        <button
          onClick={() => setIsChangeUserPasswordModalOpen(true)}
          type="submit"
          className="w-36 bg-zinc-secondary text-zinc-100 
            rounded font-bold  h-12 text-center
            mt-6 hover:bg-zinc-secondary-hover"
        >
          Alterar Senha
        </button>

        <button
          onClick={handleLogout}
          type="button"
          title="Sair"
          className="w-36 flex justify-center gap-2 items-center bg-red-danger text-zinc-100 
            rounded font-bold  h-12 text-center
            mt-6 hover:bg-red-danger-hover"
        >
          <RiShutDownLine size={25} /> Sair
        </button>
      </div>

      <button
        onClick={() => handleIsRemoveUserModalOpen(true)}
        type="submit"
        className="w-36 bg-zinc-700 text-zinc-100 
            rounded font-bold  h-12 text-center
            mt-6 hover:bg-red-danger-hover
            flex justify-center gap-2 items-center"
      >
        <FaTrash /> Excluir Conta
      </button>

      <ChangeUserPasswordModal
        isChangeUserPasswordModalOpen={isChangeUserPasswordModalOpen}
        handleIsChangeUserPasswordModalOpen={
          handleIsChangeUserPasswordModalOpen
        }
      />
      <LoginRegisterModal
        isRemoveUserModalOpen={isRemoveUserModalOpen}
        handleIsRemoveUserModalOpen={handleIsRemoveUserModalOpen}
      />
    </main>
  );
}
