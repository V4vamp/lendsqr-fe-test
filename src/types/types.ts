export interface SignUp {
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    access_token: string;
    token_type: string;
  };
  message: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: number;
  email: string;
}

export interface DashboardStats {
  sales_value: number;
  commission_earned: number;
  currency: string;
}

export interface Transaction {
  player_name: string;
  date: string;
  amount: number;
  currency: string;
  status: string;
}
