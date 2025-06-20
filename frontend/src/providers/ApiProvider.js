class ApiProvider {
  constructor({ accessToken }) {
    this.accessToken = accessToken;
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

  async getUsers() {

    const response = await fetch(`${this.baseUrl}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.accessToken}`, // ✅ Send token in headers
      },
    });
    if (!response.ok) throw new Error("Failed to fetch shops");
    const data = await response.json();

    return data.users || []; // Ensure we return an array
  }

  async increaseUserCounter(user) {
    const response = await fetch(`${this.baseUrl}/users/${user.id}/increase-counter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.accessToken}`, // ✅ Send token in headers
      },
    });
    if (!response.ok) throw new Error("Failed to increase user counter");

    const data = await response.json();
    return data; // Return the updated user data or any relevant response
  }

}



export default ApiProvider;
