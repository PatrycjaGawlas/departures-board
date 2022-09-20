import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BoardWrapper from '@/components/BoardWrapper.vue'
import BoardItem from '@/components/BoardItem.vue'
import BoardForm from '@/components/BoardForm.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('BoardWrapper', () => {
  let state
  let store
  let actions
  let getters

  beforeEach(() => {
    state = {
      flights: [
        {
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
        },
        {
          flightDirection: 'departure',
          scheduledDepartureDateTime: '2022-08-22T12:10:00',
          scheduledArrivalDateTime: '2022-08-22T01:00:00',
          estimatedDepartureDateTime: '2022-08-22T12:10:00',
          actualDepartureDateTime: null,
          arrivalAirport: {
            name: 'Faro Airport',
            cityName: 'Faro',
            countryName: 'Portugal',
            code: 'FAO',
          },
          departureAirport: {
            name: 'Manchester Airport',
            cityName: 'Manchester',
            countryName: 'United Kingdom',
            code: 'MAN',
          },
          flightNumber: 'FR4088',
          airline: {
            name: 'Ryanair',
            code: 'FR',
          },
          departureGate: {
            name: 'Gate 48',
            number: '48',
            action: 'Gate Open',
          },
          arrivalTerminal: null,
          departureTerminal: '3',
          status: 'Go to Gate 48',
        },
      ],
    }

    actions = {
      getFlights: jest.fn(),
    }

    getters = {
      areFlightsAvailable: jest.fn().mockImplementationOnce(() => true),
    }

    store = new Vuex.Store({
      actions,
      state,
      getters,
    })
  })

  test('is a Vue instance', () => {
    const wrapper = shallowMount(BoardWrapper, { store, localVue })
    expect(wrapper.vm).toBeTruthy()
  })

  test('it displays BoardForm component if flight data is available', () => {
    const wrapper = shallowMount(BoardWrapper, { store, localVue })

    const boardForm = wrapper.findComponent(BoardForm)

    expect(boardForm.exists()).toBe(true)
  })

  test('it displays correct number of BoardItem components', () => {
    const wrapper = shallowMount(BoardWrapper, {
      store,
      localVue,
      data() {
        return {
          loading: false,
        }
      },
    })

    const boardItemComponents = wrapper.findAllComponents(BoardItem)

    expect(boardItemComponents).toHaveLength(2)
  })

  test('it displays error message if error exists', () => {
    state.apiError = 'Test error'

    store = new Vuex.Store({
      state,
      actions,
      getters,
    })
    const wrapper = shallowMount(BoardWrapper, { store, localVue })

    const errorMessage = wrapper.find('.board-wrapper__error')

    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toContain('Test error')
  })
})
