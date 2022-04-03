import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Results } from '../components';
import mockQuestions from '../__mocks__/questions.json';
import { QuestionState } from '../store/questionSlice';

describe('<Questions />', () => {
  const initialQState: QuestionState = {
    questions: [],
    loading: false,
    results: [],
    errors: {
      msg: '',
    },
  };

  const mockStore = createMockStore([thunk]);
  const results: boolean[] = mockQuestions.map(() => Math.random() > 0.5);
  const finishedStore = mockStore({
    question: {
      ...initialQState,
      questions: mockQuestions,
      results,
    },
  });

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={finishedStore}>
          <Results />
        </Provider>
      </BrowserRouter>
    );
  });

  it('should display score which is formatted as "x / X"', () => {
    const scoreTxt = `${results.filter((r) => !!r).length} / ${
      mockQuestions.length
    }`;
    expect(screen.getByTestId('score').innerHTML).toEqual(scoreTxt);
  });

  it('should display all questions with its result', () => {
    results.forEach((r, i) => {
      expect(screen.getByTestId('result-' + i).innerHTML).toEqual(
        r ? '+' : '-'
      );
    });
  });

  it('should display "PLAY AGAIN?" link and navigate to home page when click it', () => {
    const link = screen.getByText(/PLAY AGAIN/i);
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(window.location.pathname).toBe('/');
  });
});
