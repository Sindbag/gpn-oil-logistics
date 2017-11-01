/* eslint-disable max-len */
import React, { PropTypes, Component } from 'react';
import { Table } from 'semantic-ui-react';

class AZSTable extends Component {

  render() {
    const data = this.props.items;
    const { navigate } = this.props;

    return (
      <Table celled sortable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Номер</Table.HeaderCell>
            <Table.HeaderCell>Наименование</Table.HeaderCell>
            <Table.HeaderCell>Адрес</Table.HeaderCell>
            <Table.HeaderCell>Состояние</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(item =>
            <Table.Row
              key={item.idx}
              negative={Math.max(...Object.values(item.products).map(p => p.status)) === 3}
              warning={Math.max(...Object.values(item.products).map(p => p.status)) === 2}
            >
              <a onClick={() => navigate(`/azs/${item.idx}`)}>
                <Table.Cell onClick={() => navigate(`/azs/${item.idx}`)}>{item.idx}</Table.Cell>
                <Table.Cell onClick={() => navigate(`/azs/${item.idx}`)}>{item.name}</Table.Cell>
                <Table.Cell onClick={() => navigate(`/azs/${item.idx}`)}>{`${item.city}, ${item.street}`}</Table.Cell>
                <Table.Cell onClick={() => navigate(`/azs/${item.idx}`)}>{Math.max(...Object.values(item.products).map(p => p.status))}</Table.Cell>
              </a>
            </Table.Row>
          )}
        </Table.Body>
      </Table>);
  }
}

AZSTable.propTypes = {
  items: PropTypes.array,
  navigate: PropTypes.func,
};

export default AZSTable;
