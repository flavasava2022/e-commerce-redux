import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post(process.env.REACT_APP_BASE_URL + "/auth/local", {
      identifier: email,
      password: password,
    });
    // Handle success.
    const { jwt, user } = response.data;
    localStorage.setItem("jwt", jwt);
    return user;
  } catch (error) {
    // Handle error.
    throw error;
  }
};
export const signUp = async (email,password,displayName)=>{
     try {
const response = await axios.post(process.env.REACT_APP_BASE_URL + "/auth/local/register", {
            username: displayName,
            email: email,
            password: password,
          })

            const { jwt, user } = response.data;
            localStorage.setItem("jwt", jwt);
            return user
} catch (error) {
    // Handle error.
    throw error;
  }
}
