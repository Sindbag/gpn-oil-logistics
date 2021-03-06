/* eslint-disable quote-props,max-len,react/jsx-no-undef,no-unused-vars */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { User, Repo, List } from 'components';
import AZSMap from '../../components/AZSMap/AZSMap';
import { Grid } from 'semantic-ui-react';
import { navigate } from '../../actions/index';

class UserPage extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column style={{ minHeight: '80vh' }}>
            <AZSMap
              items={this.props.items} center={[this.props.items[0].y, this.props.items[0].x]}
              navigate={this.props.navigate}
              style={{ minHeight: '100%', width: '100%' }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

UserPage.propTypes = {
  items: PropTypes.array,
  navigate: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    items: Object.values(state.itemsProducer.items),
  };
}

function preload({ login }) {
  return [
  ];
}
UserPage.preload = preload;

export default connect(mapStateToProps, { navigate })(UserPage);
