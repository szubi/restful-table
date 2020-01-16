import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../context/DataContext';

function Header() {
    const { headers } = useContext(DataContext);

    return (
        <thead>
            <tr>
                {headers &&
                    headers.map(column => (
                        column.id && column.header &&
                        <th key={column.id}>{column.header}</th>
                    ))
                }
            </tr>
        </thead>
    );
}

Header.propTypes = {
    headers: PropTypes.arrayOf(Object),
};

export default Header;