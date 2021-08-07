import { logOut } from "../services/api/authentication";

export const signOutOnSessionError = async (e: Error, navigation: any) => {
  if (e.message.includes("Invalid session token")) {
    await logOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  }
};
