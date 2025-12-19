import { User } from "@/types/types";

export const updateUserStatus = (
  users: User[],
  userId: number,
  status: User["status"]
) => {
  return users.map((user) =>
    user.id === userId ? { ...user, status } : user
  );
};
