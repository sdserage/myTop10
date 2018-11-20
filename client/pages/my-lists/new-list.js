import styled from 'styled-components';
import { Machine } from 'xstate';
import { interpret } from 'xstate/lib/interpreter';
import { useState, useEffect } from 'react';
import useStateMachine from '../../util/useStateMachine';
import PageWrapper from '../../components/styledComponents/PageWrapper';
import Router from 'next/router';
// GraphQL
import { Query } from 'react-apollo';
import { gql_GET_LISTS } from '../../graphQL/queries';

const modeMachine = Machine(
  {
    id: 'myLists',
    initial: 'viewLists',
    states: {
      viewLists: {
        on: {t_CREATE_LIST: 'createList'},
        onEntry: ['refreshLists', 'clearNewList'],
      },
      createList: {
        on: {
          t_CANCEL_CREATE: {
            target: 'viewLists',
            actions: ['cancelCreate'], 
          },
          t_PUBLISH_LIST: {
            target: 'sendingList',
            actions: ['publishList'],
          },
        },
      },
      sendingList: {
        on: {
          t_CREATED_LIST_SUCCESS: 'viewLists',
          t_CREATED_LIST_FAILURE: {
            target: 'createList',
            actions: ['displayError'],
          },
        },
      },
    },
  },
  {
    actions: {
      cancelCreate: (ctx, event) => {
        console.log('Cancelled create');
      },
      clearNewList: (ctx, event) => {
        console.log('Cleared list values');
      },
      displayError: (ctx, event) => {
        console.log('An error occured');
      },
      publishList: (ctx, event) => {
        console.log('A list was published');
      },
      refreshLists: (ctx, event) => {
        console.log('The lists were refreshed');
      },
    },
  },
);

function reducer(state, { type, payload }) {
  switch (type) {
    case 'UPDATE_TITLE':
      return {...state, title: payload};
    case 'UPDATE_CATEGORY':
      return {...state, category: payload};
    case 'UPDATE_SUBCATEGORIES':
      return {...state, subCategories: payload};
    case 'UPDATE_SIZE':
      return {...state, size: payload};
    case 'UPDATE_ITEMS':
      return {...state, items: payload};
    default:
      return state;
  }
}



export default function NewList(props) {
  const [ state, updateState ] = useState({
    title: '',
    category: '',
    subCategories: [],
    size: 10,
    items: [],
  });

  function dispatch(type, payload) {
    return reducer(state, {type, payload});
  }
  
  return (
    <PageWrapper>
      <h1>New List</h1>
      <form>
        
      </form>
    </PageWrapper>
  );
}