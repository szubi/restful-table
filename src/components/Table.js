import React from 'react';
import PropTypes from 'prop-types';
import Header from './header/Header';
import DataProvider from '../context/DataContext';
import Body from './body/Body';
import AddRow from './add/AddRow';

function Table(props) {

    return (
        <table>
            <DataProvider
                propsFetchUrl={props.fetchUrl}
                propsCreateUrl={props.createUrl}
                propsUpdateUrl={props.updateUrl}
                propsData={props.data}
                propsHeaders={props.headers}
                propsAllowCreate={props.allowCreate}
                propsAllowEdit={props.allowEdit}
            >

                <Header />
                <AddRow />
                <Body />

            </DataProvider>
        </table>
    );
}

Table.propTypes = {
    headers: PropTypes.arrayOf(Object),
    data: PropTypes.arrayOf(Object),
    allowCreate: PropTypes.bool,
    allowEdit: PropTypes.bool,
};

export default Table;