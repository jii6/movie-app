<template>
  <div>
    <v-text-field
      v-model="title"
      outlined
      @keypress.enter="searchMovies"
    >
    <template v-slot:prepend-inner>
      <v-icon>search</v-icon>
    </template>
    <template v-slot:append>
      <v-progress-circular
        v-if="loading"
        indeterminate
        size="24"
        color="primary"
      ></v-progress-circular>
    </template>
    </v-text-field>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    title:{
      get () {
        return this.$store.state.movie.title
      },
      set (title) {
        this.$store.commit('movie/updateState',{
          title
        })
      }
    },
    loading () {
      return this.$store.state.movie.loading
    }
  },
  methods: {
    ...mapActions('movie', [
      'searchMovies'
    ])
  }
}
</script>