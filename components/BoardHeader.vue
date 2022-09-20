<template>
  <div class="board-header">
    <span class="board-header__item">Departure time</span>
    <span class="board-header__item">City name</span>
    <span class="board-header__item--narrow">Code</span>
    <span class="board-header__item">Airline</span>
    <span class="board-header__item--narrow">Gate</span>
    <span class="board-header__item">Status</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables.scss';

.board-header {
  background-image: linear-gradient(to right, $white, $grey);
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
  margin-bottom: 34px;
  padding: 16px 0;
  display: none;
  @include tablet {
    padding: 16px;
  }
  @include tabletAndDesktop {
    display: flex;
  }
  @include desktop {
    font-size: 18px;
    padding: 16px 32px 16px 64px;
  }
  &__item {
    flex: 2;
    &--narrow {
      flex: 1;
    }
  }
}
</style>
