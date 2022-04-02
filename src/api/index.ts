import { IResponse } from '../interfaces';

export const getQuestions = async (): Promise<IResponse> => {
  const response = await fetch(
    'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
  );
  const result = await response.json();
  return result;
};
