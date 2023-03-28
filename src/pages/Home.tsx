import React from "react";
import Countries from "../components/countrylist/Countries";
import Search from "../components/search/Search";
import Loading from "../components/loading/Loading";
import { useAppSelector } from "../app/hooks";

const Home = () => {
  const { loading } = useAppSelector((store) => store.countries);
  return (
    <>
      {loading && <Loading />}
      <>
        <Search />
        <Countries />
      </>
    </>
  );
};

export default Home;
