// @flow
import R from 'ramda';
import React, {Component} from 'react';

import type { MatchComponentProps } from '../types'

import { List, ListItem, ListItemsWrapper } from '../List'
import { Filters, InputFilter } from '../List';
import Layout from '../Layout';

import './ListPage.css';

type Item = {
    _id: string,
    amount: number,
    nameOnCard: string
}

const items = [
    { _id: '57f2ae54842412e9daffc71f', amount: 10000, nameOnCard: 'Alberto Spinetta' },
    { _id: '57f2ae54842412e9daffc711', amount: 20000, nameOnCard: 'Charly Garcia' },
    { _id: '57f2ae54842412e9daffc712', amount: 1000000, nameOnCard: 'Maria de la Torre Albertico Saramugra El Santo Garota' },
    { _id: '57f2ae54842412e9daffc713', amount: 5000, nameOnCard: 'Alberto Spinetta' },
    { _id: '57f2ae54842412e9daffc714', amount: 10000, nameOnCard: 'Alberto Spinetta' },
]

class ListPage extends Component {
    props: MatchComponentProps;
    state: {
        loading: boolean
    }

    loadingTimeout: number | void

    constructor(props: MatchComponentProps) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.loadingTimeout = setTimeout(() => {
            this.setState({ loading: false });
        }, 2000);
    }

    componentWillUnmount() {
        if (!R.isNil(this.loadingTimeout)) {
            clearTimeout(this.loadingTimeout);
            this.loadingTimeout = undefined;
        }
    }

    render() {
        const {loading} = this.state;

        const actions = (
            <Filters>
                <InputFilter label='Business'/>
            </Filters>
        )

        return (
            <Layout title='Payments' padded={false} actions={actions} >
                <List>
                    <ListItemsWrapper
                        emptyIcon='credit-card'
                        emptyMessage={`You don't have any payments right now. As soon as you receive the first one it will be shown here`}
                        itemsCount={2}
                        loading={loading}
                        times={10} >
                        {items.map((item: Item) =>
                            <ListItem key={item._id} className='ListPageItem'>
                                <div>
                                    <span className='ListPageItem-amount'>{item.amount / 100}</span>
                                    {" - "}
                                    <span className='ListPageItem-amount'>{item._id}</span>
                                </div>
                                <div>
                                    <span className='ListPageItem-nameOnCard'>{item.nameOnCard}</span>
                                </div>
                            </ListItem>
                        ) }
                    </ListItemsWrapper>
                </List>
            </Layout >
        )
    }
}

export default ListPage