/* eslint-disable quote-props,max-len */
import React, { PropTypes, Component } from 'react';
import { Menu } from 'semantic-ui-react';

const paths = {
  'Главная': '/',
  'Список': '/list',
  'Карта': '/map',
};


class Header extends Component {
  state = {};

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.navigate(paths[name]);
  };

  render() {
    const items = [
      { key: 'home', active: location.pathname === '/', name: 'Главная' },
      { key: 'map', active: location.pathname === '/map', name: 'Карта' },
      { key: 'list', active: location.pathname === '/list', name: 'Список' },
    ];
    return <Menu widths={5} color={'blue'} stackable items={items} onItemClick={this.handleItemClick} />;
  }

}

Header.propTypes = {
  navigate: PropTypes.func,
};

export default Header;
