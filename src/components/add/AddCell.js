import React from 'react';
import PropTypes from 'prop-types';
import AddField from './AddField';

function AddCell({ column, type, headerValues }) {

    return (
        <td>
            {column !== 'id' &&
                <AddField
                    column={column}
                    type={type}
                    headerValues={headerValues}
                />
            }
        </td>
    );
};

AddCell.propTypes = {
    header: PropTypes.object,
};

export default AddCell;