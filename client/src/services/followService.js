export const followUser = async (user, userID) => {
  const url = `http://localhost:5050/user/follow/${user}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userID })
    });

    const data = await response.json();
  
    if (response.ok) {
      console.log('Follow successful:', data);
      return { success: true, data };
    } 
    else {
      console.error('Failed to follow this user:', data.error);
      return { success: false, error: data.error };
    }
  } 
  catch (error) {
    console.error('Error in following user:', error);
    return { success: false, error: error };
  }
};

export const unfollowUser = async (user, userID) => {
  const url = `http://localhost:5050/user/unfollow/${user}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userID })
    });

    const data = await response.json();
  
    if (response.ok) {
      console.log('Unfollow successful:', data);
      return { success: true, data };
    } 
    else {
      console.error('Failed to unfollow this user:', data.error);
      return { success: false, error: data.error };
    }
  } 
  catch (error) {
    console.error('Error in unfollowing user:', error);
    return { success: false, error: error };
  }
};