import { userService } from "../src/services/user.service";
import user from "../src/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../src/models/user", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
}));
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("create a new user", async () => {
    const mockUser = {
      id: 1,
      email: "test1@test.com",
      password: "hashed123",
      role: "customer",
    };
    (user.create as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed123");
    const result = await userService.createUser({
      email: "test1@test.com",
      password: "plain123",
    });
    expect(user.create).toHaveBeenCalledWith({
      email: "test1@test.com",
      password: "hashed123",
    });
    expect(result).toEqual(mockUser);
  });

  it("login and return token", async () => {
    const mockUser = {
      id: 1,
      email: "test1@test.com",
      role: "customer",
      password: "hashed123",
    };
    (user.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mocked_token");

    const token = await userService.login("test1@test.com", "plain123");

    expect(bcrypt.compare).toHaveBeenCalledWith("plain123", "hashed123");
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 1, role: "customer" },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    expect(token).toBe("mocked_token");
  });

  it("Error for invalid login", async () => {
    (user.findOne as jest.Mock).mockResolvedValue(null);

    await expect(userService.login("wrong@test.com", "123456")).rejects.toThrow(
      "Invalid email or password"
    );
  });
});
