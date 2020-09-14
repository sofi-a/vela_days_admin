import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { fetchCategories } from '../../actions/category';

const Navigation = ({ categories, fetchCategories }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <Navbar className="shadow-sm bg-white" light expand="md">
                <NavbarBrand href="/home">
                    <img src="/images/logo.png" width="70" height="70" />
                    Smart Delivery
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>Categories</DropdownToggle>
                            <DropdownMenu right>
                                {categories.map(category => <DropdownItem>{category.name}</DropdownItem>)}
                                <DropdownItem divider />
                                <DropdownItem>See all categories</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>Markets</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>Mall Bogisich Inc</DropdownItem>
                                <DropdownItem>Grocery Nader, Wolf and Schuster</DropdownItem>
                                <DropdownItem>Shop Parker-Davis</DropdownItem>
                                <DropdownItem>Furniture Stokes LLC</DropdownItem>
                                <DropdownItem>Market Stokes-Hamill</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>See all markets</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav className="ml-auto mr-5" navbar>
                        <NavItem>
                            <Link to="/home/login" className="nav-link">Login</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/home/register" className="nav-link">Register</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

Navigation.propTypes = {
    categories: PropTypes.array.isRequired,
    fetchCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    categories: state.category,
});

export default connect(
    mapStateToProps,
    { fetchCategories },
)(Navigation);
