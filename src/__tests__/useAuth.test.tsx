import { renderHook } from "@testing-library/react";
import { useAuth } from "@/hooks/useAuth";
import * as auth from "@/utils/auth";

jest.mock("@/utils/auth", () => ({
  __esModule: true,
  ...jest.requireActual("@/utils/auth"),
  getSession: jest.fn(),  
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

describe("useAuth hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sets authenticated when session exists (positive)", () => {

    (auth.getSession as jest.Mock).mockReturnValue({
      user: {
        email: "test@example.com",
        firstName: "Muhammad",
        lastName: "Mukhtar",
      },
      token: {
        access_token: "test-token",
        token_type: "Bearer",
      },
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it("redirects when session does not exist (negative)", () => {

    (auth.getSession as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.loading).toBe(false);
  });
});