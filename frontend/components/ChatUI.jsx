import {
  Box,
  Typography,
  FormControl,
  InputAdornment,
  Input,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatUI() {
  return (
    <Box
      flex={5}
      p={{ xs: 0, md: 2 }}
      height="85vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* chat list */}

      <List sx={{ flexGrow: 1, mt: 2, p: 3, overflow: "auto" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="AI" src="/static/images/avatar/2.jpg">
              AI
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  border={1}
                  borderRadius={5}
                  p={2}
                  // backgroundColor="#B4D4FF"
                >
                  Hello! I am SysTech Support AI Agent. How can I help you?
                </Typography>
              </>
            }
          />
        </ListItem>
      </List>

      {/* input */}
      <FormControl fullWidth>
        <Input
          placeholder="Type a message..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}

export default ChatUI;
