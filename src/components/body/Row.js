import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EditRow from '../edit/EditRow';
import Cell from './Cell';
import { DataContext } from '../../context/DataContext';

function Row({ row }) {
    const { headers, editRow, allowEdit } = useContext(DataContext);

    return (
        editRow === row.id && allowEdit
            ?
            <EditRow
                row={row}
            />
            :
            <tr>
                {Object.keys(row).map(column => (
                    headers.map(header => (

                        header.id === column &&
                        <Cell
                            key={column}
                            rowId={row.id}
                            value={row[column]}
                            type={header.type}
                        />
                    ))
                ))}
            </tr>
    );
};

Row.propTypes = {
    headers: PropTypes.arrayOf(Object),
    editRow: PropTypes.object,
    allowEdit: PropTypes.bool,
};

export default Row;
