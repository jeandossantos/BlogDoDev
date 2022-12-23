import { Dialog } from '@headlessui/react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineLoading, AiOutlineLock } from 'react-icons/ai';
import { InputIcon } from '../../components/InputIcon';
import { Label } from '../../components/Label';
import { useAuth } from '../../hooks/useAuth';

interface ChangeUserPasswordModalProps {
  handleIsChangeUserPasswordModalOpen: (isOpen: boolean) => void;
  isChangeUserPasswordModalOpen: boolean;
}

export function ChangeUserPasswordModal({
  isChangeUserPasswordModalOpen,
  handleIsChangeUserPasswordModalOpen,
}: ChangeUserPasswordModalProps) {
  const { changeUserPassword, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  async function handleChangeUSerPassword(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (password.length < 6) {
      toast.error('Senha deve ter pelo menos 6 caracteres!');
      setPassword('');
      setLoading(false);

      return;
    }

    if (newPassword.length < 6) {
      toast.error('Senha deve ter pelo menos 6 caracteres!');
      setNewPassword('');
      setLoading(false);

      return;
    }

    if (newPassword.length !== confirmNewPassword.length) {
      toast.error('Senhas não coincidem!');
      setConfirmNewPassword('');
      setLoading(false);

      return;
    }
    try {
      await changeUserPassword({
        userId: user?.id!,
        newPassword,
      });

      toast.success('senha alterado com sucesso!');

      setPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      toast.error('Não foi possível completar operação!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={isChangeUserPasswordModalOpen}
      onClose={() => handleIsChangeUserPasswordModalOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 bg-zinc-900/90" aria-hidden="true" />

      <div className="fixed inset-0  flex items-center justify-center p-4">
        <Dialog.Panel
          className="mx-auto rounded-lg bg-zinc-700
          border-zinc-500  border-4 text-zinc-100 px-10"
        >
          <Dialog.Title className="font-[Lalezar]  text-3xl text-zinc-100 text-center mt-6">
            Alterar Senha
          </Dialog.Title>

          <form onSubmit={handleChangeUSerPassword}>
            <Label label="Senha Atual:" htmlFor="currentPassword" />
            <InputIcon
              icon={AiOutlineLock}
              additionalCss="bg-zinc-900"
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="********"
              min={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <Label label="Nova senha:" htmlFor="newPassword" />

            <InputIcon
              icon={AiOutlineLock}
              additionalCss="bg-zinc-900"
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="********"
              min={6}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Label label="Confirme nova senha:" htmlFor="confirmNewPassword" />
            <InputIcon
              icon={AiOutlineLock}
              additionalCss="bg-zinc-900"
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              placeholder="********"
              min={6}
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />

            <div className="flex justify-center gap-2 mb-3">
              <button
                type="submit"
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
                onClick={() => handleIsChangeUserPasswordModalOpen(false)}
                title="Sair"
                className="w-36 bg-zinc-secondary text-zinc-100 
                rounded font-bold  h-12 text-center
                mt-6 hover:bg-zinc-secondary-hover"
              >
                Cancelar
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
