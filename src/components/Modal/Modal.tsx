import { createPortal } from 'react-dom';
import s from './Modal.module.scss';
import { MouseEventHandler, PropsWithChildren, useRef } from 'react';
import { Button } from '@app/components';

/**
 * Props Type Interface for {@link Modal}
 */
export interface ModalProps extends PropsWithChildren {
  show: boolean;
  close(): void;
}

/**
 * Component wrapper for a Modal
 * @param {ModalProps} props
 * @returns {JSX.Element}
 */
const Modal = ({ show, close, children }: ModalProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const container = document.getElementById('modal-portal');

  const handleClickOutside: MouseEventHandler<HTMLDivElement> = e => {
    if (!ref.current?.contains(e.target as Node)) close();
  };

  if (!container) throw new Error('No Modal Root Container found!');

  return createPortal(
    <div
      className={[s.wrapper, s[!show ? 'hide' : '']].join(' ')}
      onClick={handleClickOutside}>
      <div className={s.contentWrapper} ref={ref}>
        <Button
          className={s.close}
          onClick={close}
          icon={'close'}
          hideBackground
        />
        {children}
      </div>
    </div>,
    container,
  );
};

export default Modal;
