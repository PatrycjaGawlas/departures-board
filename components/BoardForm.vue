<template>
  <v-main>
    <div class="board-form__title">Update flight status:</div>
    <v-autocomplete
      v-model="selectedFlightNumber"
      :items="flights"
      item-text="flightNumber"
      item-value="flightNumber"
      solo
      filled
      label="Choose flight number"
      :disabled="!flights"
      @change="handleFlightNumberUpdate"
    ></v-autocomplete>
    <v-select
      v-model="selectedFlightStatus"
      :items="flightStatuses"
      label="Select flight status"
      :disabled="!selectedFlightNumber"
      solo
      outlined
    ></v-select>
    <v-text-field
      v-if="selectedFlightStatus === 'Other'"
      v-model="otherFlightStatus"
      solo
      label="Flight status"
      clearable
    ></v-text-field>
    <v-btn
      depressed
      color="primary"
      :disabled="isButtonDisabled"
      @click="submitFlightStatus"
    >
      Submit
    </v-btn>
    <div v-if="isCurrentFlightUpdated" class="board-form__update-text">
      Flight {{ selectedFlightNumber }} is updated!
    </div>
  </v-main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      selectedFlightNumber: '',
      selectedFlightStatus: '',
      otherFlightStatus: '',
      isCurrentFlightUpdated: false,
      flightStatuses: ['Departed', 'Diverted', 'Delayed', 'Cancelled', 'Other'],
    }
  },
  computed: {
    ...mapState({
      flights: (state) => state.flights || [],
    }),
    isButtonDisabled() {
      return (
        (this.selectedFlightStatus === 'Other' && !this.otherFlightStatus) ||
        !this.selectedFlightStatus
      )
    },
  },
  methods: {
    ...mapMutations({
      updateFlights: 'receiveFlights',
    }),
    handleFlightNumberUpdate() {
      this.isCurrentFlightUpdated = false
    },
    submitFlightStatus() {
      const flightsToUpdate = JSON.parse(JSON.stringify(this.flights))
      const flightToUpdate = flightsToUpdate.find((flight) => {
        return flight.flightNumber === this.selectedFlightNumber
      })

      flightToUpdate.status =
        this.otherFlightStatus || this.selectedFlightStatus

      this.updateFlights(flightsToUpdate)
      this.isCurrentFlightUpdated = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables.scss';

.board-form {
  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    color: $white;
    @include tabletAndDesktop {
      font-size: 32px;
    }
  }
  &__update-text {
    color: $green;
    font-weight: bold;
    margin-top: 16px;
    font-size: 18px;
    @include tabletAndDesktop {
      font-size: 24px;
    }
  }
}
</style>
