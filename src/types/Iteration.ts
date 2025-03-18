import { PROFESSION } from '@app/forms';

export interface Iteration {
  initialText: string;
  rewordType: PROFESSION;
  responses: {
    assistantResponse: string;
    comment?: string;
  }[];
}
