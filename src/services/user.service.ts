import user from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  createUser = async (data: any) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await user.create({ ...data, password: hashedPassword });
    return newUser;
  };

  login = async (email: string, password: string) => {
    const userAvailable = await user.findOne({ where: { email } });

    if (!userAvailable) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(
      password,
      userAvailable.password || "" // avoid undefined
    );

    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { userId: userAvailable.id, role: userAvailable.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    return token;
  };

  getUser = async (id: number) => {
    try {
      const userData = await user.findOne({
        where: {
          id,
        },
      });
      return userData;
    } catch (error: any) {
      console.error("Error Fetching user:", error.message);
      throw new Error("Failed to fetch user");
    }
  };

  getAllUsers = async () => {
    try {
      const users = await user.findAll();
      return users;
    } catch (error: any) {
      console.error("Error fetching all users:", error.message);
      throw new Error("Failed to fetch users");
    }
  };
}

export const userService = new UserService();
