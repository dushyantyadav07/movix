import { useEffect, useCallback } from "react";
import "./App.css";

import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/HomeSlice";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Component/footer/Footer";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Header from "./Component/header/Header";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  const fetchApiConfig = useCallback(async () => {
    try {
      const res = await fetchDataFromApi("/configuration");
      if (res && res.images && res.images.secure_base_url) {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        dispatch(getApiConfiguration(url));
      } else {
        console.error("Invalid API configuration response", res);
      }
    } catch (error) {
      console.error("Failed to fetch API configuration", error);
    }
  }, [dispatch]);

  const genresCall = useCallback(async () => {
    try {
      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {};

      endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
      });

      const data = await Promise.all(promises);
      console.log(data);
      data.forEach((response) => {
        if (response && response.genres) {
          response.genres.forEach((item) => {
            allGenres[item.id] = item;
          });
        } else {
          console.error("Invalid genres response", response);
        }
      });

      dispatch(getGenres(allGenres));
    } catch (error) {
      console.error("Failed to fetch genres", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [fetchApiConfig, genresCall]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
