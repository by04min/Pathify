const getProfile = async() => {  
  try {
    const response = await fetch(`http://localhost:8080/profile/getProfile`, { 
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include' 
    });
    if (!response.ok) { throw new Error('Failed to get profile'); }
    return response.json();
  } catch (err) { console.log(err); }
}

const editProfile = async(username, major, industry, experiences, privacy) => { 
  try {
    const response = await fetch(`http://localhost:8080/profile/editProfile`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, major, industry, experiences, privacy })
    });
    if (!response.ok) { throw new Error('Failed to edit profile'); }
    return response.json();
  } catch (err) { console.log(err); }
}

const addNewExp = async(expObj) => { 
  try {
    const response = await fetch(`http://localhost:8080/profile/addExperience`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({expObj})
    });
    if (!response.ok) { throw new Error('Failed to edit profile'); }
    return response.json();
  } catch (err) { console.log(err); }
}

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

const searchOther = async(username) => {  
  const encodedUsername= encodeURIComponent(username);
  try {
    const response = await fetch(`http://localhost:8080/profile/searchProfile?username=${encodedUsername}`, { 
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include' 
    });

    if (!response.ok) { throw new Error('Failed to search other profiles'); }
    return response.json();
  } catch (err) { console.log(err); }
}

export { getProfile, editProfile, addNewExp, querySearch, searchOther };