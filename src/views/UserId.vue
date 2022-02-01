<template>
  <div class="about">
    <UserIdComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import UserIdComponent from '@/components/UserIdComponent.vue'

export default {
  name: 'UserId',
  components: {
    UserIdComponent
  }
}
</script>
