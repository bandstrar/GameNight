import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Navbar,
  NavItem,
  Nav,
  NavbarBrand
} from 'reactstrap';
import Auth from '../Auth';
import SearchInput from '../SearchInput';

const MyNavbar = (props) => {
  const dbUser = props;

  return (
        <Navbar expand='md' light className='sidebar'>
            <div>
              <Nav>
            <NavbarBrand>
                <Link className="m-3 nav-link navbar-links nav-font" to='/'>GameNight</Link>
              </NavbarBrand>
              {dbUser.realUser && <NavItem>
                <Link className="m-3 nav-link navbar-links nav-font" to='/my-games'>
                  My Games
                </Link>
              </NavItem>}
              {dbUser.realUser && <NavItem>
                <Link className="m-3 nav-link navbar-links nav-font" to='/my-groups'>My Groups</Link>
              </NavItem>}
              {dbUser.realUser && <><SearchInput />
              <p className="mt-2 ml-4">Search for a Group</p></>}
              </Nav>
              </div>
              <div>
                <Nav>
            {dbUser.realUser && <><NavItem>
              <h3>Welcome {dbUser.realUser.firstName}!</h3>
            </NavItem>
            <NavItem>
            <img className="navbar-photo" src={dbUser.realUser.userImage} alt={`${dbUser.realUser.firstName} ${dbUser.realUser.lastName}`} />
          </NavItem></>}
            </Nav>
            <Auth />
            </div>
        </Navbar>
  );
};

export default withRouter(MyNavbar);
