import { FormEventHandler, useState } from 'react';
import { Button, BUTTON_TYPE } from '@app/components';
import s from '../ApiKey/ApiKey.module.scss';

export interface CommentFormProps {
  callback(apiKey: string): void;
}

const Comment = ({ callback }: CommentFormProps) => {
  const [comment, setComment] = useState<string>('');
  const [formError, setFormError] = useState<string>();

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();

    if (comment === '') {
      setFormError('Please enter a comment');
      return;
    }

    setFormError('');

    callback(comment);
    setComment('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h3 className={s.title}>
        Enter a comment about what you'd like to change:
      </h3>
      {formError && <p className={'error'}>{formError}</p>}
      <input
        className={s.input}
        type="text"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <Button type={BUTTON_TYPE.SUBMIT}>Submit</Button>
    </form>
  );
};

export default Comment;
