import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CountrySlice } from "../../interface/country";
import { Countries } from "../../interface/country";
import axios from "axios";

const initialState: CountrySlice = {
  countries: [],
  loading: false,
  error: false,
  favorites: [],
  search: "",
  message: "",
};

const BASE_URL = "https://restcountries.com/v3.1/";

export const getAllCountries = createAsyncThunk(
  "country/getAllCountries",
  async () => {
    let response = await axios.get(`${BASE_URL}/all`);
    let data: Countries[] = response.data;
    return data;
  }
);

export const getCountryDetails = createAsyncThunk("country/getCounntyDetails", async (name: string) => {
  let response = await axios.get(`${BASE_URL}/name/${name}`)
  let data: Countries[] = response.data
  return data
})

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    searchCountries: (state, action) => {
      state.search = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },

    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (country) => country.cca2 !== action.payload
      );
    },
    clearAllFavorite: (state) => {
      state.favorites = [];
    },
    sortCountriesByName: (state, action) => {
      const sortOrder = action.payload;
      if (sortOrder === "asc") {
        state.countries.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
      } else {
        state.countries.sort((a, b) =>
          b.name.common.localeCompare(a.name.common)
        );
      }
    },
    sortByPopulation: (state, action) => {
      const order = action.payload;
      if (order === "asc") {
        state.countries.sort((a, b) => a.population - b.population);
      } else if (order === "desc") {
        state.countries.sort((a, b) => b.population - a.population);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.message = "Fetch Successful"
      state.loading = false
    });

    builder.addCase(getAllCountries.pending, (state) => {
      state.error = false
      state.message = "loading countries"
      state.loading = true
    });

    builder.addCase(getAllCountries.rejected, (state) => {
      state.error = true
      state.message = "Error Fetching data"
      state.loading = false
    });

    builder.addCase(getCountryDetails.fulfilled, (state, action) => {
      state.error = false
      state.countries = action.payload
      state.loading = false
    })

    builder.addCase(getCountryDetails.pending, (state) => {
      state.error = false
      state.message = "loading countries details"
      state.loading = true
    });

    builder.addCase(getCountryDetails.rejected, (state) => {
      state.error = true
      state.message = "Error Fetching details"
      state.loading = false
    });
  },
});

export const {
  searchCountries,
  setMessage,
  addFavorite,
  removeFavorite,
  clearAllFavorite,
  sortCountriesByName,
  sortByPopulation,
} = countrySlice.actions;
export default countrySlice.reducer;
