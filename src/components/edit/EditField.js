import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../context/DataContext';
import Multiselect from 'react-widgets/lib/Multiselect';

function EditField({ type, column, value, headerValues }) {
    const { handleUpdateCellSelectChange, handleUpdateCellTextChange } = useContext(DataContext);

    switch (type) {
        case 'multi-select':
            return <Multiselect
                data={headerValues}
                valueField='id'
                textField='name'
                onChange={e => handleUpdateCellSelectChange(e, column)}
                defaultValue={value}
            />
        default:
            return <input
                type="text"
                name={column}
                onChange={e => handleUpdateCellTextChange(e, column)}
                defaultValue={value}
            />
    };
};

EditField.propTypes = {
    type: PropTypes.string,
    column: PropTypes.string,
    // value: PropTypes.arrayOf(Object),
};

export default EditField;