import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  Input,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import FeedIcon from "@mui/icons-material/Feed";
import axios from "axios";

const ChatUI = () => {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // send message to backend
  const sendMessage = async () => {
    if (!question) return;
    setIsLoading(true);
    try {
      const request = await axios.post("http://localhost:3000/chat", {
        message: question,
      });
      // const role = request.data.choices[0].role
      // console.log(request);
      // request.data.choices[0].message.content
      // console.log(request.data.choices[0].message);
      setMessage(request.data.choices[0].message);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (!question) return;
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    // console.log("new chat");
    setQuestion("");
    setMessage(null);
    setCurrentTitle(null);
  };

  const getPreviousChat = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setQuestion("");
    setMessage(null);
  };

  useEffect(() => {
    // console.log("c: " + message);
    if (!currentTitle && question && message) {
      // console.log("no current");
      setCurrentTitle(question);
    }
    if (currentTitle && question && message) {
      // console.log("current");
      setPreviousChats((prevChats) => [
        ...prevChats,
        { title: currentTitle, role: "user", content: question },
        { title: currentTitle, role: message.role, content: message.content },
      ]);
    }
  }, [message, currentTitle]);

  // console.log(previousChats);
  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );
  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  // {
  //   console.log(uniqueTitles);
  // }
  // {
  //   currentChat?.map((chatMessage, index) => {
  //     console.log(chatMessage.role, chatMessage.content);
  //   });
  // }

  return (
    <>
      <Box
        flex={5}
        p={{ xs: 0, md: 2 }}
        height="85vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        {/* chat list */}
        <Button
          sx={{ mr: "auto", mt: 2 }}
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={startNewChat}
        >
          New Chat
        </Button>
        <List sx={{ flexGrow: 1, mt: 2, p: 3, overflow: "auto" }}>
          {/* list item  */}
          {currentChat?.map((chatMessage, index) => {
            if (chatMessage.role === "user") {
              return (
                <ListItem key={index}>
                  <ListItemText
                    sx={{
                      textAlign: "right",
                      mr: 2,
                    }}
                    primary={`${chatMessage.content}`}
                  />
                  <ListItemAvatar>
                    <Avatar alt="Y" src="/static/images/avatar/2.jpg">
                      Y
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
              );
            }

            if (chatMessage.role === "assistant") {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar alt="AI" src="/static/images/avatar/2.jpg">
                      AI
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${chatMessage.content}`} />
                </ListItem>
              );
            }
          })}
        </List>

        {/* input */}
        <FormControl fullWidth>
          <Input
            placeholder="Type a message..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            endAdornment={
              <InputAdornment position="end">
                {/* send button */}
                <IconButton onClick={sendMessage} disabled={isLoading}>
                  {isLoading ? (
                    <CircularProgress
                      sx={{
                        mb: 3,
                      }}
                    />
                  ) : (
                    <SendIcon />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {isLoading && <LinearProgress color="primary" />}
        </FormControl>
      </Box>

      <Box flex={2} p={2} sx={{ display: { xs: "none", md: "block" } }}>
        <Box position="fixed">
          <Typography variant="h6" fontWeight="bold" mt={2}>
            Latest Conversations
          </Typography>

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {uniqueTitles?.map((uniqueTitle, index) => {
              return (
                <ListItem
                  alignItems="flex-start"
                  key={index}
                  onClick={() => getPreviousChat(uniqueTitle)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FeedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${uniqueTitle}`} />
                </ListItem>
                // console.log(uniqueTitle)
              );
            })}
          </List>
        </Box>
      </Box>
    </>
  );
};
export default ChatUI;
