import { shallowMount } from '@vue/test-utils'
import FlightStatus from '@/components/FlightStatus.vue'

describe('FlightStatus', () => {
  const testFlight = {
    flightDirection: 'departure',
    scheduledDepartureDateTime: '2022-08-22T12:10:00',
    scheduledArrivalDateTime: '2022-08-22T01:00:00',
    estimatedDepartureDateTime: '2022-08-22T12:55:00',
    actualDepartureDateTime: null,
    arrivalAirport: {
      name: 'Guernsey Airport',
      cityName: 'Guernsey',
      countryName: 'United Kingdom',
      code: 'GCI',
    },
    departureAirport: {
      name: 'Manchester Airport',
      cityName: 'Manchester',
      countryName: 'United Kingdom',
      code: 'MAN',
    },
    flightNumber: 'GR671',
    airline: {
      name: 'Aurigny Air Services',
      code: 'GR',
    },
    departureGate: {
      name: 'Gate 38',
      number: '38',
      action: '0',
    },
    arrivalTerminal: null,
    departureTerminal: '3',
    status: 'Departing at 12:55',
  }

  test('is a Vue instance', () => {
    const wrapper = shallowMount(FlightStatus, {
      propsData: {
        flight: testFlight,
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('it applies correct css class for text color', () => {
    const wrapper = shallowMount(FlightStatus, {
      propsData: {
        flight: testFlight,
      },
    })

    const textWrapper = wrapper.find('.flight-status__content')
    expect(textWrapper.classes()).toContain('flight-status__content--wait')
  })

  test('it applies correct css class for decoration', () => {
    const wrapper = shallowMount(FlightStatus, {
      propsData: {
        flight: testFlight,
      },
    })

    const textWrapper = wrapper.find('.flight-status__indicator')
    expect(textWrapper.classes()).toContain('flight-status__indicator--wait')
  })
})
