import { FormEvent, useState } from 'react';
import { FaSearch, FaEdit, FaHeart, FaUser, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useArticle } from '../hooks/useArticle';
import { useAuth } from '../hooks/useAuth';
import { InputIcon } from './InputIcon';
import { LoginRegisterModal } from './Login/LoginRegisterModal';

export function Header() {
  const { user } = useAuth();
  const { setSearch: setGlobalSearch, search: globalSearch } = useArticle();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  function toggleModal(isOpen: boolean) {
    setIsOpen(isOpen);
  }

  async function handleSearch(e: FormEvent & { key: string }) {
    e.preventDefault();

    if (e.key === 'Escape') {
      setGlobalSearch('');
      setSearch('');
    }

    if (e.key === 'Enter') {
      setSearchParams({ search });
      setGlobalSearch(search);
      navigate(`/articles/result`);
    }
  }

  return (
    <header className="row-span-1 col-span-2 bg-zinc-800 h-20 px-3 flex justify-between items-center ">
      <h1 className="font-[Lalezar] text-4xl text-zinc-500">
        <Link to={'/'}>BlogDoDev</Link>
      </h1>
      <div className="w-[300px]">
        <InputIcon
          onKeyUp={handleSearch}
          icon={FaSearch}
          autoComplete="false"
          name="search"
          placeholder="Pesquisar..."
          additionalCss="bg-zinc-700"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="flex gap-2">
        {!!user ? (
          <>
            <Link
              to={'/articles'}
              className="h-16 w-16 rounded-full bg-zinc-100 flex justify-center items-center hover:bg-zinc-200"
            >
              <FaEdit style={{ fontSize: 25 }} />
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => toggleModal(true)}
              className="h-16 w-16 rounded-full bg-zinc-100 flex justify-center items-center hover:bg-zinc-200"
            >
              <FaEdit style={{ fontSize: 25 }} />
            </button>
          </>
        )}

        {!user ? (
          <a
            onClick={() => toggleModal(true)}
            className="h-16 w-16 rounded-full cursor-pointer bg-zinc-100 flex justify-center items-center hover:bg-zinc-200"
          >
            <FaSignInAlt style={{ fontSize: 25 }} />
          </a>
        ) : (
          <Link
            to={'/profile'}
            className="h-16 w-16 rounded-full cursor-pointer bg-zinc-100 flex justify-center items-center hover:bg-zinc-200"
          >
            <FaUser style={{ fontSize: 25 }} />
          </Link>
        )}
      </div>

      <LoginRegisterModal isOpen={isOpen} setIsOpen={toggleModal} />
    </header>
  );
}
