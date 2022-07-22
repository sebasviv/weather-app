import React from 'react'
import { useAuth } from '../../context/autchContext'
import { useAlert } from '../../hooks/AlertHook'
import { useWeather } from '../../hooks/WeatherHook'
import { IAlert } from '../../models/alertModels'
import { IWeatherCard } from '../../models/weatherCard'
import { IWeatherApi2 } from '../../models/weatherModel'
import LoadingComponent from '../../utils/loading/LoadingComponent'
import WeatherCardComponent from '../Weather/WeatherComponents/WeatherCardComponent'

type AlertConditionType = {
  city: string
  maxTemp: number
}

const FavoriteComponent = () => {

  const { user, logout, alert, setAlert } = useAuth()
  const { getWeatherData, setFavoriteItem, getFavoriteItem, getWeatherDataV2 } = useWeather()
  const { getAlerts, setNewAlert } = useAlert()
  const [cards, setCards] = React.useState<string[]>([])
  const [weatherCardsGroup, setWeatherCardsGroup] = React.useState<IWeatherCard[]>([])
  const [isFavorite, setIsFavorite] = React.useState<boolean>(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [alertConditionGroup, setAlertConditionGroup] = React.useState<AlertConditionType[]>([])
  const [timer, setTimer] = React.useState(0)

  React.useEffect(() => {
    updateCards()
    updateAlerts()
    handleTimer()
  }, [])



  React.useEffect(() => {
    handleRenderCards()
  }, [cards])




  React.useEffect(() => {
    setInterval(() => {
      updateCards()
      handleTimer()
    }, 10000)
  }, [])

  const updateCards = () => {
    setWeatherCardsGroup([])
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
          runAlert()
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
    setAlertConditionGroup([])
    const auxArray = cards.filter((city: any) => city !== cityDelete.city)
    const auxAlert = alertConditionGroup.filter((alert) => alert.city !== cityDelete.city)
    setFavoriteItem(user.email, auxArray.join())
    setNewAlert(user.email, auxAlert.join())
    updateCards()
    updateAlerts()

    const newLogin: IAlert = {
      open: true,
      label: "Removed from favorites",
      onClose: () => setAlert({ open: false }),
      severity: 'info'
    }
    setAlert(newLogin)
  }

  const updateAlerts = () => {
    const alerts = getAlerts(user.email)
    const auxAlerts = alerts.split(',')
    const auxConditionGroup: AlertConditionType[] = alertConditionGroup
    auxAlerts.map((alert: string) => {
      const auxSplit = alert.split('-')
      const auxCondition: AlertConditionType = {
        city: auxSplit[0],
        maxTemp: parseInt(auxSplit[1])
      }

      if (!auxConditionGroup.find((item) => item.city === auxCondition.city)) {
        auxConditionGroup.push(auxCondition)
      }
    })

    setAlertConditionGroup(auxConditionGroup)
  }



  const runAlert = () => {
    const temp = alertConditionGroup.forEach((alert) => {
      weatherCardsGroup.forEach((card) => {
        if (card.city === alert.city && card.temp > alert.maxTemp) {
          const newAlert: IAlert = {
            open: true,
            label: `the city ${card.city} has exceeded the temperature of ${alert.maxTemp}`,
            onClose: () => setAlert({ open: false }),
            severity: 'warning'
          }
          return setAlert(newAlert)
        }
      })
    })

  }
  const handleTimer = () => {
    let timeleft = 10;
    const downloadTimer = setInterval(function () {
      timeleft--;
      setTimer(timeleft);
      if (timeleft <= 0)
        clearInterval(downloadTimer);
    }, 1000);
  }
  return (
    <div> <p className='timer'> the weather will be updated in: <span className="countTimer">{timer}</span> Seconds</p>
      <div className='favorites-container'>
        {!loading ? weatherCardsGroup.map((card, key) =>
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
        ) : <LoadingComponent fullScreen={false} />}

      </div>
    </div>
  )
}

export default FavoriteComponent