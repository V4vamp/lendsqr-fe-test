import {
  saveUser,
  getStoredUser,
  saveSession,
  getSession,
  clearSession,
} from "@/utils/auth";

describe("Auth utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores and retrieves user", () => {
    const user = {
      email: "test@mail.com",
      firstName: "Test",
      lastName: "User",
      password: "123456",
    };

    saveUser(user);
    const stored = getStoredUser();

    expect(stored?.email).toBe(user.email);
  });

  it("stores session token", () => {
    const session = {
      user: {
        email: "test@mail.com",
        firstName: "Test",
        lastName: "User",
      },
      token: {
        access_token: "abc123",
        token_type: "Bearer",
      },
    };

    saveSession(session);
    expect(getSession()?.token.access_token).toBe("abc123");
  });

  it("clears session", () => {
    saveSession({} as any);
    clearSession();
    expect(getSession()).toBeNull();
  });
});
