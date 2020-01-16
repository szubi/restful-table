import React from 'react';
import PropTypes from 'prop-types';
import AddField from './AddField';

function AddCell({ column, type }) {

    return (
        <td>
            {column !== 'id' &&
                <AddField
                    column={column}
                    type={type}
                />
            }
        </td>
    );
};

AddCell.propTypes = {
    header: PropTypes.object,
};

export default AddCell;