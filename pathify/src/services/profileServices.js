const querySearch = async(column, search) => {  
  const encodedColumn = encodeURIComponent(column);
  const encodedSearch = encodeURIComponent(search);

  try {
    const response = await fetch(`http://localhost:8080/search/query?column=${encodedColumn}&search=${encodedSearch}`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include' 
    });

    if (!response.ok) { throw new Error('Failed to search profiles'); }
    return response.json();
  } catch (err) { console.log(err); }
}

export { querySearch };