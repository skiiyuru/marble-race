import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export default create(
  subscribeWithSelector((set) => {
    return {
      // Obstacles
      obstacleCount: 20,
      obstacleSeed: 0,

      // Timer
      startTime: 0,
      endTime: 0,

      // Phases
      phase: "ready",

      start: () => {
        set((state) => {
          if (state.phase === "ready") {
            return { phase: "playing", startTime: Date.now() }
          }
          return {}
        })
      },
      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended") {
            return { phase: "ready", obstacleSeed: Math.random() }
          }
          return {}
        })
      },
      end: () => {
        set((state) => {
          if (state.phase === "playing") {
            return { phase: "ended", endTime: Date.now() }
          }
          return {}
        })
      },
    }
  })
)
