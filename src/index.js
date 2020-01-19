import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import '../src/styles/styles.scss';

const fetchUrl = "http://localhost:8080/books";
const createUrl = "http://localhost:8080/book";
const updateUrl = "http://localhost:8080/book";

const headers = [
    {
        id: 'id',
        header: 'Field id',
    },
    {
        id: 'name',
        header: 'Field name',
        allowEdit: false,
        allowCreate: false,
    },
    {
        id: 'title',
        header: 'Field title',
    },
    {
        id: 'description',
        header: 'Field description',
    },
    {
        id: 'colors',
        header: 'Field color',
        type: 'multi-select',
        fetchUrl: 'http://localhost:8080/colors',
    }
];

const data = [
    {
        title: 'Title 1',
        name: 'Pole 1',
        description: 'Description 1',
        id: 0,
    },
    {
        title: 'Title 2',
        id: 5,
        name: 'Pole 2',
        description: 'Description 2',
        colors: [
            { id: 0, name: 'orange' },
            { id: 3, name: 'blue' },
        ],
    },
];

ReactDOM.render(
    <Table
        fetchUrl={fetchUrl}
        createUrl={createUrl}
        updateUrl={updateUrl}
        // default Select / Multi-Select Data => moze link w headers
        headers={headers}
        data={data}
        allowCreate={true}
        allowEdit={true}
        sortBy="title"
    />,
    document.getElementById('root')
);
