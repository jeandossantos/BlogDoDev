import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { LoginTab } from './LoginTab';
import { RegisterTab } from './RegisterTab';

interface TabsModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

export function TabsModal({ setIsOpen }: TabsModalProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-md px-2 py-8 sm:px-0">
      <Tab.Group vertical>
        <Tab.List className="w-56 rounded-lg bg-zinc-800  border-4 border-zinc-500 p-1">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`${
                  selected
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'bg-zinc-800 text-zinc-500'
                }
                 rounded-lg active:border-none focus:border-none focus-visible:outline-none py-2 px-4`}
              >
                <h2 className="font-[Lalezar] text-xl px-2">Login</h2>
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`${
                  selected
                    ? 'bg-zinc-100 text-zinc-900 '
                    : 'bg-zinc-800 text-zinc-500'
                }
               rounded-lg active:border-none focus:border-none py-2 px-4 focus-visible:outline-none`}
              >
                <h2>Register</h2>
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <LoginTab setIsOpen={setIsOpen} />
          </Tab.Panel>
          <Tab.Panel>
            <RegisterTab setIsOpen={setIsOpen} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
