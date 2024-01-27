import {createContext, useEffect, useState} from "react";

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();
const CitiesProvider = ({children}) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (e) {
                console.log(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading
        }}>
            {children}
        </CitiesContext.Provider>
    );
};

export {CitiesProvider};