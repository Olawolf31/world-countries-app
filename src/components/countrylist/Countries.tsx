import React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import {
  getAllCountries,
  setMessage,
  addFavorite,
  removeFavorite,
} from "../../redux/countries/countrySlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CountryColumns from "../tableColumns/CountryColumns";
import { TablePagination } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FavCountry {
  cca2: string;
  name: {
    common: string;
  };
}

const Countries = () => {
  const { countries, search, message, favorites } = useAppSelector(
    (store) => store.countries
  );
  const dispatch = useAppDispatch();

  const [allCountries, setAllCountries] = useState(countries);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //Fetch Countries
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  // Update filtered countries while searching
  useEffect(() => {
    if (search.trim() === "") {
      setAllCountries(countries);
      dispatch(setMessage(""));
    } else {
      const newFilteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setAllCountries(newFilteredCountries);
      if (newFilteredCountries.length === 0) {
        dispatch(setMessage("Country does not exist"));
      } else {
        dispatch(setMessage(""));
      }
    }
  }, [search, countries, dispatch]);

  //handle favorite icon when clicked
  const handleToggleFavorite = (country: FavCountry) => {
    const countryName = country.name.common;
    const countryCode = country.cca2;
    const isFavorite = favorites.find(
      (favCountry) => favCountry.cca2 === countryCode
    );

    if (isFavorite) {
      dispatch(removeFavorite(countryCode));
      toast(`${countryName} has been removed from your favorites!`);
    } else {
      dispatch(addFavorite(country));
      toast(`${countryName} has been added to your favorites!`);
    }
  };

  //Handle Pagination
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayCountries = allCountries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <CountryColumns />
          <TableBody>
            {/*  Notification when a country has been added to favorite list */}
            <ToastContainer />

            {/*  Display error when search is not found */}
            {message && (
              <Typography
                variant="h6"
                align="center"
                color="error"
                sx={{ my: 2, textAlign: "center" }}
              >
                {message}
              </Typography>
            )}

            {/* displaying all countries */}
            {displayCountries.map((country, index) => (
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
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/country-details/${country.name.common}`}
                  >
                    {country.name.common}
                  </Link>
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
                  <FavoriteIcon
                    color={
                      favorites.find(
                        (favCountry) => favCountry.cca2 === country.cca2
                      )
                        ? "error"
                        : "primary"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => handleToggleFavorite(country)}
                  />
                </TableCell>

                <TableCell align="left" sx={{ px: 3 }}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/country-details/${country.name.common}`}
                  >
                    <KeyboardArrowRightIcon color="primary" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={allCountries.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Countries;
