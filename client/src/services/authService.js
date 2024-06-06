let authenticated = false;

export const api_login = async (username, password) => {
	const url = `http://localhost:5050/auth/login`;

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		const data = await response.json();

		if (response.ok) {
			authenticated = true;
			return { success: true, data };
		} 
		else {
			alert(`Login failed: ${data.error}`);
			return { success: false, error: data.error };
		}
	}
	catch (error) {
		console.error("Error in login():", error);
		return { success: false, error: error };
	}
};

export const api_register = async (username, password) => {
	const url = `http://localhost:5050/auth/register`;

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		const data = await response.json();

		if (response.ok) {
			authenticated = true;
			return { success: true, data };
		}
		else {
			alert(`Registration failed: ${data.error}`);
			return { success: false, error: data.error };
		}
	}
	catch (error) {
		console.error("Error in register():", error);
		return { success: false, error: error };
	}
};

export const isAuthenticated = () => {
	return authenticated;
};