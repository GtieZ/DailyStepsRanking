<template>
  <div class="home">
    <RankingComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import RankingComponent from '@/components/RankingComponent.vue'

export default {
  name: 'Ranking',
  components: {
    RankingComponent
  }
}
</script>
