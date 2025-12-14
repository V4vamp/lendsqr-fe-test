export interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisteredUser extends SignUp {}

export interface Login {
  email: string;
  password: string;
}

export interface AuthToken {
  access_token: string;
  token_type: 'Bearer';
}

export interface AuthSession {
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
  token: AuthToken;
}

export interface PasswordResetToken {
  token: string;
  email: string;
  expiresAt: number;
}

export interface Guarantor {
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface Education {
  level: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: number;
}

export interface Account {
  balance: string;
  accountNumber: number;
  bankName: string;
}

export interface Profile {
  fullName: string;
  avatar: string;
  phone: string;
  bvn: number;
  gender: string;
  maritalStatus: string;
  children: string;
  residence: string;
}

export interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone?: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  tier: number;
  account: Account;
  profile: Profile;
  education: Education;
  socials: Socials;
  guarantors: Guarantor[];
}
