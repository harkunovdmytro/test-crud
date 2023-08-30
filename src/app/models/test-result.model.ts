import { IQuestionResult } from './question-result.model';

export interface ITestResult {
  id: string;
  title: string
  tryId: string;
  questions: IQuestionResult[];
}
