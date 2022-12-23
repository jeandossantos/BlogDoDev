import { InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

interface InputIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: IconType;
  additionalCss?: string;
}

export function InputIcon({
  icon: Icon,
  additionalCss,
  ...props
}: InputIconProps) {
  return (
    <div className="relative flex items-center text-zinc-500 ">
      <Icon
        size={25}
        width={25}
        className="absolute ml-2 pointer-events-none"
      />
      <input
        {...props}
        className={` h-12 pr-3 pl-10 placeholder:font-medium rounded
         border-zinc-500 placeholder:text-zinc-500 placeholder:text-xs text-zinc-100 border-none outline-none focus:outline-zinc-500 focus:border-zinc-500 outline-offset-0 
        ${additionalCss}`}
      />
    </div>
  );
}
