import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { chatListType } from "../../types/FormProps";

type ListSecondaryProps = {
  data: chatListType[] | undefined;
  onSelect: (id: string) => void;
};

export const ListSecondary: React.FC<ListSecondaryProps> = ({
  data,
  onSelect,
}) => {
  // 幅が小さい時
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // ロジック
  }, [isSmallScreen]); // 最初のレンダリング時にのみ実行

  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {data &&
        data.map((value) => {
          const labelId = `list-secondary-label-${value.id}`;
          return (
            <ListItem
              key={value.id}
              disablePadding
              onClick={() => onSelect(value.id)}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={`Avatar n°${value.id}`}>
                    {value.name?.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                {!isSmallScreen && (
                  <ListItemText id={labelId} primary={value.name} />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
    </List>
  );
};
