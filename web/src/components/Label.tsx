import { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

export function Label({ label, ...props }: LabelProps) {
  return (
    <label
      {...props}
      htmlFor="username"
      className="font-medium text-sm text-zinc-100 my-3"
    >
      {label}
    </label>
  );
}
