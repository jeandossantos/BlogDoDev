import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { Label } from '../../components/Label';
import { useTag } from '../../hooks/useTag';

interface ITag {
  id: string;
  name: string;
  checked?: boolean;
}

interface SignInSignUpModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleListTag: () => Promise<void>;
  tags: ITag[];
}

export function TagFormModal({
  isOpen,
  setIsOpen,
  handleListTag,
  tags,
}: SignInSignUpModal) {
  const { createTag, removeTag } = useTag();

  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreateTag() {
    setLoading(true);

    if (!tag.trim()) {
      toast.error('Informe a Tag');

      return;
    }

    try {
      await createTag(tag);
      handleListTag();

      toast.success('Tag criada com sucesso!');
      setTag('');
    } catch (error) {
      console.error(error);
      toast.error(
        'Não foi possível completar operação. Verifique se a tag já não existe!'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveTag(tagId: string) {
    setLoading(true);

    try {
      await removeTag(tagId);
      handleListTag();

      setLoading(false);
      toast.success('Tag excluída com sucesso!');
    } catch (error: any) {
      if (
        error.response.data.message ===
        'This tag has articles. It cannot be removed.'
      ) {
        toast.error('Tag não pode ser removida!');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 bg-zinc-900/90" aria-hidden="true" />
      <div className="flex justify-center items-center fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center p-4">
          <Dialog.Panel
            className="mx-auto rounded-lg bg-zinc-700
         border-zinc-500  border-4 text-zinc-100 w-[500px]"
          >
            <Dialog.Title
              className="font-[Lalezar] text-3xl text-zinc-100
             text-center mt-6 "
            >
              Criar nova Tag
            </Dialog.Title>
            <div className="px-10 mb-6">
              <div className="flex flex-col">
                <Label label="Nome:" htmlFor="name" />
                <input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  type="text"
                  id="name"
                  placeholder="Nome da nova Tag"
                  className="h-12 px-3 placeholder:font-medium rounded
          border-zinc-500 placeholder:text-zinc-500 placeholder:text-xs text-zinc-100 border-none outline-none focus:outline-zinc-500 focus:border-zinc-500 outline-offset-0 bg-zinc-900"
                />
              </div>

              <div className="flex gap-2 mb-5">
                <button
                  onClick={handleCreateTag}
                  className="w-36 flex justify-center gap-2 items-center
                 bg-red-danger text-zinc-100 rounded font-bold 
                  h-12 text-center mt-6 hover:bg-red-danger-hover"
                >
                  {loading ? (
                    <AiOutlineLoading className="animate-spin h-5 w-5" />
                  ) : (
                    'Criar'
                  )}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  title="Sair"
                  className="w-36 bg-zinc-secondary text-zinc-100 
                rounded font-bold  h-12 text-center
                mt-6 hover:bg-zinc-secondary-hover"
                >
                  Cancelar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  return (
                    <div className="flex" key={tag.id}>
                      <div className="bg-zinc-500 rounded-l p-1 px-2">
                        {tag.name}
                      </div>
                      <button
                        onClick={() => handleRemoveTag(tag.id)}
                        className="bg-red-danger hover:bg-red-danger-hover
                    py-1  px-2 rounded-r"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
