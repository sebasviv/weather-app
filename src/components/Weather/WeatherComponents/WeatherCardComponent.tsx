import { Card, CardActions, IconButton } from '@mui/material'
import React from 'react'
import { IWeatherCard } from '../../../models/weatherCard'
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    data: IWeatherCard
    handleFavorites?(data: IWeatherCard): void
    handleDeleteFavorite(data: IWeatherCard): void
    isFavorite: boolean;
    setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>
    apiSelect: number
    size: number
}


const WeatherCardComponent = ({ data, handleFavorites, handleDeleteFavorite, isFavorite, setIsFavorite, apiSelect, size }: Props) => {


    const iconApi1 = `http://openweathermap.org/img/wn/${data.icon}@2x.png`
    return (
        <Card sx={{ maxWidth: size }} className='card'>
            <div className="weather-card">

                <div className="search">
                    <h1 className="city">{data.city}</h1>
                </div>

                <p className="description">{data.description}</p>
                <p className="date">{data.date}</p>

                <div className="numbers">
                    <div className="temp">
                        <span>{data.temp}</span><sup className="unit">°C</sup>
                    </div>

                    <div className="icon">
                        <img src={`${apiSelect === 1 ? iconApi1: data.icon}`} alt="" />
                    </div>

                    <div>
                        <table className="measurements">
                            <tr>
                                <td className="label">Pressure</td>
                                <td className="value">{data.pressure} hPa</td>
                            </tr>
                            <tr>
                                <td className="label">Humidity</td>
                                <td className="value">{data.humidity}%</td>
                            </tr>
                            <tr>
                                <td className="label">Wind speed</td>
                                <td className="value">{data.windSpeed} meters / sec</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <hr />
            </div>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => {
                    if (!isFavorite) {
                        if (handleFavorites)
                            handleFavorites(data)
                    } else {
                        handleDeleteFavorite(data)
                    }

                    setIsFavorite(!isFavorite)
                }}>
                    <FavoriteIcon className={`${isFavorite ? 'favoriteIcon-red' : ''}`} />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default WeatherCardComponent