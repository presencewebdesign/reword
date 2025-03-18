import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { iterateOnMessage, rewordMessage } from '@app/util/api';
import { PROFESSION } from '@app/forms';
import { Iteration } from '@app/types';

export interface RewordContextValue {
  loading: boolean;
  error?: string;
  rewordedText?: Iteration['responses'];
  apiKey?: string;
  initialText: string;
  profession?: keyof typeof PROFESSION;
  setInitialText: Dispatch<SetStateAction<string>>;
  setProfession: Dispatch<SetStateAction<keyof typeof PROFESSION | undefined>>;
  executeReword(): Promise<string | void>;
  executeIteration(): Promise<string | void>;
  updateApiKey(key: string): void;
  addComment(comment: string): void;
}

const initialValue: RewordContextValue = {
  loading: false,
  executeReword: () => {
    throw new Error('Function not implemented.');
  },
  executeIteration: () => {
    throw new Error('Function not implemented.');
  },
  updateApiKey: (_key: string) => {
    throw new Error('Function not implemented.');
  },
  initialText: '',
  setInitialText: function (): void {
    throw new Error('Function not implemented.');
  },
  setProfession: function (): void {
    throw new Error('Function not implemented.');
  },
  addComment: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const RewordContext = createContext<RewordContextValue>(initialValue);

const LOCAL_STORAGE_KEY = 'api-key';

export const RewordProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [rewordedText, setRewordedText] = useState<Iteration['responses']>();
  const [initialText, setInitialText] = useState<string>('');
  const [profession, setProfession] = useState<keyof typeof PROFESSION>();
  const [apiKey, setApiKey] = useState<string>();

  useEffect(() => {
    if (!apiKey) {
      const userApiKey = window.localStorage.getItem(LOCAL_STORAGE_KEY);

      userApiKey !== null && setApiKey(userApiKey);
    }
  }, [window]);

  const executeRequest = (request: () => Promise<void>) => {
    setLoading(true);

    if (!initialText.trim()) {
      setError('Please enter a valid conversation');
      setLoading(false);
      return Promise.resolve();
    }
    if (!profession) {
      setError('Please enter a profession');
      setLoading(false);
      return Promise.resolve();
    }

    if (!apiKey) {
      setError(
        'Please supply an API Key. Click the settings icon in the top right to enter one',
      );
      setLoading(false);
      return Promise.resolve();
    }

    return request()
      .then(() => setError(undefined))
      .catch(e => {
        setError(e.message);
      })
      .finally(() => setLoading(false));
  };

  const executeReword = () =>
    executeRequest(() =>
      rewordMessage(apiKey!, initialText, PROFESSION[profession!]).then(msg =>
        setRewordedText([{ assistantResponse: msg }]),
      ),
    );

  const executeIteration = () =>
    executeRequest(() =>
      iterateOnMessage(apiKey!, {
        initialText,
        rewordType: PROFESSION[profession!],
        responses: rewordedText || [],
      }).then(msg =>
        setRewordedText(prev => [...(prev || []), { assistantResponse: msg }]),
      ),
    );

  const updateApiKey = (key: string) => {
    setApiKey(key);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, key);
  };

  const addComment = (comment: string) => {
    const responses = rewordedText?.slice() || [];

    responses[responses.length - 1].comment = comment;

    setRewordedText([...responses]);
  };

  return (
    <RewordContext.Provider
      value={{
        loading,
        error,
        rewordedText,
        apiKey,
        executeReword,
        executeIteration,
        updateApiKey,
        initialText,
        setInitialText,
        profession,
        setProfession,
        addComment,
      }}>
      {children}
    </RewordContext.Provider>
  );
};
