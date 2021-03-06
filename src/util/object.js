import { assign, isArray } from "lodash";


export function* entries (obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

function _deepAssign (obj, keyPath, newVal) {
  const key = keyPath[0];
  const modified = assign({}, obj);
  if (keyPath.length === 1) {
    modified[key] = newVal;
  } else {
    modified[key] = _deepAssign(obj[key], keyPath.slice(1), newVal);
  }
  return modified;
}

export function deepAssign (obj, keyPath, newVal) {
  keyPath = isArray(keyPath) ? keyPath : keyPath.split(".");
  return _deepAssign(obj, keyPath, newVal);
}
