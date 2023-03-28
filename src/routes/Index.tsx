import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AllCountries from "../pages/AllCountries";
import Favorites from "../pages/Favorites";
import CountryDetails from "../pages/CountryDetails";
import Error from "../pages/Error";
import Header from "../layouts/header/Header";
import Footer from "../layouts/footer/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<AllCountries />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/country-details/:name" element={<CountryDetails />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Index;
