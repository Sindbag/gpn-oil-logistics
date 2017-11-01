/* eslint-disable quote-props,max-len */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {
  navigate,
  updateRouterState,
  resetErrorMessage
} from '../../actions';
import styles from './App.scss';// eslint-disable-line
import MenuHeader from '../MenuHeader/MenuHeader';
import { Grid } from 'semantic-ui-react';
import AZSMap from '../../components/AZSMap/AZSMap';
import AZSCurrTable from '../AZSTablePage/AZSCurrTable';

const localStorage = require('web-storage')().localStorage;

class App extends Component {
  constructor(props) {
    super(props);
    if (!localStorage.get('username')) this.props.navigate('/auth');
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.updateRouterState({
      pathname: this.props.location.pathname,
      params: this.props.params
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage) {
      // handle error here
    }
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.updateRouterState({
        pathname: nextProps.location.pathname,
        params: nextProps.params
      });
    }
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange(nextValue) {
    this.props.navigate(`/${nextValue}`);
  }

  render() {
    const { children, items, navigate: nav } = this.props;
    items.sort((a, b) => a.state - b.state < 0);
    return (
      <div className={styles.app}>
        <Helmet
          title="Логистика топлива - ГазПромНефть"
          meta={[{ property: 'og:site_name', content: 'Логистика топлива, г. Новосибирск' }]}
        />
        {localStorage.get('username') &&
          <MenuHeader />
        }
        <div>
          {children ||
            <Grid>
              <Grid.Column style={{ minHeight: '60vh', maxHeight: '80vh' }} mobile={16} tablet={8} computer={8}>
                <AZSMap
                  items={items} center={[items[0].y, items[0].x]} navigate={nav}
                  style={{ minHeight: '100%', width: '100%' }}
                />
              </Grid.Column>
              <Grid.Column style={{ minHeight: '33%' }} mobile={16} tablet={8} computer={8}>
                <AZSCurrTable items={this.props.items} navigate={nav} />
              </Grid.Column>
            </Grid>
          }
        </div>
      </div>
      );
  }
}

App.propTypes = {
  errorMessage: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  updateRouterState: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  params: PropTypes.object,
  username: PropTypes.string,
  items: PropTypes.array,
};

function mapStateToProps(state) {
  const items = Object.values(state.itemsProducer.items);
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.pathname.substring(1),
    username: state.authUser.username,
    items
  };
}

export default connect(mapStateToProps, {
  navigate,
  updateRouterState,
  resetErrorMessage
})(App);
