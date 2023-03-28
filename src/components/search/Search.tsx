import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { searchCountries } from "../../redux/countries/countrySlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((store) => store.countries);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchCountries(event.target.value));
  };

  return (
    <Box
    component="form"
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      "& > :not(style)": { m: 1, width: "25ch" },
    }}
    noValidate
    autoComplete="off"
  >
      <TextField
        label="Search countries by name"
        value={search}
        onChange={handleSearchChange}
        id="standard-basic"
        variant="standard"
        
      />
    </Box>
  );
};

export default Search;
