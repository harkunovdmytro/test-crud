import { QuestionType } from './question-types.model';
import { IQuestionAnswer } from './question-answer.model';

export interface IQuestion {
  id: string;
  title: string;
  type: QuestionType;
  answer: string;
  answers: IQuestionAnswer[];
}
