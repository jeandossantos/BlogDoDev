import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface LoginRegisterModalProps {
  handleIsRemoveUserModalOpen: (isOpen: boolean) => void;
  isRemoveUserModalOpen: boolean;
}

export function LoginRegisterModal({
  isRemoveUserModalOpen,
  handleIsRemoveUserModalOpen,
}: LoginRegisterModalProps) {
  const navigate = useNavigate();
  const { logout, removeUser, user } = useAuth();

  const [loading, setLoading] = useState(false);

  async function handleRemoveUSer() {
    setLoading(true);
    try {
      await removeUser(user?.id!);

      toast.success('Conta deletada com sucesso!');

      const timerId = setTimeout(() => {
        logout();
        setLoading(false);
        navigate('/');
        clearTimeout(timerId);
      }, 2000);
    } catch (error) {
      toast.error('Não foi possível completar operação!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={isRemoveUserModalOpen}
      onClose={() => handleIsRemoveUserModalOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 bg-zinc-900/90" aria-hidden="true" />

      <div className="fixed inset-0  flex items-center justify-center p-4">
        <Dialog.Panel
          className="mx-auto rounded-lg bg-zinc-700
           border-zinc-500  border-4 text-zinc-100 px-10"
        >
          <Dialog.Title
            className="font-[Lalezar] text-3xl text-zinc-100
             text-center mt-6"
          >
            Excluir Conta
          </Dialog.Title>
          <p>
            Não será possível recuperar a conta depois de excluída. <br /> Tem
            certeza que deseja continuar?
          </p>
          <div className="flex justify-center gap-2 mb-3">
            <button
              onClick={handleRemoveUSer}
              className="w-36 flex justify-center gap-2 items-center
                 bg-red-danger text-zinc-100 rounded font-bold 
                  h-12 text-center mt-6 hover:bg-red-danger-hover"
            >
              {loading ? (
                <AiOutlineLoading className="animate-spin h-5 w-5" />
              ) : (
                'Continuar'
              )}
            </button>

            <button
              onClick={() => handleIsRemoveUserModalOpen(false)}
              title="Sair"
              className="w-36 bg-zinc-secondary text-zinc-100 
                rounded font-bold  h-12 text-center
                mt-6 hover:bg-zinc-secondary-hover"
            >
              Cancelar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
