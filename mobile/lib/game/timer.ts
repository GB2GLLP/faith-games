export type TimerCallback = (remaining: number) => void

export class GameTimer {
  private duration: number
  private remaining: number
  private startTime: number = 0
  private intervalId: ReturnType<typeof setInterval> | null = null
  private onTick: TimerCallback
  private onComplete: () => void
  private _isRunning = false

  constructor(duration: number, onTick: TimerCallback, onComplete: () => void) {
    this.duration = duration
    this.remaining = duration
    this.onTick = onTick
    this.onComplete = onComplete
  }

  get isRunning() {
    return this._isRunning
  }

  start() {
    if (this._isRunning) return
    this._isRunning = true
    this.startTime = Date.now()

    this.intervalId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000)
      this.remaining = Math.max(0, this.duration - elapsed)
      this.onTick(this.remaining)

      if (this.remaining <= 0) {
        this._isRunning = false
        this.clearInterval()
        this.onComplete()
      }
    }, 200)
  }

  private clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  pause() {
    this._isRunning = false
    this.clearInterval()
    this.duration = this.remaining
  }

  reset(newDuration?: number) {
    this.pause()
    this.duration = newDuration ?? this.duration
    this.remaining = this.duration
    this.onTick(this.remaining)
  }

  destroy() {
    this.pause()
  }
}
