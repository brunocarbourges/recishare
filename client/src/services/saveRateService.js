export const saveRecipe = async (userID, recipeID) => {
    const url = `http://localhost:5050/recipe/save/${recipeID}`;
  
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
        console.log('Save successful:', data);
        return { success: true, data };
      } else {
        console.error('Failed to save Recipe:', data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error in savingRecipe:', error);
      return { success: false, error: error };
    }
  };

export const unsaveRecipe = async (userID, recipeID) => {
    const url = `http://localhost:5050/recipe/unsave/${recipeID}`;
  
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
        console.log('Unsave successful:', data);
        return { success: true, data };
      } else {
        console.error('Failed to unsave Recipe:', data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error in unsavingRecipe:', error);
      return { success: false, error: error };
    }
};

export const rateRecipe = async (userID, recipeID, rating) => {
    const url = `http://localhost:5050/recipe/rate/${recipeID}`;
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userID, rating })
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log('Rate successful:', data);
          return { success: true, data };
        } else {
          console.error('Failed to rate Recipe:', data.error);
          return { success: false, error: data.error };
        }
      } catch (error) {
        console.error('Error in ratingRecipe:', error);
        return { success: false, error: error };
      }
};