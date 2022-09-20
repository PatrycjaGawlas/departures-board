import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vue from 'vue'
import Vuex from 'vuex'
import BoardForm from '@/components/BoardForm.vue'

const localVue = createLocalVue()

localVue.use(Vuex)
Vue.use(Vuetify)

describe('BoardForm', () => {
  let state
  let store
  let mutations
  let actions

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
    mutations = {
      receiveFlights: jest.fn(),
    }
    store = new Vuex.Store({
      state,
      actions,
      mutations,
    })
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BoardForm, { store, localVue })

    expect(wrapper.vm).toBeTruthy()
  })

  test('button is disabled if no data selected', () => {
    const wrapper = shallowMount(BoardForm, { store, localVue })

    const button = wrapper.find('v-btn-stub')

    expect(button.attributes('disabled')).toBeTruthy()
  })

  test('is calls receiveFlight mutation when call submitFlightStatus method', async () => {
    const wrapper = shallowMount(BoardForm, {
      data() {
        return {
          selectedFlightNumber: 'FR4088',
          selectedFlightStatus: 'Diverted',
        }
      },
      store,
      localVue,
    })

    await wrapper.vm.submitFlightStatus()

    expect(mutations.receiveFlights).toHaveBeenCalled()
  })
})
