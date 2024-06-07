export const postRecipe = async (userID, image, title, description, ingredients) => {
	const url = "http://localhost:5050/recipe/post";

  // Create a FormData instance
  const formData = new FormData();
  formData.append('userID', userID);
  formData.append('image', image);
  formData.append('title', title);
  formData.append('description', description);

  for (let i = 0; i < ingredients.length; i++) {
    formData.append('ingredients', ingredients[i]);
  }
  
	try {
		const response = await fetch(url, {
			method: "POST",
			body: formData, // Use FormData instance
		});
		const data = await response.json();

		if (response.ok) {
			return { success: true, data };
		} else {
			alert(`Failed to post recipe: ${data.error}`);
			return { success: false, error: data.error };
		}
	} catch (error) {
		console.error("Error in postRecipe():", error);
		return { success: false, error: error };
	}
};