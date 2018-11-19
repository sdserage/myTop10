import styled from 'styled-components';
import { Machine } from 'xstate';
import { interpret } from 'xstate/lib/interpreter';
import { useState, useEffect } from 'react';
import useStateMachine from '../util/useStateMachine';
import PageWrapper from '../components/styledComponents/PageWrapper';
// GraphQL
import { Query } from 'react-apollo';
import { gql_GET_LISTS } from '../graphQL/queries';

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

export default function MyLists(props) {
  const { service, myLists } = useStateMachine(modeMachine);
  const [ userId ] = useState('5becea48e380055c7777dba4');
  return (
    <PageWrapper>
      <h1>My Lists</h1>
      {myLists.value === 'viewLists' &&
        <Query query={gql_GET_LISTS} variables={{id: userId}}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) {
              console.log(error)
              return <div>Error!</div>;
            }
            const { user } = data;
            return (renderedList(user.lists))
          }}
        </Query>
      }
    </PageWrapper>
  )
}

function renderedList(lists) {
  return (
    <ListsContainer>
      {lists.map((list, index) => (
        <li key={index}>
          <h2>{`Top ${list.size} ${list.title}`}</h2>
          <ul>
            <CategoryLabel primary>{list.category}</CategoryLabel>
            {list.subCategories.map((subCategory, index) => <CategoryLabel key={index}>{subCategory}</CategoryLabel>)}
          </ul>
        </li>
      ))}
  </ListsContainer>
  );
}

const SubCategoriesContainer = styled.ul`
  
`;

const ListBox = styled.li`

`;

const CategoryLabel = styled.li`
  padding: ${props => props.theme._spacer()};
  background-color: ${props => props.primary ? props.theme.lightColor : props.theme.mediumColor};
  color: ${props => props.theme.lightestColor};
  display: inline-block;
  margin: 0 ${props => props.theme._spacer()} ${props => props.theme._spacer()} 0;
  border-radius: 5px;
`;

const ListsContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: ${props => props.theme._spacer()};
`;