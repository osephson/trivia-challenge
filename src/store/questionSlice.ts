import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IQuestion, IQResponse } from '../interfaces';

import { getQuestions } from '../api';

export interface QuestionState {
  questions: IQuestion[];
  loading: boolean;
  results: boolean[];
  errors: {
    msg: string;
  };
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  results: [],
  errors: {
    msg: '',
  },
};

export const fetchQuestions = createAsyncThunk(
  'questions/fetchAll',
  async () => {
    const response: IQResponse = await getQuestions();
    return response.results;
  }
);

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    onAnswer: (
      state,
      action: PayloadAction<{ index: number; ans: boolean }>
    ) => {
      const { questions, results } = state;
      const { ans, index } = action.payload;
      if (index >= questions.length) return { ...state };

      if (questions[index].correct_answer === 'True') {
        if (ans) results[index] = true;
      } else {
        if (!ans) results[index] = true;
      }

      state.results = [...results];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      return {
        ...state,
        loading: true,
        questions: [],
        results: [],
        errors: { msg: '' },
      };
    });
    builder.addCase(fetchQuestions.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        questions: payload,
        results: Array(payload.length).fill(false),
        errors: { msg: '' },
      };
    });
    builder.addCase(fetchQuestions.rejected, (state) => {
      return {
        ...state,
        loading: false,
        questions: [],
        results: [],
        errors: { msg: 'Something went wrong!' },
      };
    });
  },
});

export const { onAnswer } = questionSlice.actions;

export default questionSlice.reducer;
