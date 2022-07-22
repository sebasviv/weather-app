import React from 'react'
import { useAuth } from '../../context/autchContext'
import { useWeather } from '../../hooks/WeatherHook'
import { IWeatherCard } from '../../models/weatherCard'
import { IWeatherApi2 } from '../../models/weatherModel'
import LoadingComponent from '../../utils/loading/LoadingComponent'
import WeatherCardComponent from '../Weather/WeatherComponents/WeatherCardComponent'

const FavoriteComponent = () => {

  const { user, logout } = useAuth()
  const { getWeatherData, setFavoriteItem, getFavoriteItem, getWeatherDataV2 } = useWeather()
  const [cards, setCards] = React.useState<string[]>([])
  const [weatherCardsGroup, setWeatherCardsGroup] = React.useState<IWeatherCard[]>([])
  const [isFavorite, setIsFavorite] = React.useState<boolean>(true)
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    updateCards()
  }, [])

  React.useEffect(() => {
    handleRenderCards()
  }, [cards])

  React.useEffect(() => {
    
    setInterval(() => {
      setWeatherCardsGroup([])
      updateCards()
    }, 5000)
  }, [])


  const updateCards = () => {
    const items = getFavoriteItem(user.email)
    const filterItems = items.split(',')
    setCards(filterItems.filter((item: string) => item !== ''))
  }

  const handleRenderCards = () => {
    const date = new Date()
    const hour = new Intl.DateTimeFormat(undefined, { timeStyle: "long" }).format(new Date())
    setLoading(true)
    cards.forEach(async (card) => {
      try {
        const watherDataTwo: IWeatherApi2 | undefined = await getWeatherDataV2(card)
        if (watherDataTwo) {
          const weatherTemp: IWeatherCard = {
            city: watherDataTwo.location.name,
            date: `${date.toDateString()} - ${hour}`,
            description: watherDataTwo.current.condition.text,
            humidity: watherDataTwo.current.humidity,
            icon: watherDataTwo.current.condition.icon,
            pressure: watherDataTwo.current.pressure_mb,
            temp: watherDataTwo.current.temp_c,
            windSpeed: watherDataTwo.current.wind_mph
          }
          const weatherGroupAux: IWeatherCard[] = weatherCardsGroup
          weatherGroupAux.push(weatherTemp)
          setWeatherCardsGroup([...weatherGroupAux])
        }
        setLoading(false)
      } catch (error) {
        console.log("error favorites: ", error)
      }
    }
    )
  }

  const handleDeleteFavorite = (cityDelete: IWeatherCard) => {
    setWeatherCardsGroup([])
    const auxArray = cards.filter((city: any) => city !== cityDelete.city)
    setFavoriteItem(user.email, auxArray.join())
    updateCards()
  }

  return (
    <div className='favorites-container'>
      { !loading ? weatherCardsGroup.map((card, key) =>
        <div className='card-container'>
          <WeatherCardComponent
            data={card}
            handleDeleteFavorite={handleDeleteFavorite}
            isFavorite={weatherCardsGroup.includes(card)}
            setIsFavorite={setIsFavorite}
            apiSelect={2}
            size={300}
            key={key}
          />
        </div>
      ) : <LoadingComponent fullScreen={false}/>}

    </div>
  )
}

export default FavoriteComponent