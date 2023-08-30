import { IQuestionAnswerResult } from './question-answer.model';
import { QuestionType } from './question-types.model';

export interface IQuestionResult {
  id: string;
  title: string;
  type: QuestionType;
  answer: string;
  answerResult: string | null;
  answers: IQuestionAnswerResult[];
}
