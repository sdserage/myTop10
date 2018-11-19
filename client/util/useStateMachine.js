import { useState, useEffect } from 'react';
import { interpret } from 'xstate/lib/interpreter';

/**
 * @name useStateMachine
 * @version 1.0.0
 * @description A custom React Hook that takes an XState state machine and a String and returns
 * an object with the current state of the machine and a service object to use XState methods
 * with.
 */

export default function useStateMachine(stateMachine) {
  const [ state, setMode ] = useState(stateMachine.initial);
  const [ service ] = useState(interpret(stateMachine).onTransition(state => setMode(state)));
  const [ stateLabel ] = useState(service.machine.id === '(machine)' ? 'machine' : service.machine.id);
  // console.log(service)
  useEffect(() => {
    service.start();
    return () => service.stop();
  }, []);
  let sm = {service}
  sm[stateLabel] = state;
  return sm;
}
