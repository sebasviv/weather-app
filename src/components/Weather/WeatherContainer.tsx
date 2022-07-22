import React from 'react'
import { useWeather } from '../../hooks/WeatherHook'
import { IFavorite } from '../../models/favoriteModel'
import { IWeatherCard } from '../../models/weatherCard'
import { IWeatherApi2, IWeatherData } from '../../models/weatherModel'
import LoadingComponent from '../../utils/loading/LoadingComponent'
import BrowserComponent from './WeatherComponents/BrowserComponent'
import WeatherCardComponent from './WeatherComponents/WeatherCardComponent'

const initialValues: IWeatherCard = {
    city: '',
    date: '',
    description: '',
    humidity: 0,
    icon: '',
    pressure: 0,
    temp: 0,
    windSpeed: 0
}


interface Props {
    email: string
}
const WeatherContainer = ({ email }: Props) => {

    const [searchCity, setSearchCity] = React.useState('')
    const { getWeatherData, setFavoriteItem, reloadLocalStorage, getWeatherDataV2 } = useWeather()
    const [weatherCity, setWeatherCity] = React.useState<IWeatherCard>(initialValues)
    const [isFavorite, setIsFavorite] = React.useState<boolean>(false)
    const [favoritesCities, setFavoritesCities] = React.useState<string | null>(localStorage.getItem(email))
    const [api, setApi] = React.useState<number>(2)
    const [loading, setLoading] = React.useState<boolean>(false)


    const handleSearch = (city: string) => {
        setSearchCity(city)
    }

    const handleClick = async (value: string) => {
        try {
            setLoading(true)
            setFavoritesCities(reloadLocalStorage(email))
            setIsFavorite(false)
            const date = new Date()
            let city = ''
            if (api === 1) {
                const weatherData: IWeatherData | undefined = await getWeatherData(value)
                if (weatherData) {

                    setWeatherCity({
                        city: weatherData.name,
                        date: date.toDateString(),
                        description: weatherData.weather[0].description,
                        humidity: weatherData.main.humidity,
                        icon: weatherData.weather[0].icon,
                        pressure: weatherData.main.pressure,
                        temp: weatherData.main.temp,
                        windSpeed: weatherData.wind.speed
                    })

                    city = weatherData.name
                }
            } else {
                const watherDataTwo: IWeatherApi2 | undefined = await getWeatherDataV2(value)
                if (watherDataTwo) {
                    setWeatherCity({
                        city: watherDataTwo.location.name,
                        date: date.toDateString(),
                        description: watherDataTwo.current.condition.text,
                        humidity: watherDataTwo.current.humidity,
                        icon: watherDataTwo.current.condition.icon,
                        pressure: watherDataTwo.current.pressure_mb,
                        temp: watherDataTwo.current.temp_c,
                        windSpeed: watherDataTwo.current.wind_mph
                    })
                    city = watherDataTwo.location.name
                }
            }

            verifyFavorite(city)
            setLoading(false)
        } catch (error) {
            console.log("error apis: ", error)
        }
    }
    const handleFavorite = (data: IWeatherCard) => {
        let auxFavoritesCities: any[] = []
        if (favoritesCities) {
            auxFavoritesCities.push(JSON.parse(favoritesCities))
            let newFavoritesCities = [...auxFavoritesCities, data.city]
            setFavoriteItem(email, newFavoritesCities.toString())
        } else {
            auxFavoritesCities.push(data.city)
            setFavoriteItem(email, auxFavoritesCities.toString())
        }

    }


    const handleDeleteFavorite = (cityDelete: IWeatherCard) => {
        if (favoritesCities) {
            const auxStorage = JSON.parse(favoritesCities)
            let newArray = auxStorage.split(',')
            const auxArray = newArray.filter((city: any) => city !== cityDelete.city)
            setFavoriteItem(email, auxArray.join())
        }
    }

    const verifyFavorite = (citySearch: string) => {
        if (favoritesCities) {
            const auxStorage = JSON.parse(favoritesCities)
            if (auxStorage.includes(citySearch)) {
                setIsFavorite(true)
            } else {
                setIsFavorite(false)
            }
        }
    }

    const handleSelectApi = (value: string) => {
        setApi(parseInt(value))
    }

    return (
        <div className='weatherCard-container'>
            <BrowserComponent
                handleSearch={handleSearch}
                valueSearch={searchCity}
                handleClick={handleClick}
                handleSelectApi={handleSelectApi}
                valueApi={api}
            />

            {weatherCity !== initialValues ? !loading ? <WeatherCardComponent
                data={weatherCity}
                handleFavorites={handleFavorite}
                handleDeleteFavorite={handleDeleteFavorite}
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
                apiSelect={api}
                size={500}
            /> : <LoadingComponent fullScreen={false}/> :<></>}
        </div>
    )
}

export default WeatherContainer