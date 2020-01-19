import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../context/DataContext';
import Multiselect from 'react-widgets/lib/Multiselect';

function AddField({ type, column, headerValues }) {
    const { insertRow, handleInsertCellSelectChange, handleInsertCellTextChange } = useContext(DataContext);

    switch (type) {
        case 'multi-select':
            return <Multiselect
                data={headerValues}
                valueField='id'
                textField='name'
                onChange={e => handleInsertCellSelectChange(e, column)}
                value={insertRow[column]}
            />
        default:
            return <input
                type="text"
                name={column}
                onChange={e => handleInsertCellTextChange(e, column)}
                value={insertRow[column]}
            />
    };
};

AddField.propTypes = {
    type: PropTypes.string,
    column: PropTypes.string,
};

export default AddField;