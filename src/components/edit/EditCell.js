import React from 'react';
import PropTypes from 'prop-types';
import EditField from './EditField';

function EditCell({ rowId, column, value, type, headerValues }) {
    return (
        <td>
            <EditField
                rowId={rowId}
                column={column}
                value={value}
                type={type}
                headerValues={headerValues}
            />
        </td>
    );
};

EditCell.propTypes = {
    rowId: PropTypes.number,
    column: PropTypes.string,
    // value:
    type: PropTypes.string,
};

export default EditCell;