// import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../actions';
import Header from '../../components/Header/Header';

export default connect(null, {
  navigate
})(Header);
