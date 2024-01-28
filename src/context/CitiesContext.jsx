import {createContext, useContext, useEffect, useReducer} from "react";

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
}

// Reducer Function
function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true,
            }
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            }
        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity: {}
            }
        default:
            throw new Error('Unknown action type');
    }
}

const CitiesProvider = ({children}) => {

    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState)


    useEffect(() => {
        async function fetchCities() {
            dispatch({type: 'loading'});
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({type: 'cities/loaded', payload: data});
            } catch (e) {
                dispatch({type: 'rejected', payload: 'There was an error on loading data'});
            }
        }

        fetchCities();
    }, []);

    // Creating City
    async function createCity(newCity) {
        dispatch({type: 'loading'});
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-type": "application/json",
                }
            });
            const data = await res.json();
            dispatch({type: 'city/created', payload: data});
        } catch (e) {
            dispatch({type: 'rejected', payload: 'There was an error on Creating City'});
        }
    }

    // Deleting City
    async function deleteCity(id) {
        dispatch({type: 'loading'});
        try {
            await fetch(`${BASE_URL}/cities`, {
                method: 'DELETE',
            });
            dispatch({type: 'city/deleted', payload: id});
        } catch (e) {
            dispatch({type: 'rejected', payload: 'There was an error on Deleting City'});
        }
    }


    // Getting City
    async function getCity(id) {
        if (Number(id) === currentCity.id) return;

        dispatch({type: "loading"});
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({type: 'city/loaded', payload: data});
        } catch (e) {
            dispatch({type: 'rejected', payload: 'There was an error on loading City'});
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            getCity,
            currentCity,
            createCity,
            deleteCity,
            error
        }}>
            {children}
        </CitiesContext.Provider>
    );
};

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error('CitiesContext was used outside of CitiesProvider')
    return context
}

export {CitiesProvider, useCities};