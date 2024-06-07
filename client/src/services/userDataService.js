export const getUserData = async (userID) => {
	try {
		const response = await fetch(`http://localhost:5050/user/${userID}`);
		const data = await response.json();
	  
		if (response.ok) {
			return ({success: true, data});
		} 
		else {
			console.error(`Failed to get user data: ${data.error}`);
			return ({success: false, error: data.error});
		}
	} 
	catch (error) {
		console.error("Error in getUserData():", error);
		return ({success: false, error: error});
	}
};