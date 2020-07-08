/**
 * First Fit Decreasing
 *
 * @param {number} capacity capacity of bin
 * @param {number} gap gap between items（eg: item, gap, item, gap ... item）
 * @param {Array} items items' sizes
 */
function firstFitDecreasing(capacity, gap, items) {
  // all the bins
  const bins = [];

  // calculate occupied space of bin
  const occupiedSpace = (bin) => {
    return bin.reduce((p, c) => p + c, 0) + (bin.length - 1) * gap;
  };

  // sort items in non-increasing order of their sizes
  items.sort((x, y) => y - x);

  items.forEach((size) => {
    // find the first bin that can accommodate the item
    const bin = bins.find((b) => occupiedSpace(b) + gap + size <= capacity);
    // found, place the item
    if (bin) {
      bin.push(size);
    }
    // not found, place the item within a new bin
    else {
      bins.push([size]);
    }
  });
  return bins;
}

/**
 * 判断两数组是否相等（不考虑数组内元素的顺序）
 */
function arrayEqualsIgnoreOrder(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false;
  }
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }

  const searched = [];
  for (let i = 0; i < a.length; i++) {
    const pos = b.findIndex((val, idx) => val === a[i] && searched.indexOf(idx) < 0);
    if (pos < 0) {
      return false;
    }
    searched.push(i);
  }
  return true;
}

/**
 * range(stop)，range(start, stop[, step])
 */
function range() {
  let start = 0;
  let stop = 0;
  let step = 1;

  const size = arguments.length;
  if (size === 1) {
    stop = arguments[0];
  } else if (size >= 2) {
    start = arguments[0];
    stop = arguments[1];
  } else if (size >= 3) {
    step = arguments[2];
  }

  const nums = [];
  for (let i = start; i < stop; i = i + step) {
    nums.push(i);
  }
  return nums;
}

class StringBuffer {
  data = [];

  append(val) {
    this.data.push(val);
    return this;
  }

  toString() {
    return this.data.join('');
  }
}

function round(x, scale) {
  if (
    typeof x !== 'number' ||
    isNaN(x) ||
    typeof scale !== 'number' ||
    isNaN(scale) ||
    scale % 1 != 0 ||
    scale < 0
  ) {
    return NaN;
  }

  const base = Math.pow(10, scale);
  return Math.round(x * base) / base;
}

function countOccurrences(items, equalsFn) {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  equalsFn =
    equalsFn ||
    function(a, b) {
      return a === b;
    };

  const result = [];
  items.forEach((item) => {
    let entry = result.find((entry) => equalsFn(entry.item, item));
    if (entry) {
      entry.count++;
    } else {
      result.push({ item: item, count: 1 });
    }
  });
  return result;
}

function toFloat(text) {
  if (typeof text === 'number') {
    return text;
  }

  if (typeof text === 'string') {
    if (!/^-?(([1-9]\d*)|0)(\.\d+)?$/.test(text)) {
      return NaN;
    }
    return parseFloat(text);
  }

  return NaN;
}

function toInt(text) {
  if (typeof text === 'number' && Number.isInteger(text)) {
    return text;
  }

  if (typeof text === 'string') {
    if (!/^-?[1-9]\d*$|^0$/.test(text)) {
      return NaN;
    }
    return parseInt(text);
  }

  return NaN;
}

function solve(stockLength, kerf, orders) {
  const patterns = countOccurrences(
    firstFitDecreasing(
      stockLength,
      kerf,
      orders.reduce((p, c) => {
        range(c.count).forEach(() => p.push(c.length));
        return p;
      }, [])
    ),
    arrayEqualsIgnoreOrder
  ).map((item) => ({ cuts: item.item, repetition: item.count }));

  return {
    stockLength,
    kerf,
    orders: orders.map((order) => ({ ...order })),
    layoutPatterns: patterns.map(({ repetition, cuts }) => {
      const totalParts = cuts.length;
      const totalPartsLength = cuts.reduce((prev, curr) => prev + curr, 0);
      const materialWaste = Math.max(stockLength - totalPartsLength - totalParts * kerf, 0);

      let cutWaste = (totalParts - 1) * kerf;
      cutWaste += Math.min(stockLength - totalPartsLength - cutWaste, kerf);

      return {
        repetition: repetition,
        cuts: countOccurrences(cuts).map((entry) => ({
          length: entry.item,
          count: entry.count,
        })),
        materialWaste: materialWaste,
        cutWaste: cutWaste,
      };
    }),
  };
}

export {
  firstFitDecreasing,
  range,
  StringBuffer,
  arrayEqualsIgnoreOrder,
  round,
  countOccurrences,
  toFloat,
  toInt,
  solve,
};
