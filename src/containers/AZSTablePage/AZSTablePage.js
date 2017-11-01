/* eslint-disable quote-props,max-len,react/jsx-no-undef,no-unused-vars */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { User, Repo, List } from 'components';
import { Grid } from 'semantic-ui-react';
import AZSTable from '../../components/AZSTable/AZSTable';

class TablePage extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <AZSTable
              items={this.props.items}
              style={{ minHeight: '100%', width: '100%' }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

TablePage.propTypes = {
  items: PropTypes.array,
};

function mapStateToProps(state) {
  const items = Object.values(state.itemsProducer.items);
  return {
    items
  };
}

function preload({ login }) {
  return [
  ];
}
TablePage.preload = preload;

export default connect(mapStateToProps, {
})(TablePage);
