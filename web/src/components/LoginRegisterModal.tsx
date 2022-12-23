import { Dialog } from '@headlessui/react';
import { TabsModal } from './TabsModal';

interface SignInSignUpModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function LoginRegisterModal({ isOpen, setIsOpen }: SignInSignUpModal) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 bg-zinc-900/90" aria-hidden="true" />

      <div className="fixed inset-0  flex items-center justify-center p-4">
        <Dialog.Panel
          className="mx-auto rounded-lg bg-zinc-700
         border-zinc-500  border-4 text-zinc-100"
        >
          <TabsModal setIsOpen={setIsOpen} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
