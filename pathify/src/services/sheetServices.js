const getSheet = async() => {
  try {
    const response = await fetch('http://localhost:8080/sheets/getRows', { credentials: 'include' });

    if (!response.ok) { throw new Error('Failed to get rows'); }
    return response.json();
  } catch (err) { console.log(err); }
};

const addRow = async(company, position, deadline) => {
  try {
    const response = await fetch('http://localhost:8080/sheets/addRow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({company, position, deadline}),
    });

    if (!response.ok) { throw new Error('Failed to add new row'); }
    return response.json();
  } catch (err) { console.log(err); }
}

const updateSheet = async(column, update, id) => {
  try {
    const response = await fetch('http://localhost:8080/sheets/updateItem', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ column, update, id }),
    });
    
    if (!response.ok) { throw new Error('Failed to update row'); }
    return response.json();
  } catch (err) { console.log(err); }
}

export { getSheet, addRow, updateSheet };