import { useState, useEffect } from 'react';
import { interpret } from 'xstate/lib/interpreter';

/**
 * @name useStateMachine
 * @version 1.0.0
 * @description A custom React Hook that takes an XState state machine and a String and returns
 * an object with the current state of the machine and a service object to use XState methods
 * with.
 */

export default function useStateMachine(stateMachine, stateLabel) {
  const sl = typeof stateLabel === 'string' ? stateLabel : 'state';
  const [ state, setMode ] = useState(stateMachine.initial);
  const [ service ] = useState(interpret(stateMachine).onTransition(state => setMode(state)));
  useEffect(() => {
    service.start();
    return () => service.stop();
  }, []);
  let sm = {service}
  sm[sl] = state;
  return sm;
}
