import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import s from './Reword.module.scss';
import { Button, BUTTON_TYPE, Dropdown } from '@app/components';
import { useRewordContext } from '@app/context';
import { PROFESSION } from './enums';

const Reword = () => {
  const {
    loading,
    error: apiError,
    executeReword,
    initialText,
    setInitialText,
    profession,
    setProfession,
  } = useRewordContext();
  const [formError, setFormError] = useState<string>('');

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();

    if (!setProfession) {
      setFormError('Please select your profession');
      return;
    }

    setFormError('');

    executeReword().catch(() =>
      setFormError('Failed to reword text. Please try again.'),
    );
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setProfession(e.target.value as keyof typeof PROFESSION);
    setFormError('');
  };

  return (
    <form className={s.wrapper} onSubmit={handleSubmit}>
      <p>Please choose your profession:</p>
      <div className={s.dropdownContainer}>
        <Dropdown
          value={profession}
          onChange={handleSelectChange}
          disabled={loading}>
          <option>Select your profession</option>
          {Object.entries(PROFESSION).map(([key, value]) => (
            <option key={value} value={key}>
              {value}
            </option>
          ))}
        </Dropdown>
        {/* Display form error message */}
        {formError && <p className="error">{formError}</p>}
      </div>
      <textarea
        className={s.textarea}
        value={initialText}
        onChange={e => setInitialText(e.target.value)}
        placeholder="Enter your message here..."
        disabled={loading}
      />
      {/* Display API error message */}
      {apiError && <p className="error">{apiError}</p>}
      <Button type={BUTTON_TYPE.SUBMIT} loading={loading}>
        Reword
      </Button>
    </form>
  );
};

export default Reword;
