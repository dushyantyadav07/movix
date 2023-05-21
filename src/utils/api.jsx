import axios from "axios";

//  tmdb base_url
const BASE_URL = "https://api.themoviedb.org/3";
// tmdb api token
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDRmMTdhN2VjOWQ0MDJhM2YwNTNhOWY0N2UzZDMxNSIsInN1YiI6IjY0Mjc1YzY3OTYwY2RlMDA3NzEyNzA0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aCV2Er2tHawvS3mfX2ewxoQiVHR1IQDj1JTakLPMB8o";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
       
    } catch (err) {
        console.log(err);
        return err;
    }

};

