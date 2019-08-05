export const subscribe = async (data = {}) => {
  const url = '/api/subscribe/';
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(res.statusText);
    }
  } catch(e) {
    console.error(e);
    throw e;
  }
}


export const fetchTeams = async () => {
  try {
    const res = await fetch('/api/teams');
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(res.statusText);
    }
  } catch(e) {
    console.error(e);
  }
}