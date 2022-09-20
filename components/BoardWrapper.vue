<template>
  <div class="board-wrapper">
    <div class="board-wrapper__header">
      <img class="board-wrapper__header-image" src="../assets/departures.svg" />
      Departures
    </div>
    <div class="board-wrapper__body">
      <BoardHeader />
      <BoardItem
        v-for="flight in flights"
        :key="flight.flightNumber"
        :flight="flight"
      />
      <template v-if="loading">
        <BoardItem v-for="index in 7" :key="index" :is-loading="true" />
      </template>
      <BoardForm v-if="areFlightsAvailable" />
    </div>
    <div v-if="apiError" class="board-wrapper__error">{{ apiError }}</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import BoardHeader from './BoardHeader.vue'
import BoardItem from './BoardItem.vue'
import BoardForm from './BoardForm.vue'

export default {
  components: {
    BoardHeader,
    BoardItem,
    BoardForm,
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapState({
      flights: (state) => state.flights || [],
      apiError: (state) => state.apiError,
    }),
    ...mapGetters(['areFlightsAvailable']),
  },
  async mounted() {
    await this.getFlights()
    this.loading = false
  },
  methods: {
    ...mapActions({
      getFlights: 'getFlights',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables.scss';

.board-wrapper {
  &__header {
    background-color: $lightYellow;
    font-weight: bold;
    font-size: 24px;
    display: flex;
    align-items: center;
    padding: 18px 16px;
    @include tablet {
      padding: 24px;
      font-size: 32px;
    }
    @include desktop {
      padding: 32px 40px;
      font-size: 42px;
    }
    &-image {
      height: 32px;
      width: 32px;
      margin-right: 24px;
      @include tabletAndDesktop {
        height: 48px;
        width: 48px;
      }
    }
  }
  &__body {
    background-image: linear-gradient(to right, $darkGrey, $black);
    padding: 16px;
    @include tablet {
      padding: 24px;
    }
    @include desktop {
      padding: 22px 40px;
    }
  }

  &__error {
    font-size: 24px;
    text-align: center;
    margin-top: 64px;
    font-weight: bold;
  }
}
</style>
