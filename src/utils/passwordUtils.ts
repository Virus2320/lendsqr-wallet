//import bcrypt from "bcrypt"; //assuming im to secure the password!

export const hashPassword = async (password: string) => {
  //const salt = await bcrypt.genSalt(10);
  return password; //bcrypt.hash(password, salt);
};
