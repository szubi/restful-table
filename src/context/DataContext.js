import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeHeaders, getNextId, makeInsertRow, adjustDataToTable, allowForAction, rowEmpty, clearInsertRow, validURL, setSortBy, sortBy } from '../utils/Utils';

export const DataContext = React.createContext();

function DataProvider({ propsFetchUrl, propsCreateUrl, propsUpdateUrl, propsData, propsHeaders, propsAllowCreate, propsAllowEdit, propsSortBy, children }) {
    const headers = makeHeaders(propsHeaders);
    const [data, setData] = useState(adjustDataToTable(propsData, headers));

    const [editRow, setEditRow] = useState(null);
    const [updateRow, setUpdateRow] = useState(null);
    const [insertRow, setInsertRow] = useState(makeInsertRow(headers));

    const allowCreate = allowForAction(propsAllowCreate);
    const allowEdit = allowForAction(propsAllowEdit);

    const createUrl = validURL(propsCreateUrl);
    const updateUrl = validURL(propsUpdateUrl);

    const sortByElement = setSortBy(propsSortBy);

    useEffect(function () {
        headers.map(header => {
            if (header.fetchUrl && header.type === 'multi-select') {
                axios.get(header.fetchUrl)
                    .then(function(response) {
                        if (response && response.status === 200) {
                            if (response.data.length > 0) {
                                header.values = response.data;
                            }
                        }
                    });
            }
        })

        const fetchUrl = validURL(propsFetchUrl);

        if (fetchUrl) {
            axios.get(fetchUrl)
                .then(function(response) {
                    if (response && response.status === 200) {
                        if (response.data.length > 0) {
                            setData(sortBy(sortByElement, headers, adjustDataToTable(response.data, headers)));
                        }
                    }
                });
        }
    }, []);

    function sendInsertRowToApi(iRow) {
        const d = [...data];
        const id = { 'id': getNextId(d) };

        if (createUrl) {
            axios({
                method: 'post',
                url: createUrl,
                data: Object.assign({}, id, iRow)
            })
                .then(function (response) {
                    if (response.status === 200) {
                        d.push(response.data);
                        setData(sortBy(sortByElement, headers, d));
                    }
                });
        } else {
            d.push(Object.assign({}, id, iRow));
            setData(sortBy(sortByElement, headers, d));
        }
    }

    function sendUpdateRowToApi(uRow) {
        const d = [...data];
        const id = d.findIndex(row => row.id === uRow.id);

        if (updateUrl) {
            axios({
                method: 'put',
                url: updateUrl,
                data: uRow
            })
                .then(response => {
                    if (response.status === 200) {
                        d[id] = response.data;
                        setData(sortBy(sortByElement, headers, d));
                    }
                });
        } else {
            d[id] = uRow;
            setData(sortBy(sortByElement, headers, d));
        }
    }

    function handleInsertRowSubmit() {
        const iRow = { ...insertRow };

        if (!allowCreate || rowEmpty(iRow)) {
            return;
        }

        Object.keys(iRow).map(column => iRow[column] instanceof String && (iRow[column] = iRow[column].trim()));

        sendInsertRowToApi(iRow);
        setInsertRow(clearInsertRow(iRow));
    }

    function handleInsertCellTextChange(e, column) {
        const iRow = { ...insertRow };
        iRow[column] = e.target.value;

        setInsertRow(iRow);
    }

    function handleInsertCellSelectChange(e, column) {
        const iRow = { ...insertRow };
        iRow[column] = e;

        setInsertRow(iRow);
    }

    function handleUpdateRowSubmit() {
        const uRow = { ...updateRow };

        Object.keys(uRow)
            .filter(column => column !== 'id')
            .map(column => uRow[column] instanceof String && (uRow[column] = uRow[column].trim()));


        sendUpdateRowToApi(uRow);
        setUpdateRow(null);
        setEditRow(null);
    }

    function handleEditRow(e) {
        setUpdateRow(null);
        setEditRow(parseInt(e.target.dataset.row, 10));
    }

    function getRowCopyForChange() {
        return updateRow
            ? { ...updateRow }
            : { ...data.find(updateRow => updateRow.id === editRow) };
    }

    function handleUpdateCellTextChange(e, column) {
        const row = getRowCopyForChange();
        row[column] = e.target.value;

        setUpdateRow(row);
    }

    function handleUpdateCellSelectChange(e, column) {
        const row = getRowCopyForChange();
        row[column] = e;

        setUpdateRow(row);
    }

    function handleUpdateCancel() {
        setUpdateRow(null);
        setEditRow(null);
    }

    const value = {
        data,
        editRow,
        updateRow,
        handleEditRow,
        handleUpdateCancel,
        handleUpdateCellTextChange,
        handleUpdateRowSubmit,

        insertRow,
        handleInsertCellTextChange,
        handleInsertCellSelectChange,
        handleInsertRowSubmit,

        headers,
        allowCreate,
        allowEdit,

        handleUpdateCellSelectChange,
    }

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
}

DataContext.propTypes = {
    propsHeaders: PropTypes.arrayOf(Object),
    propsData: PropTypes.arrayOf(Object),
    propsAllowCreate: PropTypes.bool,
    propsAllowEdit: PropTypes.bool
};

export default DataProvider;
