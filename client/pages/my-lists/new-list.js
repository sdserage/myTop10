import styled from 'styled-components';
import { Machine } from 'xstate';
import { interpret } from 'xstate/lib/interpreter';
import { useState, useEffect } from 'react';
import useStateMachine from '../../util/useStateMachine';
import PageWrapper from '../../components/styledComponents/PageWrapper';
import Router from 'next/router';
import EditableSubCategory from '../../components/EditableSubCategory';
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
    case 'UPDATE_TEST':
      return {...state, test: payload};
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
    test: 'test',
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

        <EditableSubCategory
          primary
          placeholder="Enter Sub Category"
          value={state.test}
          _saveChanges={value => dispatch('UPDATE_TEST', value)}
        />

      </form>
    </PageWrapper>
  );
}

const SubCategoriesContainer = styled.ul`
  
`;

const ListBox = styled.li`
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
    font-weight: bold;
    color: inherit;
    margin-bottom: ${props => props.theme._spacer()};
    grid-area: title;
  }
  h4 {
    color: inherit;
    grid-area: categories-heading;
  }
  span {
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

const CategoryLabel = styled.li`
  cursor: pointer;
  padding: ${props => props.theme._spacer()};
  background-color: ${props => props.primary ? props.theme.lightColor : props.theme.mediumColor};
  color: ${props => props.theme.lightestColor};
  border: ${props => props.primary ? props.theme.lightColor : props.theme.mediumColor} 1px solid; 
  display: inline-block;
  margin: ${props => props.theme._spacer()} ${props => props.theme._spacer()} 0 0;
  border-radius: 5px;
  box-shadow: 2px 2px 5px ${props => props.theme.mediumColor};
  max-height: 39px;
  text-align: center;
  outline: none;
  &:hover, &:focus {
    background-color: ${props => props.theme.lightestColor};
    color: ${props => props.primary ? props.theme.lightColor : props.theme.mediumColor};
  }
`;

const CategoryLabelSpecial = styled(CategoryLabel)`
  background-color: ${props => props.theme.lightColor};
  border: ${props => props.theme.lightColor} 1px solid; 
  position: relative;
  i {
    position: relative;
    color: inherit;
    font-size: 16px;
    justify-self: flex-end;
    margin-right: ${props => props.theme._spacer(0.5)};
    top: 3px;
  }
  &:hover, &:focus {
    color: ${props => props.theme.lightColor};
  }
`;

const ListsContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: ${props => props.theme._spacer(2)};
`;