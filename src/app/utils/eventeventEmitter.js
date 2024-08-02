import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

export const emitAudioStatusChange = (status) => {
  eventEmitter.emit("audioStatusChange", status);
};

export const onAudioStatusChange = (listener) => {
  eventEmitter.on("audioStatusChange", listener);
};
