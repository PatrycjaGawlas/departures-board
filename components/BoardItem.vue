<template>
  <div>
    <div class="board-item board-item--desktop">
      <span v-if="isLoading" class="board-item__item">{{ loadingText }}</span>
      <span v-else class="board-item__item">{{ departureTime }}</span>
      <span
        class="board-item__item board-item__item--yellow"
        :class="{ 'board-item__item--crossed': isDiverted }"
        >{{ cityName }}</span
      >
      <span class="board-item__item--narrow">{{ cityCode }}</span>
      <span class="board-item__item">{{ airlineName }}</span>
      <span class="board-item__item--narrow board-item__item--yellow">{{
        gateNumber
      }}</span>
      <span class="board-item__item">
        <FlightStatus :flight="flight" />
      </span>
    </div>
    <div class="board-item board-item--mobile">
      <span v-if="isLoading">{{ loadingText }}</span>
      <span class="board-item__item--narrow">{{ departureTime }}</span>
      <div class="board-item__item-section">
        <span class="board-item__item--yellow">{{ cityName }}</span>
        <span>{{ cityCode }}</span>
        <span>{{ airlineName }}</span>
      </div>
      <span
        class="board-item__item--narrow board-item__item--last board-item__item--yellow"
        >{{ mobileGateNumber }}</span
      >
      <div class="board-item__item--full">
        <FlightStatus :flight="flight" />
      </div>
    </div>
  </div>
</template>

<script>
import FlightStatus from './FlightStatus.vue'

export default {
  components: {
    FlightStatus,
  },
  props: {
    flight: {
      type: Object,
      default: () => ({}),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loadingText: 'Flights are loading...',
    }
  },
  computed: {
    departureTime() {
      const time = this.flight?.estimatedDepartureDateTime
        ? new Date(this.flight?.estimatedDepartureDateTime).toLocaleTimeString(
            'default',
            {
              hour: '2-digit',
              minute: '2-digit',
            }
          )
        : ''
      return time
    },
    cityName() {
      return this.flight?.arrivalAirport?.cityName || ''
    },
    cityCode() {
      return this.flight?.arrivalAirport?.code || ''
    },
    airlineName() {
      return this.flight?.airline?.name || ''
    },
    gateNumber() {
      return this.flight?.departureGate?.number || ''
    },
    isDiverted() {
      return this.flight?.status === 'Diverted'
    },
    mobileGateNumber() {
      return this.gateNumber ? 'Gate ' + this.gateNumber : ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables.scss';

.board-item {
  display: flex;
  align-items: center;
  border: 2px solid $white;
  padding: 18px;
  margin-bottom: 16px;
  border-radius: 10px;
  color: $white;
  font-size: 14px;
  font-weight: bold;
  flex-wrap: wrap;
  @include tablet {
    font-size: 18px;
    padding: 24px;
  }
  @include desktop {
    font-size: 24px;
    padding: 32px 32px 32px 64px;
  }
  &--desktop {
    display: none;
    @include tabletAndDesktop {
      display: flex;
    }
  }
  &--mobile {
    display: flex;
    justify-content: space-between;
    @include tabletAndDesktop {
      display: none;
    }
  }
  &__item {
    flex: 2;
    &-section {
      display: flex;
      flex-direction: column;
      flex: 2;
      align-items: center;
    }
    &--narrow {
      flex: 1;
    }
    &--full {
      margin-top: 16px;
      width: 100%;
    }
    &--last {
      display: flex;
      justify-content: flex-end;
    }
    &--yellow {
      color: $yellow;
    }
    &--crossed {
      text-decoration: line-through;
    }
  }
}
</style>
