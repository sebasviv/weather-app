import { AxiosResponse } from 'axios';
import { IFavorite } from '../models/favoriteModel';
import { IWeatherCard } from '../models/weatherCard';
import { IWeatherData, IWeatherApi2 } from '../models/weatherModel';

export const useWeather = () => {

    const axios = require('axios').default;
    //API1

    const OpenWeatherUrl = 'https://api.openweathermap.org/data/2.5'
    const ApiKeyOne = '38ff17171def88765ba03fc2fc79a353'

    //API2
    const WeatherApi = 'http://api.weatherapi.com/v1'
    const ApiKeyTwo = 'ea463134bcdb44b8aea154908222207'

    const getWeatherData = async (value: string) => {
        const response: IWeatherData = await axios.get(`${OpenWeatherUrl}/weather?q=${value}&appid=${ApiKeyOne}&units=metric`)
            .then(function (response: AxiosResponse) {
                return response.data
            })
            .catch(function (error: any) {
                // handle error
                console.log('error weather: ', error);
            })

        if (response) {
            return response
        }
    }

    const getWeatherDataV2 = async (value: string) => {
        const response: IWeatherApi2 = await axios.get(`${WeatherApi}/current.json?key=${ApiKeyTwo}&q=${value}&aqi=no`)
            .then(function (response: AxiosResponse) {
                return response.data
            })
            .catch(function (error: any) {
                // handle error
                console.log('error weatherApi2: ', error);
            })

        if (response) {
            return response
        }
    }

    const setFavoriteItem = (email: any, data: any) => {
        return localStorage.setItem(`${email}`, JSON.stringify(data))
    }

    const getFavoriteItem = (email: string) => {
        const item = localStorage.getItem(`${email}`)
        if(item) {
            const data = JSON.parse(item)
            return data
        }
    }

    const reloadLocalStorage = (email: string) => {
        return localStorage.getItem(email)
    }

    return {
        getWeatherData,
        setFavoriteItem,
        getFavoriteItem,
        reloadLocalStorage,
        getWeatherDataV2 
    }
}

