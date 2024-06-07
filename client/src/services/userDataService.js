export const getUserData = async (id) => {
	try {
		const response = await fetch(`http://localhost:5050/user/id/${id}`);
		const data = await response.json();
	  
		if (response.ok) {
			return data;
		} 
		else {
			console.error(`Failed to get user data: ${data.error}`);
			return null;
		}
	} 
	catch (error) {
		console.error("Error in getUserData():", error);
		return null;
	}
};