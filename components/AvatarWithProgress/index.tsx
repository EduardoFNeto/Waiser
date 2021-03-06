import { add } from "date-fns";
import React from "react";
import { Avatar as PAvatar, Colors, useTheme } from "react-native-paper";
import ProgressCircle from "react-native-progress-circle";
import { User } from "../../models/user";

const getPercent = (createdAt: Date) => {
  var start = createdAt;
  var end = add(createdAt, { hours: 24 });
  var today = new Date();

  return (Math.round(((today - start) / (end - start)) * 100));
};

export const AvatarWithProgress = ({
  user,
  createdAt,
}: {
  user: User;
  createdAt: Date;
}) => {
  const theme = useTheme();

  return (
    <ProgressCircle
      percent={getPercent(createdAt)}
      radius={24}
      borderWidth={4}
      color={theme.colors.accent}
      shadowColor={Colors.grey200}
      bgColor="#fff"
    >
      {user.avatar ? (
        <PAvatar.Image size={32} source={{ uri: user.avatar }} />
      ) : (
        <PAvatar.Text size={32} label={user.name.charAt(0)} />
      )}
    </ProgressCircle>
  );
};
