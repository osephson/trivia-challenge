import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IQuestion } from '../interfaces';

import { getQuestions } from '../api';

export interface QuestionState {
  questions: IQuestion[];
  loading: boolean;
  results: boolean[];
}

const initialState: QuestionState = {
  questions: [],
  loading: true,
  results: [],
};

export const fetchQuestions = createAsyncThunk(
  'questions/fetchAll',
  async () => {
    const response: any = await getQuestions();
    return response.data;
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
      return { ...state, loading: true, questions: [], results: [] };
    });
    builder.addCase(fetchQuestions.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        questions: payload,
        results: Array(payload.length).fill(false),
      };
    });
    builder.addCase(fetchQuestions.rejected, (state) => {
      return { ...state, loading: false, questions: [], results: [] };
    });
  },
});

export const { onAnswer } = questionSlice.actions;

export default questionSlice.reducer;
