import { IUser } from "./../models/IUser";
import axios, { AxiosResponse } from "axios";

export default class UserService {
  // функция статичная, можем вызывать её без создания экземпляра class
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return axios.get<IUser[]>("./users.json");
  }
}
