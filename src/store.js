/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    stage: null,
    pomodoros: 0,
    timer: {
      playing: false,
      pomodoro: 25 * 60,
      short: 5 * 60,
      long: 10 * 60,
      time: null,
      obj: null,
    },
  },
  getters: {
    state(state) {
      return state;
    },
    stage(state) {
      return state.stage;
    },
    timer(state) {
      return state.timer;
    },
    getPomodoro(state) {
      return state.timer.pomodoro / 60;
    },
    getShort(state) {
      return state.timer.short / 60;
    },
    getLong(state) {
      return state.timer.long / 60;
    },
    pomodoros(state) {
      return state.pomodoros;
    },
    time(state) {
      if (state.timer.time === null) {
        state.timer.time = state.timer.pomodoro;
      }

      const time = state.timer.time;
      // format time for output
      let minutes = parseInt(time / 60, 10);
      let seconds = parseInt(time % 60, 10);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      return `${minutes}:${seconds}`;
    },
  },
  mutations: {
    setTimes(state, obj) {
      if (obj.pomodoro !== null) {
        state.timer.pomodoro = obj.pomodoro * 60;
      }
      if (obj.short !== null) state.timer.short = obj.short * 60;
      if (obj.long !== null) state.timer.long = obj.long * 60;
    },
    setStage(state, value) {
      state.stage = value;
    },
    setPomodoros(state, value) {
      state.pomodoros = value;
    },
    startTime(state) {
      // if new timer, set stage to pomodoro
      if (state.stage === null) {
        state.stage = 'pomodoro';
        state.timer.time = state.timer.pomodoro;
      }
      if (state.timer.playing === false) {
        state.timer.playing = true;
        state.timer.obj = setInterval(() => {
          if (state.timer.time <= 0) {
            state.timer.time = 0;
          } else {
            state.timer.time -= 1;
          }
        }, 1000);
      } else {
        state.timer.playing = false;
        clearInterval(state.timer.obj);
      }
    },
    nextTimer(state) {
      if (state.stage === 'pomodoro') {
        state.timer.time = state.timer.pomodoro;
      } else if (state.stage === 'short') {
        state.timer.time = state.timer.short;
      } else {
        state.timer.time = state.timer.long;
      }
    },
    reset(state) {
      state.timer.playing = false;
      state.timer.time = state.timer.pomodoro;
      state.pomodoros = 0;
      state.stage = null;
      clearInterval(state.timer.obj);
    },
  },
});

export default store;
