import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Navbar,
  NavItem,
  Nav,
  NavbarBrand
} from 'reactstrap';
import Auth from '../Auth';

const MyNavbar = (props) => {
  const dbUser = props;

  return (
        <Navbar expand='md' light className='sidebar'>
            <div>
              <Nav>
            <NavbarBrand>
                <Link className="m-3 nav-link navbar-links nav-font" to='/'>GameNight</Link>
              </NavbarBrand>
              <NavItem>
                <Link className="m-3 nav-link navbar-links nav-font" to='/my-groups'>My Groups</Link>
              </NavItem>
              <NavItem>
                <Link className="m-3 nav-link navbar-links nav-font" to='/my-games'>
                  My Games
                </Link>
              </NavItem>
              </Nav>
              </div>
              <div>
                <Nav>
            {dbUser.realUser && <NavItem>
              <h3>Welcome {dbUser.realUser.firstName}!</h3>
            </NavItem>}
            </Nav>
            <Auth />
            </div>
        </Navbar>
  );
};

export default withRouter(MyNavbar);
