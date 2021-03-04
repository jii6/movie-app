import axios from 'axios'

export default ({
  namespaced: true,
  state: () => ({
    title: '',
    loding: false,
    movies: []
  }),
  mutations: {
    // updateTitle (state, title) {
    //   state.title = title
    // },
    // updateLoading () {

    // },
    updateState (state, payload) {
      Object.keys(payload).forEach(key=> {
        state[key] = payload[key]
      })
    },
    pushIntoMovies (state, movies) {
      state.movies.push(...movies)
    }
  },
  actions: {
    async fetchMovies({ state, commit }, pageNum) {
      const promise = new Promise(resolve => {
        const res = axios.get(`http://www.omdbapi.com/?apikey=4e19f157&s=${state.title}&page=${pageNum}`) 
        resolve(res)
      })
      return promise.then(res => res.data)
    },
    // fetchMovies({state, commit}, pageNum){
    //   return new Promise( async resolve => {
    //     const res = await axios.get(`http://www.omdbapi.com/?apikey=4e19f157&s=${state.title}&page=${pageNum}`) 
    //     commit('pushIntoMovies', res.data.Search)
    //     resolve(res.data)
    //   })
    // },
    async searchMovies({ commit, dispatch }) {
      //state.loading = true
      commit('updateState', {
        loading: true,
        movies: []
      })
      const { totalResult } = await dispatch('fetchMovies', 1)
      const pageLength = Math.ceil(totalResult /10)
      
      if (pageLength > 1) {
        for (let i = 2; i <= pageLength; i+=1 ) {
          if (i>4) break
          await dispatch('fetchMovies', i)
        }
      }
      //state.loading = false
      commit('updateState', {
        loading: false
      })
    }
  }
})
