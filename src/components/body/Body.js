import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import Row from './Row';

function Body() {
    const { data } = useContext(DataContext);

    return (
        <tbody>
            {data &&
                data.map(row => (
                    <Row
                        key={row.id}
                        row={row}
                    />
                ))
            }
        </tbody>
    )
}

export default Body;