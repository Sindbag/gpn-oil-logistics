/* eslint-disable max-len */
import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import { Table } from 'semantic-ui-react';
import { getTime } from '../../components/AZSTable/AZSTable';

class AZSCurrTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: 'state',
      direction: 'descending',
      data: _.sortBy(this.props.items, ['products']) || [],
    };
  }

  render() {
    const { data } = this.state;
    const { navigate } = this.props;
    const products = ['92', '95', '98', 'G95', 'G98', 'ДТ'];
    return (
      <Table celled sortable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Наименование</Table.HeaderCell>
            {products.map(p => <Table.HeaderCell key={p}>{p}</Table.HeaderCell>)}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(item =>
            <Table.Row key={item.idx} onClick={() => this.props.navigate(`/azs/${item.idx}`)}>
              <Table.Cell onClick={() => this.props.navigate(`/azs/${item.idx}`)}>{item.name}</Table.Cell>
            {products.map(p =>
              <Table.Cell
                key={p}
                onClick={() => navigate(`/azs/${item.idx}`)}
                negative={item.products[p].status === 3}
                warning={item.products[p].status === 2}
              >
                {getTime(item.products[p].curr_d.toFixed(2)).format('DD.MM HH:mm')}
              </Table.Cell>)
            }
            </Table.Row>
          )}
        </Table.Body>
      </Table>);
  }
}

AZSCurrTable.propTypes = {
  navigate: PropTypes.func,
  items: PropTypes.array,
};

export default AZSCurrTable;
