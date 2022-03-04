import axios from "axios";

class Api {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      withCredentials: true,
    });
  }

  async isUserLoggedIn() {
    try {
      const res = await this.instance.get("/authentication");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new Api();
