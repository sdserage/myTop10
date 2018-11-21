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
  console.log(state, type, payload)
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
  const [subCategory, updateSubCategory] = useState('');
  const [item, updateItem] = useState({});

  function dispatch(type, payload) {
    updateState(reducer(state, {type, payload}));
  }
  
  console.log("Current state: ", state);
  return (
    <PageWrapper>
      <h1>New List</h1>
      <form>
        <input
          type="text"
          placeholder="Title"
          value={state.title}
          onChange={e => dispatch('UPDATE_TITLE', e.target.value)}
        />
        <select value={state.category} onChange={e => dispatch('UPDATE_CATEGORY', e.target.value)}>
          <option value="" disabled>Choose a category</option>
          <option value="Sports">Sports</option>
          <option value="TV Shows">TV Shows</option>
          <option value="Literature">Literature</option>
          <option value="Health">Health</option>
          <option value="Gaming">Gaming</option>
          <option value="Animals">Animals</option>
          <option value="Music">Music</option>
          <option value="Food">Food</option>
          <option value="Hobbies">Hobbies</option>
          <option value="Nature">Nature</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Technology">Technology</option>
          <option value="History">History</option>
          <option value="Science">Science</option>
          <option value="Outdoor Recreation">Outdoor Recreation</option>
        </select>

        <ul>
          {state.subCategories.map((subCategory, index) => <li key={index}>{subCategory}</li>)}
          <input type="text" value={subCategory} placeholder="Add a sub category" onChange={e => updateSubCategory(e.target.value)} />
          <button
            onClick={e => {
              e.preventDefault();
              dispatch('UPDATE_SUBCATEGORIES', [...state.subCategories, subCategory]);
              updateSubCategory('');
            }}
          >
            Save Sub Category
          </button>
        </ul>

        <input
          type='text'
          pattern="\d*"
          value={state.size}
          onChange={e => dispatch('UPDATE_SIZE', Number(e.target.value))}
        />

      </form>
    </PageWrapper>
  );
}