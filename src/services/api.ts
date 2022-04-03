import { IQResponse } from '../interfaces';

export const getQuestions = async (): Promise<IQResponse> => {
  const url = process.env.REACT_APP_API_URL;
  const response = await fetch(url as RequestInfo);
  const result = await response.json();
  return result;
};
