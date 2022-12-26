import { AiOutlineLoading } from 'react-icons/ai';

export function Loading() {
  return (
    <div className="flex justify-center items-center text-zinc-100">
      <AiOutlineLoading className="animate-spin h-5 w-5 mr-3 " />
    </div>
  );
}
