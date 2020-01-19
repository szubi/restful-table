import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../context/DataContext';
import AddCell from './AddCell';

function AddRow() {
    const { headers, allowCreate, handleInsertRowSubmit } = useContext(DataContext);

    return (
        allowCreate &&
        <tbody>
            <tr>
                {headers &&
                    headers.map((header, i) => (
                        <React.Fragment key={i}>
                            {header.allowCreate
                                ?
                                <AddCell
                                    column={header.id}
                                    type={header.type}
                                    headerValues={header.values}
                                />
                                :
                                <td></td>
                            }

                            {(i + 1) === headers.length &&
                                <td>
                                    <button onClick={handleInsertRowSubmit} type="submit">Add</button>
                                </td>
                            }
                        </React.Fragment>
                    ))
                }
            </tr>
        </tbody>
    );
};

AddRow.propTypes = {
    headers: PropTypes.arrayOf(Object),
    allowCreate: PropTypes.bool,
};

export default AddRow;