
import React from 'react'
import { useAuth } from "../../context/autchContext"
import { IAlert } from "../../models/alertModels";
import LoadingComponent from "../../utils/loading/LoadingComponent"
import WeatherContainer from "../Weather/WeatherContainer";



const Home = () => {

    const { user, loading } = useAuth()

    if (loading) {
        return <LoadingComponent fullScreen={true} />
    }

    return (
        <div>
            <div className="weather-container">
                <WeatherContainer email={user.email} />
            </div>
        </div>
    )
}

export default Home