export interface IQuestion {
  category: string;
  question: string;
  correct_answer: 'True' | 'False';
}

export interface IResponse {
  response_code: number;
  results: IQuestion[];
}
