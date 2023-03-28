import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Paper from "@mui/material/Paper";
import CountryColumns from "../tableColumns/CountryColumns";
import Typography from "@mui/material/Typography";
import { clearAllFavorite } from "../../redux/countries/countrySlice";
import { Button, Box } from "@mui/material";

const Favorites = () => {
  const { countries, favorites } = useAppSelector((state) => state.countries);

  const favoriteCountries = countries.filter((country) =>
    favorites.find((favCountry) => favCountry.cca2 === country.cca2)
  );

  const dispatch = useAppDispatch();

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <CountryColumns />
          {favoriteCountries.length === 0 && (
            <Typography
              variant="h6"
              align="center"
              color="error"
              sx={{ my: 2, textAlign: "center" }}
            >
              No favorites added yet.
            </Typography>
          )}
          <TableBody>
            {favoriteCountries.map((country, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" sx={{ px: 3 }}>
                  <img
                    src={country.flags.png}
                    alt={country.flags.alt}
                    width="50%"
                  />
                </TableCell>
                <TableCell align="left" sx={{ px: 3 }}>
                  {country.name.common}
                </TableCell>
                <TableCell align="left" sx={{ px: 3 }}>
                  {country.region}
                </TableCell>
                <TableCell align="left" sx={{ px: 3 }}>
                  {country.population.toLocaleString()}
                </TableCell>
                <TableCell align="left" sx={{ px: 3 }}>
                  {Object.values(country.languages || {}).map(
                    (language, index) => (
                      <li key={index}>{language}</li>
                    )
                  )}
                </TableCell>
                <TableCell align="left" sx={{ px: 3 }}>
                  <Link to="/country-details" state={country}>
                    <KeyboardArrowRightIcon color="primary" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {favoriteCountries.length >= 1 && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(clearAllFavorite())}
            sx={{ my: "16px" }}
          >
            Remove All
          </Button>
        </Box>
      )}
    </>
  );
};

export default Favorites;
