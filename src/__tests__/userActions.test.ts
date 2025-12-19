import { updateUserStatus } from "@/utils/userActions";

describe("updateUserStatus", () => {
  const users = [
    { id: 1, status: "Active" },
    { id: 2, status: "Inactive" },
    {id: 3, status: "Blacklisted"},
    {id: 4, status: "Pending"}
  ] as any[];

  it("updates user status correctly (positive)", () => {
    const result = updateUserStatus(users, 1, "Blacklisted");
    expect(result[0].status).toBe("Blacklisted");
  });

  it("does not update when userId does not exist (negative)", () => {
    const result = updateUserStatus(users, 99, "Active");
    expect(result).toEqual(users);
  });
});
