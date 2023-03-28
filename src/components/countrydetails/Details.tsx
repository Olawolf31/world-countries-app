import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import PlaceIcon from "@mui/icons-material/Place";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { getCountryDetails } from "../../redux/countries/countrySlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Loading from "../loading/Loading";
import "./details.css";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const country = useAppSelector((state) =>
    state.countries.countries.find((c) => c.name.common === name)
  );

  //handle expand details
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (name) {
      dispatch(getCountryDetails(name));
    }
  }, [name, dispatch]);

  if (!country) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="container">
      <Box>
        <Card sx={{ maxWidth: 545 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {country.name.common[0]}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={country.name.official}
            subheader={country.capital}
          />
          <CardMedia
            component="img"
            height="294"
            image={country.flags.png}
            alt={country.name.common}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              The country belongs to {country.region} region and{" "}
              {country.subregion} sub-region. Located at the {country.latlng[0]}{" "}
              °N and {country?.latlng[1]} °W, this country has a population of{" "}
              {country?.population.toLocaleString()} and it has{" "}
              {country.independent
                ? "gained Independence"
                : "not gained independence"}
              , accordinng to CIA World Factbook
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              onClick={() => navigate("/countries")}
              aria-label="go to countries list"
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton aria-label="share">
              <Link to={country.maps.googleMaps} target="_blank">
                <PlaceIcon />
              </Link>
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography align="left" paragraph>
                {country.name.common} speaks the following language
                {Object.values(country.languages || {}).map(
                  (language, index) => (
                    <li key={index}>{language}</li>
                  )
                )}
              </Typography>

              <Typography align="left" paragraph>
                {country?.name.common} speaks the following language
                {Object.values(country?.languages || {}).map(
                  (language, index) => (
                    <li key={index}>{language}</li>
                  )
                )}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    </div>
  );
};

export default Details;
