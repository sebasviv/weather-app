
import { useAuth } from "../../context/autchContext"
import LoadingComponent from "../../utils/loading/LoadingComponent"
import WeatherContainer from "../Weather/WeatherContainer";



const Home = () => {

    const { user, loading } = useAuth()

    if (loading) {
        return <LoadingComponent />
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