import axios from "axios";

export async function axiosPostMessage(body) {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, body);
    console.log("post-message:", data);
  } catch (error) {
    console.log("Error en axiosPostMessage por:", error);
  }
}

export async function axiosGetAllMessages(setAllMessages) {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`);
    // console.log("get-message:", data);
    setAllMessages(data)
  } catch (error) {
    console.log("Error en axiosGetAllMessages por:", error);
  }
}

export async function axiosGetAllUsers(setAllUsers) {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`);
    // console.log("get-users:", data);
    setAllUsers(data)
  } catch (error) {
    console.log("Error en axiosGetAllUsers por:", error);
  }
}
export async function axiosGetDetailCompany(id, setCompany) {
  try {
    if (id) {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/companies/${id}`);
      // console.log("get-companies-id:", data);
      setCompany(data)
    }
  } catch (error) {
    console.log("Error en axiosGetDetailCompany por:", error);
  }
}