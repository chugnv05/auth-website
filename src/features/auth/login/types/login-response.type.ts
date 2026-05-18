export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    roles: string[];
    permissions: string[];
  };
};
