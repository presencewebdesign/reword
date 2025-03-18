import { HTMLProps } from 'react';
import s from './Button.module.scss';
import { BUTTON_TYPE } from './enums';
import { Digital } from 'react-activity';

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  isSelected?: boolean;
  icon?: string;
  hideBackground?: boolean;
  loading?: boolean;
}

const Button = ({
  className,
  hideBackground = false,
  type = 'button',
  isSelected = false,
  loading = false,
  icon,
  children,
  disabled,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      className={[
        s.button,
        s[isSelected ? 'selected' : ''],
        s[hideBackground ? 'hideBackground' : ''],
        icon ? 'material-icons' : '',
        className || '',
      ].join(' ')}
      disabled={loading || disabled}
      type={type as BUTTON_TYPE}>
      {!loading ? icon || children : <Digital className={s.loader} />}
    </button>
  );
};

export default Button;
