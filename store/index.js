import axios from 'axios'

export const state = () => ({
  flights: [],
  apiError: '',
})

export const getters = {
  areFlightsAvailable(state) {
    return state.flights.length > 0
  },
}

export const mutations = {
  receiveFlights(state, flights) {
    state.flights = flights
  },
  setApiError(state, errorMessage) {
    state.apiError = errorMessage
  },
}

export const actions = {
  async getFlights(context) {
    try {
      const flightsData = await axios.get(
        'https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata'
      )

      const sortedFlights =
        flightsData?.data?.allDepartures.sort(
          (a, b) =>
            Date.parse(a.estimatedDepartureDateTime) -
            Date.parse(b.estimatedDepartureDateTime)
        ) || []

      context.commit('receiveFlights', sortedFlights)
    } catch (err) {
      context.commit(
        'setApiError',
        `${err.response.status} ${err.response.statusText}`
      )
    }
  },
}
