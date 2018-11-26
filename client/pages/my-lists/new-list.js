import styled from 'styled-components';
import { Machine } from 'xstate';
import { interpret } from 'xstate/lib/interpreter';
import { useState, useEffect } from 'react';
import useStateMachine from '../../util/useStateMachine';
import PageWrapper from '../../components/styledComponents/PageWrapper';
import Router from 'next/router';
import EditableSubCategory from '../../components/EditableSubCategory';
import EditableCategory from '../../components/EditableCategory';
import Condition from '../../components/Condition';
// GraphQL
import { Query } from 'react-apollo';
import { gql_GET_LISTS } from '../../graphQL/queries';

const categoryOptions = [
  'Sports',
  'TV Shows',
  'Literature',
  'Health',
  'Gaming',
  'Animals',
  'Music',
  'Food',
  'Hobbies',
  'Nature',
  'Fantasy',
  'Sci-Fi',
  'Technology',
  'History',
  'Science',
  'Outdoor Recreation',
];

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
    case 'UPDATE_TEST':
      return {...state, test: payload};
    default:
      return state;
  }
}

function updateValueInArray(array, newValue, originalValue) {
  console.log('newValue: ', newValue);
  console.log('originalValue: ', originalValue);
  const desiredIndex = array.findIndex(arrayElement => arrayElement === originalValue);
  if (desiredIndex < 0) {
    return array;
  }
  let newArray = array.slice();
  newArray[desiredIndex] = newValue;
  return newArray;
}

export default function NewList(props) {
  const [ state, updateState ] = useState({
    title: '',
    category: '',
    subCategories: [],
    size: 10,
    items: [],
    test: 'test',
  });
  const [subCategory, updateSubCategory] = useState('');
  const [item, updateItem] = useState({});

  function dispatch(type, payload) {
    updateState(reducer(state, {type, payload}));
  }
  const listSizePlaceholder = "Please enter a non negative whole number";
  const titlePlaceholder = "(Enter title here)";
  const titleSize = state.title.length || titlePlaceholder.length;
  console.log("Current state: ", state);
  return (
    <PageWrapper>
      <h1>New List</h1>
      <ListBox size={String(state.size).length || listSizePlaceholder.length}>
        <h2>
          Top&nbsp;
          <input
            type="number"
            placeholder={listSizePlaceholder}
            value={state.size}
            onChange={e => {
              let cleanedValue = e.target.value.split('-').join('').split('.').join('');
              if (Number(cleanedValue) < 2) {
                cleanedValue = 2;
              }
              dispatch('UPDATE_SIZE', Number(cleanedValue));
            }}
            min="2"
            step="1"
          />
          <input
            type="text"
            placeholder={titlePlaceholder}
            value={state.title}
            onChange={e => dispatch('UPDATE_TITLE', e.target.value)}
            size={titleSize}
          />
        </h2>
        <section></section>
        <h4>Categories</h4>
        <ul>
          <EditableCategory
            placeholder="Choose a primary category"
            options={categoryOptions}
            value={state.category}
            onChange={value => dispatch('UPDATE_CATEGORY', value)}
          />
          {state.subCategories.map((subCategory, index) => (
            <EditableSubCategory
              key={index}
              placeholder="Sub-categories can not be empty"
              value={subCategory}
              _saveChanges={(newValue, originalValue) => dispatch('UPDATE_SUBCATEGORIES', updateValueInArray(state.subCategories, newValue, originalValue))}
            />
          ))}
          <EditableSubCategory
            special
            submitType
            placeholder="Add a new sub category"
            _saveChanges={value => dispatch('UPDATE_SUBCATEGORIES', [...state.subCategories, value])}
          />
        </ul>

      </ListBox>
    </PageWrapper>
  );
}

const SubCategoriesContainer = styled.ul`
  
`;

const ListBox = styled.form`
  border: ${props => props.theme.darkColor} solid 2px;
  border-radius: 5px;
  color: ${props => props.theme.darkColor};
  /* background-color: ${props => props.theme.darkColor};
    color: ${props => props.theme.lightestColor}; */
  display: grid;
  grid-template-areas:
    "title title edit"
    "categories-heading . ."
    "categories categories categories"
  ;
  align-content: start;
  h2 {
    color: inherit;
    grid-area: title;
    font-size: 1.5em;
    font-weight: bold;
    input {
      font-weight: inherit;
      font-size: inherit;
      background-color: transparent;
      border: none;
      color: inherit;
      margin-bottom: ${props => props.theme._spacer()};
      outline: none;
      border-radius: 5px;
    }
    input:first-child {
      width: ${props => props.size * 22}px;
    }
    input::placeholder {
      color: ${props => props.theme.mediumColor};
    }
    input:hover, input:focus {
      background: ${props => props.theme.lightestColor};
      color: ${props => props.theme.lightColor}
    }
  }
  h4 {
    color: inherit;
    grid-area: categories-heading;
  }
  section {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    button {
      cursor: pointer;
      grid-area: edit;
      color: ${props => props.theme.lightestColor};
      border: none;
      background: transparent;
      display: grid;
      align-content: end;
      padding: ${props => props.theme._spacer(0.5)};
      justify-content: start;
      outline: none;
      i {
        color: inherit;
        font-size: 16px;
      }
    }
    button:hover, button:focus {
      color: ${props => props.theme.lightColor};
    }
  }
  ul {
    grid-area: categories;
  }
  padding: ${props => props.theme._spacer()};
  box-shadow: 2px 2px 5px ${props => props.theme.mediumColor};
  &:hover, &:focus-within {
    background-color: ${props => props.theme.darkColor};
    color: ${props => props.theme.lightestColor};
  }
`;

const ListBoxSpecial = styled(ListBox)`
  cursor: pointer;
  text-align: center;
  color: ${props => props.theme.lightColor};
  border-color: ${props => props.theme.lightColor};
  display: flex;
  flex-direction: column;
  align-content: center;
  i {
    color: inherit;
    font-size: 1000%;
    justify-self: center;
  }
  &:hover, &:focus-within {
    background-color: ${props => props.theme.lightColor};
    color: ${props => props.theme.lightestColor};
  }
`;

const ListsContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: ${props => props.theme._spacer(2)};
`;