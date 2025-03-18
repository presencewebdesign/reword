import { PROFESSION } from '@app/forms';
import { Iteration } from '@app/types';

export const rewordMessage = (
  apiKey: string,
  inputText: string,
  rewordType: PROFESSION,
): Promise<string> =>
  fetch('/api/reword', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    method: 'POST',
    body: JSON.stringify({ inputText, rewordType }),
  })
    .then(data => data.json())
    .then(({ text }) => text);

export const iterateOnMessage = (
  apiKey: string,
  iteration: Iteration,
): Promise<string> =>
  fetch('/api/reword/iterate', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    method: 'POST',
    body: JSON.stringify({ iteration }),
  })
    .then(data => data.json())
    .then(({ text }) => text);
