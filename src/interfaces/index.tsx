export interface IQuestion {
  category: string;
  question: string;
  correct_answer: 'True' | 'False';
}

export interface IQResponse {
  response_code: number;
  results: IQuestion[];
}
