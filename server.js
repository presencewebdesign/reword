/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

function fetchBearerToken(apiKey) {
  if (!apiKey) throw new Error('No API Key found');

  return fetch('https://iam.cloud.ibm.com/identity/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
  })
    .then(resp => resp.json())
    .then(({ access_token }) => access_token)
    .catch(e => {
      console.error(e.message);
    });
}

const generateText = (apiKey, message) =>
  fetchBearerToken(apiKey)
    .then(token => {
      const url =
        'https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2024-07-11';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const body = {
        input: message,
        parameters: {
          decoding_method: 'greedy',
          max_new_tokens: 200,
          min_new_tokens: 0,
          stop_sequences: [],
          repetition_penalty: 1,
        },
        model_id: 'ibm/granite-13b-chat-v2',
        project_id: '28143c14-9896-4d65-9f78-21449139b3f3',
      };

      return fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify(body),
      })
        .then(resp => resp.json())
        .then(resp => {
          return resp.results[0].generated_text;
        })
        .catch(e => {
          console.error(e.message);
        });
    })
    .catch(e => {
      throw new Error(e.message);
    });

app.post('/reword', async (req, res) => {
  const { inputText, rewordType } = req.body;
  const { authorization: apiKey } = req.headers;

  const context_text = `<|system|>\nYou are an AI assistant and your role is not to answer the question! we want to refine users messages, making them more polished and suitable for the intended response. Please respond only with an improved version of the user's input without initiating a conversation or requesting additional information.\n<|user|>\nCould you transform the following text into an appropriate response style from a ${rewordType} department? "${inputText}"\n<|assistant|>\n`;
  return generateText(apiKey, context_text)
    .then(text => res.status(200).json({ text }))
    .catch(e => {
      console.error(e.message);
      res
        .status(500)
        .json({ error: 'An error occurred while processing your request.' });
    });
});

const buildPrompt = iteration => {
  const { initialText, rewordType, responses } = iteration;
  let context_text = `<|system|>\nYou are an AI assistant and your role is not to answer the question! We want to refine users messages, making them more polished and suitable for the intended response. Please respond only with an improved version of the user's input without initiating a conversation or requesting additional information.\n<|user|>\nCould you transform the following text into an appropriate response style from a ${rewordType} department? "${initialText}"\n`;

  responses.forEach(
    ({ assistantResponse, comment = undefined }) =>
      comment &&
      (context_text += `<|assistant|>\n${assistantResponse}\n<|user|>\n${comment}\n`),
  );

  return context_text;
};

/**
 * Endpoint to iterate on the response sent from WatsonX
 *
 * ```ts
 * interface Iteration {
 *  initialText: string;
 *  rewordType: PROFESSION;
 *  responses: {
 *     assistantResponse: string;
 *     comment: string;
 *   }[];
 * }
 * ```
 */
app.post('/reword/iterate', async (req, res) => {
  const { iteration } = req.body;
  const { authorization: apiKey } = req.headers;

  const context_text = buildPrompt(iteration);
  return generateText(apiKey, context_text)
    .then(text => res.status(200).json({ text }))
    .catch(e => {
      console.error(e.message);
      res
        .status(500)
        .json({ error: 'An error occurred while processing your request.' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
