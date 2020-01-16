import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../context/DataContext';
import { from } from '../../utils/Utils';

const Cell = ({ rowId, value, type }) => {
    const { handleEditRow } = useContext(DataContext);

    const values = from(value, type);

    return (
        <td>
            <span data-row={rowId} onClick={handleEditRow}>{values}</span>
        </td>
    );
};

Cell.propTypes = {
    rowId: PropTypes.number,
    // value: 
    type: PropTypes.string,
};

export default Cell;