import { Position, Toaster } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = Toaster.create({
    className: "message-toaster",
    position: Position.BOTTOM,
});