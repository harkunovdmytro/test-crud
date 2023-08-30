import { IQuestion } from './question.model';

export interface ITest {
  id: string;
  title: string
  questions: IQuestion[];
}
