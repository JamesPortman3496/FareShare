export type Member = {
  email: string;
  displayName?: string;
  role?: "admin" | "member";
};

export type Group = {
  id: string;
  name: string;
  members?: Member[];
};
