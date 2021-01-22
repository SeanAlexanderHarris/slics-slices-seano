import React from 'react';
import IdentityModal, {
  useIdentityContext,
} from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css'; // delete if you want to bring your own CSS

import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyles = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 20px;
    text-align: center;
    align-items: center;
    list-style: none;
    margin-top: -6rem;
  }
  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    &:nth-child(1) {
      --rotate: 1deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
    &:hover {
      --rotate: 3deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: red;
    }
    &[aria-current='page'] {
      color: red;
    }
  }
`;

export default function Nav() {
  const identity = useIdentityContext();
  const [dialog, setDialog] = React.useState(false);
  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.full_name) ||
    'NoName';
  const avatarUrl =
    identity &&
    identity.user &&
    identity.user.user_metadata &&
    identity.user.user_metadata.avatar_url;

  return (
    <NavStyles>
      <header className="App-header">
        {identity && identity.isLoggedIn ? (
          <>
            <h1> hello {name}!</h1>
            {avatarUrl && (
              <img
                alt="user name"
                src={avatarUrl}
                style={{ height: 100, borderRadius: '50%' }}
              />
            )}
            <button
              type="button"
              className="btn"
              style={{ maxWidth: 400, background: 'orangered' }}
              onClick={() => setDialog(true)}
            >
              LOG OUT
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn"
              style={{ maxWidth: 400, background: 'darkgreen' }}
              onClick={() => setDialog(true)}
            >
              LOG IN
            </button>
          </>
        )}

        <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={(user) => console.log('hello ', user?.user_metadata)}
          onSignup={(user) => console.log('welcome ', user?.user_metadata)}
          onLogout={() => console.log('bye ', name)}
        />
      </header>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas/">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
