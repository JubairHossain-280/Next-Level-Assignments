export interface UserModel {
  id: number;
  name: string;
  role: "contributor" | "maintainer";
}
