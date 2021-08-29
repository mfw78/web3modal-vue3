export class EventController {
  _eventCallbacks: any[]
  constructor() {
    this._eventCallbacks = []
  }

  on(eventCallback: any) {
    this._eventCallbacks.push(eventCallback)
  }

  off(eventObj: { callback: any; event: any }) {
    // remove specific event callback
    if (eventObj) {
      if (eventObj.callback) {
        this._eventCallbacks = this._eventCallbacks.filter(
          (eventCallback) =>
            eventCallback.event !== eventObj.event ||
            eventCallback.callback !== eventObj.callback
        )
      } // No callback to remove, remove entire event
      else {
        this._eventCallbacks = this._eventCallbacks.filter(
          (eventCallback) => eventCallback.event !== eventObj.event
        )
      }
    } else {
      this._eventCallbacks = []
    }
  }

  trigger(event: any, result?: any) {
    const eventCallbacks = this._eventCallbacks.filter(
      (eventCallback) => eventCallback.event === event
    )

    if (eventCallbacks && eventCallbacks.length) {
      eventCallbacks.forEach((eventCallback) => {
        eventCallback.callback(result)
      })
    }
  }
}
