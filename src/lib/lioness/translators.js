import curry from "lodash/curry";

export const tc = curry((interpolate, translate, message, scope = {}) => {
  return interpolate(translate(message), scope);
});

export const tcnp = curry((interpolate, translate, context, one, other, count, scope = {}) => {
  return interpolate(translate(context, one, other, count), scope);
});

const identity = x => x;

export const t = tc(identity);
