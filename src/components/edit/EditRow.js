import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EditCell from './EditCell';
import { DataContext } from '../../context/DataContext';

function EditRow({ row }) {
    const { headers, handleUpdateRowSubmit, handleUpdateCancel } = useContext(DataContext);

    return (
        <tr>
            {Object.keys(row).map((column, i) => (
                headers.map(header => (

                    header.id === column &&
                    <React.Fragment key={column}>
                        {column !== 'id' && header.allowEdit ?
                            <EditCell
                                rowId={row.id}
                                column={column}
                                value={row[column]}
                                type={header.type}
                            />
                            :
                            <td>{row[column]}</td>
                        }

                        {(i + 1) === Object.keys(row).length &&
                            <td>
                                <button onClick={handleUpdateRowSubmit} type="submit">Update</button>
                                <button onClick={handleUpdateCancel}>Cancel</button>
                            </td>
                        }
                    </React.Fragment>
                ))
            ))
            }
        </tr>
    );
};

EditRow.propTypes = {
    row: PropTypes.object,
};

export default EditRow;
