import React from 'react'

export const useAlert= () => {


const setNewAlert = (email: string, value: string) => {
    localStorage.setItem(`${email}-Alerts`, JSON.stringify(value))
}


const getAlerts = (email: string) => {
    const alerts = localStorage.getItem(`${email}-Alerts`)
    if(alerts) {
        const data = JSON.parse(alerts)
        return data
    }
}

const reloadAlert = (email: string) => {
    return localStorage.getItem(`${email}-Alerts`)
}
  return {
    setNewAlert,
    getAlerts,
    reloadAlert
  }
}

