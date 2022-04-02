import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { RootState } from '../store';

const Results = () => {
  const { questions, results } = useSelector(
    (state: RootState) => state.question
  );

  const score = results.filter((r) => !!r).length;

  return (
    <main>
      {questions.length ? (
        <>
          <div className='mb-5'>
            <h1>You scored</h1>
            <b>
              {score} / {results.length}
            </b>
          </div>

          <div>
            {questions.map((q, i) => (
              <div key={i} className='q-result-item d-flex mb-3'>
                <b className='q-mark'>{results[i] ? '+' : '-'}</b>
                <span dangerouslySetInnerHTML={{ __html: q.question }}></span>
              </div>
            ))}
          </div>

          <div>
            <Link to='/'>PLAY AGAIN?</Link>
          </div>
        </>
      ) : (
        <Navigate to='/'></Navigate>
      )}
    </main>
  );
};

export default Results;
