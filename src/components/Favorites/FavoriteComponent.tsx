import React from 'react'
import { useAuth } from '../../context/autchContext'
import { useWeather } from '../../hooks/WeatherHook'

const FavoriteComponent = () => {

  const { user, logout, loading } = useAuth()
  const { getWeatherData, setFavoriteItem, getFavoriteItem } = useWeather()
  const [cards, setCards] = React.useState()

  React.useEffect(() => {

    const items = getFavoriteItem(user.email)
    setCards(items)
  }, [])

  React.useEffect(() => {
      console.log("cards: ", cards)
  }, [cards])


  const handleRenderCards = () => {
    
  }
  return (
    <div>{ }</div>
  )
}

export default FavoriteComponent