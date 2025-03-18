import { Button, Modal } from '@app/components';
import s from './Header.module.scss';
import { useState } from 'react';
import { ApiKeyForm } from '@app/forms';
import { useRewordContext } from '@app/context';

/**
 * Component which defines the header of the page
 * @returns {JSX.Element}
 */
const Header = (): JSX.Element => {
  const [modalShown, setModalShown] = useState<boolean>(false);
  const { updateApiKey } = useRewordContext();

  const handleApiKeySubmit = (key: string) => {
    updateApiKey(key);
    setModalShown(false);
  };

  return (
    <header className={s.wrapper}>
      <Button
        className={s.settings}
        onClick={() => setModalShown(prev => !prev)}
        icon={'settings'}
        hideBackground
      />
      <h1 className={s.title}>
        Reword App
        <img
          className={s.logo}
          src="/images/reword_full.png"
          alt="Reword App Logo"
        />
      </h1>
      <p className={s.subtitle}>
        Reword App uses WatsonX AI to reword your conversations
      </p>
      <Modal show={modalShown} close={() => setModalShown(prev => !prev)}>
        <ApiKeyForm callback={handleApiKeySubmit} />
      </Modal>
    </header>
  );
};

export default Header;
