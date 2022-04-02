import { stringify } from 'querystring';

export interface IQuestion {
  category: string;
  question: string;
  correct_answer: 'True' | 'False';
}

export interface IError {
  msg: string;
}
