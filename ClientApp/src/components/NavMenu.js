import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './loginn.css';
import logo from './img/render.png';
export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        {/*<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>*/}
        {/*  <NavbarBrand tag={Link} to="/">RenderGallery</NavbarBrand>*/}
        {/*  <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />*/}
        {/*  <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>*/}
        {/*    <ul className="navbar-nav flex-grow">*/}
        {/*      <NavItem>*/}
        {/*        <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>*/}
        {/*      </NavItem>*/}
        {/*      <NavItem>*/}
        {/*        <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>*/}
        {/*      </NavItem>*/}
        {/*      <NavItem>*/}
        {/*        <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>*/}
        {/*      </NavItem>*/}
        {/*    <NavItem>*/}
        {/*        <NavLink tag={Link} className="text-dark" to="/fetch-login">Sign In</NavLink>*/}
        {/*</NavItem>*/}
        {/*<NavItem>*/}
        {/*    <NavLink tag={Link} className="text-dark" to="/fetch-registro">Sign Up</NavLink>*/}
        {/*</NavItem>*/}
        {/*    </ul>*/}
        {/*  </Collapse>*/}
        {/*</Navbar>*/}

            <Navbar className="nav-main">
                <div className="navbar">
               
                    <a href="#home" className="logo">
                        <img src={logo} alt="Logo da Minha Empresa" width="150"/>
                    </a>

                </div>
                <NavItem className="opposite-buttons">
                    <NavLink tag={Link} className="button-left" to="/fetch-login">Login</NavLink>
       
      
                    <NavLink tag={Link} className="button-right" to="/fetch-registro">Cadastro</NavLink>
                </NavItem>
        </Navbar>
      </header>
    );
  }
}
