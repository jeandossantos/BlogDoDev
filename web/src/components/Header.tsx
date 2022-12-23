import { useState } from 'react';
import { FaSearch, FaEdit, FaHeart, FaUser, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { InputIcon } from './InputIcon';
import { LoginRegisterModal } from './LoginRegisterModal';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  function toggleModal(isOpen: boolean) {
    setIsOpen(isOpen);
  }

  return (
    <header className="row-span-1 col-span-2 bg-zinc-800 h-20 px-3 flex justify-between items-center ">
      <h1 className="font-[Lalezar] text-4xl text-zinc-500">
        <Link to={'/'}>BlogDoDev</Link>
      </h1>
      <form>
        <InputIcon
          icon={FaSearch}
          autoComplete="false"
          name="search"
          placeholder="Pesquisar..."
          additionalCss="bg-zinc-700"
        />
      </form>

      <div className="flex gap-2">
        <Link
          to={'/articles'}
          className="h-16 w-16 rounded-full bg-zinc-100 flex justify-center items-center"
        >
          <FaEdit style={{ fontSize: 25 }} />
        </Link>
        <a className="h-16 w-16 rounded-full bg-zinc-100 flex justify-center items-center">
          <FaHeart style={{ fontSize: 25 }} />
        </a>

        {!user ? (
          <a
            onClick={() => toggleModal(true)}
            className="h-16 w-16 rounded-full cursor-pointer bg-zinc-100 flex justify-center items-center"
          >
            <FaSignInAlt style={{ fontSize: 25 }} />
          </a>
        ) : (
          <Link
            to={'/profile'}
            className="h-16 w-16 rounded-full cursor-pointer bg-zinc-100 flex justify-center items-center"
          >
            <FaUser style={{ fontSize: 25 }} />
          </Link>
        )}
      </div>

      <LoginRegisterModal isOpen={isOpen} setIsOpen={toggleModal} />
    </header>
  );
}
