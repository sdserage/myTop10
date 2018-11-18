import styled from 'styled-components';
import { Machine } from 'xstate';
import { interpret } from 'xstate/lib/interpreter';
import { useState, useEffect } from 'react';

const modeMachine = Machine({
  id: 'mode',
  initial: 'view',
  states: {
    view: {
      on: {t_SWITCH_MODE: 'create'},
      initial: 'test1',
      states: {
        test1: {
          on: {t_SWITCH_MODER: 'test2'},
        },
        test2: {
          on: {
            t_SWITCH_MODER: 'test1'
          }
        },
      },
    },
    create: {
      on : {t_SWITCH_MODE: 'view'},
    },
  },
});

const PageWrapper = styled.section`
  padding: ${props => props.theme._spacer()};
  display: flex;
  flex-direction: column;
`;

export default function MyLists(props) {
  const [name, setName] = useState('Scott');
  const [mode, setMode] = useState(modeMachine.initial);
  const [service] = useState(interpret(modeMachine).onTransition(mode => setMode(mode)));
  useEffect(() => {
    service.start();
    return () => service.stop();
  }, []);
  console.log(mode)
  return (
    <PageWrapper>
      <h1>My Lists</h1>
      <p>{name}</p>
      <p>{`Current mode: ${mode.value === 'create' ? 'create' : mode.value && mode.value.view}`}</p>
      <button onClick={() => service.send('t_SWITCH_MODE')} />
      <button onClick={() => service.send('t_SWITCH_MODER')} />
      <input value={name} type='text' onChange={e => setName(e.target.value)} />
    </PageWrapper>
  )
}