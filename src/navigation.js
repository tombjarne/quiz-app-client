import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import { Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/navbar.css';
import { PAGES } from "./constants";

class Navigation extends React.Component{

  constructor( props ) {
    super( props );
    this.state = {
      isOpen: false
    }
  }

  navigate( view ) {
    const { history } = this.props;
    view && history.push( view );
  };

  toggle() {
    this.setState( {
      isOpen: !this.state.isOpen
    } )
  }

  render() {
    return (
     <>
       <section id="navbar" className="flex row all-centered">
         <Navbar color="light" light expand="md">
           <NavbarBrand href="/">quiz-app</NavbarBrand>
           <NavbarToggler onClick={ () => this.toggle() }/>
           <Collapse isOpen={ this.state.isOpen } navbar>
             <Nav className="mr-auto" navbar>
               { PAGES.map( page =>
                <NavItem key={ page.name } onClick={ () => this.navigate( page.url ) }>
                  <NavLink color="info">{ page.name }</NavLink>
                </NavItem>
               ) }
               <UncontrolledDropdown nav inNavbar>
                 <DropdownToggle nav caret>
                   More
                 </DropdownToggle>
                 <DropdownMenu right>
                   <DropdownItem target="blank" href="https://github.com">
                     GitHub
                   </DropdownItem>
                 </DropdownMenu>
               </UncontrolledDropdown>
             </Nav>
           </Collapse>
         </Navbar>
       </section>
     </>
    )
  }
}

export default withRouter( Navigation );
