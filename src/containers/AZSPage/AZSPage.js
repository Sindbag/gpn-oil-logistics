/* eslint-disable max-len,react/prop-types,quote-props,no-unused-vars,no-nested-ternary,no-confusing-arrow,arrow-body-style */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Repo, User, List } from 'components';
import {Button, Divider, Grid, Header, Modal, Segment, Table, Select, Input} from "semantic-ui-react"; // eslint-disable-line
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';

const ModalModalExample = ({ azs, product }) => (
  <Modal trigger={<Button primary style={{ float: 'right' }}>Заказать</Button>}>
    <Modal.Header>{`Заказать доставку топлива (${product}) на АЗС ${azs}`}</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>{`Заканчивается ${product}`}</Header>
        <p>На этой станции заканчивается топливо,
          закажите доставку для пополнения запасов, чтобы избежать простоя АЗС.
        </p>
        <Select
          placeholder="Объём"
          options={
            ['20 (р 123 тк 234)',
              '25 (п 123 ри 77)',
              '30 (ве 2930 11)',
              '40 (т 111 оо 777)',
              '50 (т 777 тт 777)'].map(v => ({ 'text': v, 'value': v }))}
        />
        <Select
          placeholder="АЗС"
          options={[{ 'value': azs, 'text': azs }]}
        />
        <Input type="datetime" placeholder="Время" />
        <Button floated="right" positive>{'Заказать'}</Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

const ddelta = -13 + 31 * 10;
const getDate = x => {
  const tmp = ddelta + x;
  return `${tmp % 31}.${Math.ceil(tmp / 31)}`;
  // return x;
};

const SimpleAreaChart = ({ data, label, status }) => (
  <AreaChart
    width={640}
    height={400}
    data={data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
  >
    <defs>
      <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#f43333" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#f43333" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#f4e861" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#f4e861" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorEnd" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#333" stopOpacity={0} />
        <stop offset="95%" stopColor="#333" stopOpacity={0.8} />
      </linearGradient>
    </defs>
    <XAxis dataKey="x" tickFormatter={tx => getDate(tx - data[0].x)} />
    <YAxis />
    <CartesianGrid />
    <Tooltip />
    <Label value={label} />
    <Area type="linear" dataKey="minlevel" stackId={3} stroke="#8884d8" fillOpacity={0.2} fill="#333" />
    <Area type="linear" dataKey="pred_y" stackId={1} stroke="#8884d8" fillOpacity={1} fill={`url(#color${status})`} />
    <Area type="linear" dataKey="hist_y" stackId={2} stroke="#82ca9d" fillOpacity={1} fill="url(#colorHist)" />
  </AreaChart>
);


class AZSPage extends Component {
  render() {
    const { item } = this.props;
    let data = {};

    if (!(item && item.products)) {
      return <Segment><h1>Error! Not found?</h1></Segment>;
    }

    Object.entries(item.products).forEach(([p, d]) => {
      const { hist_x, hist_y, pred_x, pred_y, status, curr, minlevel } = d;
      data[p] = { status, curr };
      data[p].data = hist_x.map((ix, i) => ({ minlevel, x: ix, hist_y: hist_y[i] }))
        .concat(pred_x.map((ix, i) => ({ minlevel, x: ix, pred_y: pred_y[i] })));

      data[p].data.splice(data[p].data.length - 5, 1);
      data[p].data[data[p].data.length - 5].pred_y = pred_y[0];
    });

    data = Array.from(Object.entries(data));
    data = data.sort((a, b) => {
      const s1 = a[1].status;
      const s2 = b[1].status;
      return s2 - s1;
    });
    const rrange = [1, 2, 3, 4, 5];
    const delta = -2 + 31 * 10;

    const getValue = (d, i, s) => s < 3 ? ((d[i] && (d[i].hist_y || d[i].pred_y)) ||
        ((getValue(d, i - 1, s + 1) + getValue(d, i + 1, s + 1)) / 2))
        : 0;

    return (
      <Segment>
        <Header as="h2" content={`${item.name}`} subheader={`${item.city}, ${item.street}`} />
        <Grid>
          <Grid.Row columns={2}>
            {data.map(([p, d]) =>
              <Grid.Column key={p}>
                <Header as="h2" content={`Продукт: ${p}`} subheader={`Текущий остаток: ${d.curr.toFixed(2)}, т`} />
                <Table>
                  <Table.Header>
                    <Table.Row>
                      {rrange.map(i => <Table.HeaderCell key={i}>{(i + delta) % 31 || 31}</Table.HeaderCell>)}
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      {rrange.map(i =>
                        <Table.Cell
                          negative={(d.data[d.data.length - 9 + i] && d.data[d.data.length - 9 + i].pred_y) && (d.status === 3)}
                          warning={(d.data[d.data.length - 9 + i] && d.data[d.data.length - 9 + i].pred_y) && (d.status === 2)}
                          key={i}
                        >{getValue(d.data, d.data.length - 9 + i, 0).toFixed(2)}</Table.Cell>
                      )}
                    </Table.Row>
                  </Table.Body>
                </Table>
                <br />
              </Grid.Column>)}
          </Grid.Row>
          <Divider horizontal>Графики</Divider>
          <Grid.Row columns={2}>
            {data.map(([p, d]) =>
              <Grid.Column key={p}>
                <Segment style={{ marginTop: '2em' }}>
                  <ModalModalExample azs={item.idx} product={p} />
                  <Header as="h2" content={`Продукт: ${p}`} subheader={`Текущий остаток: ${d.curr.toFixed(2)}`} />
                  <center><SimpleAreaChart data={d.data} label={p} status={d.status} /></center>
                </Segment>
              </Grid.Column>)}
          </Grid.Row>
        </Grid>
      </Segment>);
  }
}

AZSPage.propTypes = {
  item: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { idx } = state.router.params;
  const item = state.itemsProducer.items[idx];
  return {
    item
  };
}

export default connect(mapStateToProps, {
})(AZSPage);
