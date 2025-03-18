import { useState } from 'react';
import s from './Home.module.scss';
import { useRewordContext } from '@app/context';
import { CommentForm, RewordForm } from '@app/forms';
import { Button, Modal } from '@app/components';

const Home = () => {
  const { rewordedText, loading, addComment, executeIteration } =
    useRewordContext();
  const [copied, setCopied] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

  const handleCopy = () => {
    if (!rewordedText) return;
    navigator.clipboard.writeText(
      rewordedText[rewordedText.length - 1].assistantResponse,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
  };

  const handleComment = (comment: string) => {
    if (!comment) return;
    addComment(comment);
    setShowCommentForm(false);
    executeIteration();
  };

  return (
    <div className={s.wrapper}>
      <RewordForm />
      {!loading && rewordedText && (
        <div className={s.responseContainer}>
          <div className={s.responseBox}>
            <textarea
              className={s.responseText}
              value={rewordedText[rewordedText.length - 1].assistantResponse}
              readOnly
            />
            <div className={s.buttonContainer}>
              <Button
                onClick={handleCopy}
                icon={copied ? 'done' : 'content_copy'}
                hideBackground
              />
              <Button
                onClick={() => setShowCommentForm(true)}
                icon={'chat_bubble'}
                hideBackground
              />
            </div>
          </div>
        </div>
      )}
      <Modal show={showCommentForm} close={() => setShowCommentForm(false)}>
        <CommentForm callback={handleComment} />
      </Modal>
    </div>
  );
};

export default Home;
