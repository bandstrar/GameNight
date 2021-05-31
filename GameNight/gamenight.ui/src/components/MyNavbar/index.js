import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarBrand
} from 'reactstrap';
import Auth from '../Auth';

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const dbUser = props;

  return (
    <>
        <div>
        <Navbar expand='md' dark className='col-md-12 d-none d-md-block sidebar'>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
            <div className="sidebar-sticky"></div>
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
            <NavItem>
              {dbUser.realUser !== '' && <h3>Welcome {dbUser.realUser.firstName}!</h3>}
            </NavItem>
            <Auth />
          </Collapse>
        </Navbar>
      </div>
        </>
  );
};

export default withRouter(MyNavbar);
