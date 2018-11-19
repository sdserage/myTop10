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
            return (renderedList(user.lists, service))
          }}
        </Query>
      }
    </PageWrapper>
  )
}

function renderedList(lists, service) {
  return (
    <ListsContainer>
      {lists.map((list, index) => (
        <ListBox key={index}>
          <h2>{`Top ${list.size} ${list.title}`}</h2>
          <h4>Categories</h4>
          <ul>
            <CategoryLabel primary>{list.category}</CategoryLabel>
            {list.subCategories.map((subCategory, index) => <CategoryLabel key={index}>{subCategory}</CategoryLabel>)}
            <CategoryLabelSpecial>
              <i className="material-icons">
                add_circle_outline
              </i>
              add category
            </CategoryLabelSpecial>
          </ul>
        </ListBox>
      ))}
      <ListBoxSpecial onClick={() => service.send('t_CREATE_LIST')}>
        <h2>Create New List</h2>
        <i className="material-icons">
          add_circle_outline
        </i>
      </ListBoxSpecial>
  </ListsContainer>
  );
}

const SubCategoriesContainer = styled.ul`
  
`;

const ListBox = styled.li`
  border: ${props => props.theme.darkColor} solid 2px;
  border-radius: 5px;
  color: ${props => props.theme.darkColor};
  h2 {
    font-weight: bold;
    color: inherit;
    margin-bottom: ${props => props.theme._spacer()};
  }
  h4 {
    color: inherit;
  }
  padding: ${props => props.theme._spacer()};
  box-shadow: 2px 2px 5px ${props => props.theme.mediumColor};
  &:hover {
    background-color: ${props => props.theme.darkColor};
    color: ${props => props.theme.lightestColor};
  }
`;

const ListBoxSpecial = styled(ListBox)`
  text-align: center;
  color: ${props => props.theme.lightColor};
  border-color: ${props => props.theme.lightColor};
  i {
    color: inherit;
    font-size: 1000%;
    justify-self: center;
  }
  &:hover {
    background-color: ${props => props.theme.lightColor};
    color: ${props => props.theme.lightestColor};
  }
`;

const CategoryLabel = styled.li`
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
  &:hover {
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
  &:hover {
    color: ${props => props.theme.lightColor};
  }
`;

const ListsContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: ${props => props.theme._spacer(2)};
`;