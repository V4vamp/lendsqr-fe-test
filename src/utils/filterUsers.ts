import { User } from "@/types/types";

export const filterUsers = (
  users: User[],
  filters: Partial<Record<keyof User, string>>
) => {
  return users.filter((user) =>
    Object.entries(filters).every(([key, value]) =>
      value ? String(user[key as keyof User]).includes(value) : true
    )
  );
};
