import { useEffect, useReducer } from "react"

const initialState = {number: 0}

type ActionType =
  | {type: 'increment', payload: number}
  | {type: 'decrease', payload: number}

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case 'increment':
      return {number: state.number + action.payload}
    case 'decrease':
      return {number: state.number - action.payload}
    default:
      throw new Error('Invalid action')
  }
}

function DelayedEffect(props: {timerMS: number}) {
  const {timerMS} = props;

  useEffect(() => {setTimeout(() => {console.log('abc')}, timerMS)})

  return null;
}

export const Exercise = () : JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <h1>{state.number}</h1>
      <button onClick={() => {dispatch({type: 'increment', payload: 5})}}> + </button>
      <button onClick={() => {dispatch({type: 'decrease', payload: 5})}}> - </button>
    </>
  )
}
