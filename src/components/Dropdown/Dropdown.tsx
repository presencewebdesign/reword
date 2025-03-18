import { HTMLProps } from 'react';
import s from './Dropdown.module.scss';

export interface DropdownProps extends HTMLProps<HTMLSelectElement> {}

const Dropdown = ({
  className,
  children,
  ...props
}: DropdownProps): JSX.Element => {
  return (
    <select className={[s.wrapper, className].join(' ')} {...props}>
      {children}
    </select>
  );
};

export default Dropdown;
