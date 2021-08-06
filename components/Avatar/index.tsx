import React from "react";
import { Avatar as PAvatar, Colors, useTheme } from "react-native-paper";
import { User } from "../../models/user";

export const Avatar = ({ user, size = 32 }: { user: User, size?: number }) => {
  return user.avatar ? (
    <PAvatar.Image size={size} source={{ uri: user.avatar }} />
  ) : (
    <PAvatar.Text size={size} label={user.name.charAt(0)} />
  );
};
