export type AuthInput = {
  email: string;
  password: string;
};

export type AuthType = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
};
