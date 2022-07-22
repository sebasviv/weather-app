import { Card, CardActions, IconButton } from '@mui/material'
import React from 'react'
import { IWeatherCard } from '../../../models/weatherCard'
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    data: IWeatherCard
    handleFavorites(data: IWeatherCard): void
    handleDeleteFavorite(data: IWeatherCard): void
    isFavorite: boolean;
    setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>
    apiSelect: number
}


const WeatherCardComponent = ({ data, handleFavorites, handleDeleteFavorite, isFavorite, setIsFavorite, apiSelect}: Props) => {

   
    return (
        <Card sx={{ maxWidth: 500 }} className='card'>
            <div className="weather-card">

                <div className="search">
                    <h1 className="city">{data.city}</h1>
                    {/* <button className="_edit">
                        <img src="https://img.icons8.com/metro/26/000000/pencil.png" />
                    </button> */}
                    {/* <input type="text" value="London" placeholder="Search for a city..." /> */}
                    {/* <div className="search-results">
                        <ul id="results-list">
                            <li>Paris</li>
                            <li>Manila</li>
                            <li>Beaverlodge</li>
                        </ul>
                    </div> */}
                </div>

                <p className="description">{data.description}</p>
                <p className="date">{data.date}</p>

                <div className="numbers">
                    <div className="temp">
                        <span>{data.temp}</span><sup className="unit">°C</sup>
                    </div>

                    <div className="icon">
                        <img src={`${apiSelect === 1 ? 'http://openweathermap.org/img/wn/${data.icon}@2x.png' : data.icon}`} alt="" />
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

                {/* <div className="hourly">
                    <div>
                        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" />
                        <span className="date">10 AM</span>
                    </div>

                    <div>
                        <img src="http://openweathermap.org/img/wn/09d@2x.png" alt="" />
                        <span className="date">11 AM</span>
                    </div>

                    <div>
                        <img src="http://openweathermap.org/img/wn/09d@2x.png" alt="" />
                        <span className="date">12 PM</span>
                    </div>

                    <div>
                        <img src="http://openweathermap.org/img/wn/09d@2x.png" alt="" />
                        <span className="date">1 PM</span>
                    </div>

                    <div>
                        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" />
                        <span className="date">2 PM</span>
                    </div>

                    <div>
                        <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="" />
                        <span className="date">3 PM</span>
                    </div>
                </div> */}
            </div>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => {
                    if(!isFavorite){
                        handleFavorites(data)
                    }else {
                        handleDeleteFavorite(data)
                    }
                    
                    setIsFavorite(!isFavorite)
                }}>
                    <FavoriteIcon className={`${isFavorite ? 'favoriteIcon-red' : ''}`}/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default WeatherCardComponent