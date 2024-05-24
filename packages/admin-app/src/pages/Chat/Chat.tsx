import { Box, IconButton, InputBase, Paper, TextField } from "@mui/material";
import { ListSecondary } from "../../component/ListSecondary";
import { ChatDetail } from "./ChatDetail";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import SendIcon from "@mui/icons-material/Send";
import { messagesType, chatListType } from "../../../types/FormProps";
import { useAuth } from "../../context/AuthContext";

export const Chat = () => {
  const [chatList, setChatList] = useState<chatListType[] | undefined>();
  const [partnerId, setPartnerId] = useState<string>();
  const [messages, setMessages] = useState<messagesType[] | undefined>();
  const [message, setMessage] = useState<string>();
  const { authUser } = useAuth();

  useEffect(() => {
    if (partnerId) {
      fetchRealtimeData(partnerId);
    }
  }, []);

  useEffect(() => {
    console.log(authUser.id);
    if (authUser.id) {
      (async () => {
        const { data, error } = await supabase.rpc("get_chat_list", {
          user_id: authUser.id,
        });
        console.log(data);
        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setChatList(data);
        }
      })();
    }
  }, [authUser]);

  const fetchRealtimeData = (id: string) => {
    try {
      supabase
        .channel("table_postgres_chat_messages_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "chat_messages",
          },
          (payload) => {
            // データ登録
            if (payload.eventType === "INSERT") {
              getChatMessages(id);
            }
          }
        )
        .subscribe();

      // リスナーの削除
      return () => supabase.channel("table_postgres_chat_messages_changes");
    } catch (error) {
      console.log(error);
    }
  };

  // chatの取得
  const getChatMessages = async (id: string) => {
    try {
      if (authUser.id && id) {
        const { data: room } = await supabase
          .from("chat_rooms")
          .select("id")
          .eq("client_user_id", authUser.id)
          .eq("organization_id", id);
        if (room) {
          // 最新５件
          const { data: messages, error } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("chat_room_id", room[0].id)
            .order("created_at", { ascending: false });
          if (error) {
            setMessages(undefined);
          }
          // 作成日時で昇順
          if (messages) {
            messages.sort((a, b) => {
              if (a.created_at < b.created_at) {
                return -1;
              }
              if (a.created_at > b.created_at) {
                return 1;
              }
              return 0;
            });
            setMessages(messages);
          }
        }
      }
    } catch (error) {
      //
    }
  };

  // チャットを開始したい相手のアイコンを押下
  const handleSelect = async (id: string) => {
    setPartnerId(id);
    setMessages(undefined);
    getChatMessages(id);
  };

  // チャット投稿
  const sendMessage = async () => {
    if (!message) return;
    try {
      // チャットルームなければ作成、message保存
      if (authUser.id && partnerId) {
        const { error } = await supabase.rpc("create_chat_message", {
          user_id: authUser.id,
          partner_id: partnerId,
          message: message,
        });
        setMessage("");

        if (error) {
          console.error(error.message);
        }
      }
    } catch (error) {
      if (error) {
        console.error("Error calling Supabase function:", error);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box
        sx={{
          width: "300px",
          backgroundColor: "white",
          borderRight: (theme) => "1px solid " + theme.palette.grey[300],
          pt: 2,
        }}
      >
        <TextField
          margin="normal"
          variant="outlined"
          label="search"
          name="name"
        />
        <ListSecondary data={chatList} onSelect={handleSelect} />
      </Box>
      <Box
        sx={{
          backgroundColor: "#e1f5fe",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatDetail userId={authUser?.id} messages={messages} />
        {partnerId && (
          <Box>
            <Paper
              component="form"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              sx={{
                p: "10px",
                display: "flex",
                width: "100%",
              }}
            >
              <InputBase
                id="message"
                sx={{ width: "100%" }}
                multiline
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="メッセージを送信する"
              />
              <IconButton type="submit" aria-label="send" sx={{ pr: 2 }}>
                <SendIcon />
              </IconButton>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};
