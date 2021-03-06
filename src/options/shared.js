import path from "path";

import { isObject, isArray } from "lodash";


/* eslint-disable no-console */
export function getLogger (verbosity) {
  return {
    error: (...msgs) => console.error("ERROR:", ...msgs) || true,
    warn: verbosity >= 1 ? (...msgs) => console.warn("WARNING:", ...msgs) || true : () => false,
    info: verbosity >= 2 ? (...msgs) => console.info("INFO:", ...msgs) || true : () => false,
    debug: verbosity >= 3 ? (...msgs) => console.log("DEBUG:", ...msgs) || true : () => false
  };
}
/* eslint-enable no-console */

export const shared = [{
  key: "log",
  default: () => getLogger(1),
  schema: isObject,

  flagType: "count",
  flags: ["verbose", "v"],
  flagTransform: getLogger,
  cmdOpts: { global: true },

  description: {
    short: "Compiler verbosity (sent to STDOUT).",
    full: "TODO"
  }
}, {
  key: "config",

  flagType: "string",
  flags: ["config", "c"],
  cmdOpts: { global: true },

  description: {
    short: "Path to Interlock config file.",
    full: "TODO"
  }
}, {
  key: "presets",
  default: () => [],
  schema: presets => {
    return isArray(presets) && presets.reduce((isValid, preset) => {
      return isValid && isObject(preset);
    }, true);
  },

  flags: ["preset"],
  flagType: "string",
  // eslint-disable-next-line global-require
  flagTransform: (val, cwd) => require(path.resolve(cwd, val)),
  cmdOpts: { global: true },

  description: {
    short: "Pull in pre-determined Interlock configuration options.",
    full: "TODO"
  }
}];
