import styled from 'styled-components';
import Link from 'next/link';

const PageHolder = styled.div`
  display: flex;
  margin-left: 20vw;
`;

const AccountInfoSideBar = styled.aside`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 20vw;
  border-right: solid 1px ${props => props.theme.darkestColor};
  padding: ${props => props.theme._spacer()};
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.darkColor};
  background-color: ${props => props.theme.mediumColor};
  box-shadow: 2px 0px 5px ${props => props.theme.mediumColor};
  h2 {
    margin-bottom: ${props => props.theme._spacer()};
    text-align: center;
  }
  h3 {
    margin-bottom: ${props => props.theme._spacer()};
    width: 100%;
    text-align: center;
  }
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border: solid 5px ${props => props.theme.lightestColor};
  border-radius: 50%;
  background: ${props => props.theme.lightestColor};
  margin-bottom: ${props => props.theme._spacer()};
`;

const MainNav = styled.nav`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme._spacer()} 0 0 ${props => props.theme._spacer(2)};
  a {
    margin-bottom: ${props => props.theme._spacer()};
  }
`;

export default function AppWrapper(props) {
  return (
    <>
      <AccountInfoSideBar>
        <h2>My Top Ten</h2>
        <ProfilePicture src="http://sdserage.com/assets/pictures/sdsPhotoSquare.jpg" alt="profile picture" />
        <h3>User Name</h3>
        <MainNav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/my-lists">
            <a>My Lists</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/about">
            <a>Settings</a>
          </Link>
        </MainNav>
      </AccountInfoSideBar>
      <PageHolder>
        {props.children}
      </PageHolder>
    </>
  );
};