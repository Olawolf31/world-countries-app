import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import Switch from "@mui/material/Switch";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleTheme } from "../../redux/theme/themeSlice";
import "../header/header.css";

const Header = () => {
  const dispatch = useAppDispatch();

  const favoritesCount = useAppSelector(
    (state) => state.countries.favorites.length
  );

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Country
          </Typography>

          <Link to="/">
            <HomeIcon sx={{ margin: "0 8px" }} className="header-icon" />
          </Link>

          <Link to="/countries">
            <PublicIcon sx={{ margin: "0 8px" }} className="header-icon" />
          </Link>
          <Link to="/favorites">
            <Badge
              sx={{ margin: "0 8px" }}
              badgeContent={favoritesCount}
              color="secondary"
            >
              <FavoriteIcon className="header-icon" />
            </Badge>
          </Link>
          <Switch sx={{ margin: "0 8px" }} onChange={handleToggleTheme} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
