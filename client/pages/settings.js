import PageWrapper from '../components/styledComponents/PageWrapper';
import { Machine } from 'xstate';
import { useState, useEffect } from 'react';
import useStateMachine from '../util/useStateMachine';

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
      on: {
        t_SWITCH_MODE: 'view',
        t_SWITCH_MODER: 'view.test2'
      },
    },
  },
});

export default function Settings(props) {
  const { service, mode } = useStateMachine(modeMachine);
  console.log(mode.value)
  return (
    <PageWrapper>
      <h1>Settings</h1>
      <button onClick={() => service.send('t_SWITCH_MODE')} />
      <button onClick={() => service.send('t_SWITCH_MODER')} />
    </PageWrapper>
  )
}