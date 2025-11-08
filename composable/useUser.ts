export interface User {
  isLoading?: boolean;
  email?: string;
  name?: string;
  id?: string;
  username?: string;
  picture?: string;
  sub?: string;
  bio?: string;
  links?: string;
  city?: string;
  state?: string;
}

export const useUser = () => useState<User | null>("user", () => null);
