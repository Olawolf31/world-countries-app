import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableSortLabel } from "@mui/material";
import {
  sortCountriesByName,
  sortByPopulation,
} from "../../redux/countries/countrySlice";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";

const CountryColumns = () => {
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [populationSortOrder, setPopulationSortOrder] = useState<
    "asc" | "desc"
  >("asc");

  const dispatch = useAppDispatch();

  //sort countries by name
  const handleSortCountries = () => {
    if (sortOrder === "none" || sortOrder === "desc") {
      dispatch(sortCountriesByName("asc"));
      setSortOrder("asc");
    } else {
      dispatch(sortCountriesByName("desc"));
      setSortOrder("desc");
    }
  };

  //sort countries by population
  const handleSortByPopulation = () => {
    if (populationSortOrder === "asc") {
      dispatch(sortByPopulation("desc"));
      setPopulationSortOrder("desc");
    } else {
      dispatch(sortByPopulation("asc"));
      setPopulationSortOrder("asc");
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" sx={{ px: 3 }}>
          Flag
        </TableCell>
        <TableCell align="left" sx={{ px: 3 }}>
          <TableSortLabel
            active={sortOrder !== "none"}
            direction={sortOrder === "none" ? "asc" : sortOrder}
            onClick={handleSortCountries}
          >
            Name
          </TableSortLabel>
        </TableCell>
        <TableCell align="left" sx={{ px: 3 }}>
          Region
        </TableCell>
        <TableCell align="left" sx={{ px: 3 }}>
          <TableSortLabel
            active
            direction={populationSortOrder}
            onClick={handleSortByPopulation}
          >
            Population
          </TableSortLabel>
        </TableCell>
        <TableCell align="left" sx={{ px: 3 }}>
          Languages
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CountryColumns;
