export type TimerCallback = (remaining: number) => void

export class GameTimer {
  private duration: number
  private remaining: number
  private startTime: number = 0
  private frameId: number | null = null
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
    this.startTime = performance.now()
    this.tick()
  }

  private tick = () => {
    const elapsed = Math.floor((performance.now() - this.startTime) / 1000)
    this.remaining = Math.max(0, this.duration - elapsed)
    this.onTick(this.remaining)

    if (this.remaining <= 0) {
      this._isRunning = false
      this.onComplete()
      return
    }

    this.frameId = requestAnimationFrame(this.tick)
  }

  pause() {
    this._isRunning = false
    if (this.frameId) {
      cancelAnimationFrame(this.frameId)
      this.frameId = null
    }
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
