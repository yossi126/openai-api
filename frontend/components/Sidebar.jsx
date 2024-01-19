import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Article, Settings } from "@mui/icons-material";

const Sidebar = ({ setMode, mode }) => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", md: "block" } }}>
      <Box position="fixed">
        <List>
          {/* List item */}
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Homepage"></ListItemText>
            </ListItemButton>
          </ListItem>
          {/* List item */}
          <ListItem disablePadding>
            <ListItemButton component="a" href="#chat">
              <ListItemIcon>
                <ChatBubbleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Chat"></ListItemText>
            </ListItemButton>
          </ListItem>
          {/* List item */}
          <ListItem disablePadding>
            <ListItemButton component="a" href="#feed">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Feed"></ListItemText>
            </ListItemButton>
          </ListItem>
          {/* List item */}
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
              <Switch
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
