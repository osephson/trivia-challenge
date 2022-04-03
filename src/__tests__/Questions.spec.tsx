import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import mockQuestions from '../__mocks__/questions.json';
import { Questions } from '../components';

import { store } from '../store';
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

  it('should display "loading" when loading questions', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Questions />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display first question and display "YES"/"NO" buttons.', () => {
    const loadedStore = mockStore({
      question: {
        ...initialQState,
        questions: mockQuestions,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={loadedStore}>
          <Questions />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(mockQuestions[0].category)).toBeInTheDocument();
    expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('should display all quiz and navigate to results page after all is finished', () => {
    const loadedStore = mockStore({
      question: {
        ...initialQState,
        loading: false,
        questions: mockQuestions,
        results: Array(mockQuestions.length).fill(false),
      },
    });

    render(
      <BrowserRouter>
        <Provider store={loadedStore}>
          <Questions />
        </Provider>
      </BrowserRouter>
    );

    const yesBtn = screen.getByText(/Yes/i);
    const noBtn = screen.getByText(/No/i);

    mockQuestions.forEach((q) => {
      expect(screen.getByText(q.category)).toBeInTheDocument();

      const isClickYes = Math.random() < 0.5;
      fireEvent.click(isClickYes ? yesBtn : noBtn);
    });
    expect(window.location.pathname).toBe('/results');
  });

  it('should display "Nothing to display" and "GO HOME" link', () => {
    const loadedStore = mockStore({
      question: {
        ...initialQState,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={loadedStore}>
          <Questions />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Nothing to display')).toBeInTheDocument();
    expect(screen.getByText('GO HOME!')).toBeInTheDocument();
  });
});
