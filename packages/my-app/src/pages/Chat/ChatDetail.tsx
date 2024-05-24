import { Avatar, Box, Typography } from "@mui/material";
import { messagesType } from "../../../types/FormProps";

export const ChatDetail = ({
  userId,
  messages,
}: {
  userId: string | null;
  messages: messagesType[] | undefined;
}) => {
  // 日付フォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getDate() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  return (
    <Box sx={{ flex: 1 }}>
      {messages &&
        messages.map((message) => {
          if (message.user_id === userId) {
            return (
              <Box
                key={message.id}
                sx={{
                  mt: 1,
                  mr: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      border: "1px solid #90caf9",
                      borderRadius: "8px 0px 8px 8px",
                      backgroundColor: "white",
                    }}
                  >
                    {message.content}
                  </Box>
                  <Box>
                    <Typography color="#bdbdbd" variant="body2">
                      {formatDate(message.created_at)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          } else {
            return (
              <Box
                key={message.id}
                sx={{
                  ml: 1,
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <Avatar>O</Avatar>
                <Box
                  sx={{
                    ml: 1,
                    p: 1,
                    border: "1px solid #90caf9",
                    borderRadius: "0px 8px 8px 8px",
                    backgroundColor: "white",
                  }}
                >
                  {message.content}
                </Box>
              </Box>
            );
          }
        })}
    </Box>
  );
};
