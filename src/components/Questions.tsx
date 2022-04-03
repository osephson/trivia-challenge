import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { fetchQuestions, onAnswer } from '../store/questionSlice';
import { RootState } from '../store';

const Questions = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { questions, loading, errors } = useSelector(
    (state: RootState) => state.question
  );

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const onAns = (ans: true | false) => {
    dispatch(onAnswer({ index, ans }));
    if (index === questions.length - 1) {
      return navigate('/results');
    }
    setIndex(index + 1);
  };

  return (
    <main className='questions'>
      {!loading ? (
        !errors.msg ? (
          questions.length ? (
            <div>
              <h1 className='mb-5'>{questions[index].category}</h1>
              <div className='q-question d-flex align-items-center'>
                <span
                  dangerouslySetInnerHTML={{
                    __html: questions[index].question,
                  }}
                ></span>
              </div>
              <div className='my-3'>
                {index + 1} of {questions.length}
              </div>
              <div>
                <Button
                  variant='primary'
                  className='mx-3'
                  size='lg'
                  onClick={() => onAns(true)}
                >
                  Yes
                </Button>
                <Button
                  variant='danger'
                  className='mx-3'
                  size='lg'
                  onClick={() => onAns(false)}
                >
                  No
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3>Nothing to display</h3>
              <Link to='/'>GO HOME!</Link>
            </>
          )
        ) : (
          <>
            <h3>{errors.msg}</h3>
            <div className='d-flex'>
              <Link
                to='#'
                onClick={() => {
                  dispatch(fetchQuestions());
                }}
              >
                Reload
              </Link>
              <span className='px-3'>|</span>
              <Link to='/'>GO HOME</Link>
            </div>
          </>
        )
      ) : (
        <h4>Loading...</h4>
      )}
    </main>
  );
};

export default Questions;
