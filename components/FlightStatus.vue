<template>
  <div v-if="flightStatusText" class="flight-status">
    <div
      class="flight-status__indicator"
      :class="['flight-status__indicator--' + flightStatus]"
    ></div>
    <div
      class="flight-status__content"
      :class="['flight-status__content--' + flightStatus]"
    >
      {{ flightStatusText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flight: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    flightStatus() {
      let status = ''
      const dataStatus = this.flight?.status?.toLowerCase() || ''

      if (dataStatus.includes('go to gate')) {
        status = 'goToGate'
      } else if (
        dataStatus.includes('departing at') ||
        dataStatus.includes('wait in') ||
        dataStatus.includes('scheduled')
      ) {
        status = 'wait'
      } else if (dataStatus.includes('final call')) {
        status = 'finalCall'
      } else if (dataStatus.includes('cancelled')) {
        status = 'cancelled'
      }
      return status
    },
    flightStatusText() {
      return this.flight.status
    },
  },
}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables.scss';

.flight-status {
  display: flex;
  &__content {
    padding: 10px 28px 10px 16px;
    border-radius: 0 20px 20px 0;
    background-color: $white;
    color: $orange;
    width: fit-content;
    &--goToGate,
    &--wait,
    &--cancelled {
      color: $lightBlack;
    }
    &--finalCall {
      color: $green;
    }
  }
  &__indicator {
    width: 8px;
    background-color: $orange;
    border-radius: 5px 0 0 5px;
    &--goToGate {
      background-color: $blue;
    }
    &--wait {
      background-color: $lightYellow;
    }
    &--finalCall {
      background-color: $green;
    }
    &--cancelled {
      background-color: $red;
    }
  }
}
</style>
