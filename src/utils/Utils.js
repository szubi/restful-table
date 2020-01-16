export function makeHeaders(headers) {
    if (headers) {

        for (const header in headers) {
            if (!headers[header].hasOwnProperty('allowEdit')) {
                headers[header]['allowEdit'] = true;
            }

            if (!headers[header].hasOwnProperty('allowCreate')) {
                headers[header]['allowCreate'] = true;
            }
        }
        return headers;
    }

    return []
}

export function getNextId(data) {
    if (data.length > 0) {
        return Math.max.apply(Math, data.map(row => { return row.id; })) + 1
    }

    return 1;
}

export function makeInsertRow(headers) {
    if (!headers) {
        return {};
    }

    const insertRow = {}
    headers.filter(header => header.id !== 'id')
        .map(header => {
            if (header.type && header.type === "multi-select") {
                insertRow[header.id] = [];
            } else {
                insertRow[header.id] = '';
            }
            return insertRow;
        });

    return insertRow;
}

export function clearInsertRow(iRow) {
    Object.keys(iRow).map(column => {
        if (iRow[column] instanceof Array) {
            iRow[column] = [];
        } else {
            iRow[column] = '';
        }
        return iRow;
    });

    return iRow;
}

export function adjustDataToTable(data, headers) {
    if (!data) {
        return [];
    }

    const finalData = [];
    for (const row in data) {

        const dataRow = {};
        for (const i in headers) {
            const id = headers[i].id

            if (Object.keys(data[row]).includes(id)) {
                dataRow[id] = data[row][id]
            } else {
                dataRow[id] = null
            }
        }

        if (data[row]['id'] > -1) {
            if (!dataRow.id) {
                finalData.push(Object.assign({}, { id: data[row]['id'] }, dataRow))
            } else {
                finalData.push(dataRow);
            }
        }
    }

    return finalData
}

export function allowForAction(action) {
    if (typeof action === 'boolean') {
        return action
    }

    return true;
}

export function rowEmpty(row) {
    for (const key in row) {
        if (row[key] !== '' && key !== 'id') {
            return false;
        }
    }

    return true;
}

// export function validURL(string) {
//     const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
//     return (res !== null);
// };

export function validURL(string) {
    if (typeof string === 'string') {
        return string;
    }

    return null;
};

export function from(value, type) {
    let values = "";
    if (type === 'multi-select') {
        if (Array.isArray(value)) {

            // sprawdzić czy value zawiera się w liście obiektów z select
            values = value.map(function(v) {
                return v.name;
            }).join(", ");
        } else {
            values = "";
        }
    } else {
        values = value;
    }

    return values;
}
