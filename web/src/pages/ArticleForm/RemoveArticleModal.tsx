import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';

import { useArticle } from '../../hooks/useArticle';

interface RemoveArticleModalProps {
  articleId: string;
  handleIsRemoveArticleModalOpen: (isOpen: boolean) => void;
  isRemoveArticleModalOpen: boolean;
  handleListArticles: () => Promise<void>;
}

export function RemoveArticleModal({
  articleId,
  isRemoveArticleModalOpen,
  handleIsRemoveArticleModalOpen,
  handleListArticles,
}: RemoveArticleModalProps) {
  const { removeArticle } = useArticle();

  const [loading, setLoading] = useState(false);

  async function handleRemoveArticle() {
    setLoading(true);
    try {
      await removeArticle(articleId);
      toast.success('Artigo deletada com sucesso!');
      handleListArticles();
      setLoading(false);
      handleIsRemoveArticleModalOpen(false);
    } catch (error) {
      toast.error('Não foi possível completar operação!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={isRemoveArticleModalOpen}
      onClose={() => handleIsRemoveArticleModalOpen(false)}
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
            Excluir Artigo
          </Dialog.Title>
          <p>
            Esse Artigo será removido permanentemente.
            <br /> Tem certeza que deseja continuar?
          </p>
          <div className="flex justify-center gap-2 mb-3">
            <button
              onClick={handleRemoveArticle}
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
              onClick={() => handleIsRemoveArticleModalOpen(false)}
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
