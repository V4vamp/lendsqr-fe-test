import { filterUsers } from "@/utils/filterUsers";
import { User } from "@/types/types";

const mockUsers = [
  {
    id: 1,
    organization: "Lendsqr",
    email: "test@lendsqr.com",
    status: "Active",
  },
  {
    id: 2,
    organization: "Irorun",
    email: "test@irorun.com",
    status: "Inactive",
  },
] as User[];

describe("filterUsers utility", () => {
  it("filters by organization (positive)", () => {
    const result = filterUsers(mockUsers, { organization: "Lendsqr" });

    expect(result).toHaveLength(1);
    expect(result[0].organization).toBe("Lendsqr");
  });

  it("returns empty array when no match (negative)", () => {
    const result = filterUsers(mockUsers, { organization: "Paystack" });

    expect(result).toEqual([]);
  });

  it("returns all users when filters are empty (positive)", () => {
    const result = filterUsers(mockUsers, {});

    expect(result).toHaveLength(2);
  });
});
