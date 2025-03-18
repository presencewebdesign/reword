import { FormEventHandler, useEffect, useState } from 'react';
import { Button, BUTTON_TYPE } from '@app/components';
import s from './ApiKey.module.scss';
import { useRewordContext } from '@app/context';

export interface ApiKeyFormProps {
  callback(apiKey: string): void;
}

const ApiKey = ({ callback }: ApiKeyFormProps) => {
  const { apiKey: keyFromContext } = useRewordContext();
  const [apiKey, setApiKey] = useState<string>(keyFromContext || '');
  const [formError, setFormError] = useState<string>();

  useEffect(() => {
    if (keyFromContext && keyFromContext !== apiKey) setApiKey(keyFromContext);
  }, [keyFromContext]);

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();

    if (apiKey === '') {
      setFormError('Please Enter an API Key');
      return;
    }

    setFormError('');

    callback(apiKey);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h3 className={s.title}>Please enter your IBM Cloud API Key:</h3>
      {formError && <p className={'error'}>{formError}</p>}
      <input
        className={s.input}
        type="text"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
      />
      <Button type={BUTTON_TYPE.SUBMIT}>Submit</Button>
    </form>
  );
};

export default ApiKey;
