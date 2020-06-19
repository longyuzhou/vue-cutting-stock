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
    const pos = b.findIndex(
      (val, idx) => val === a[i] && searched.indexOf(idx) < 0
    );
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

const error = (s) => {
  window.$.confirm({
    title: '错误',
    content: s,
    type: 'red',
    draggable: false,
    buttons: {
      close: {
        text: '知道了',
        action: function() {},
      },
    },
  });
};

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

export {
  firstFitDecreasing,
  range,
  error,
  StringBuffer,
  arrayEqualsIgnoreOrder,
  round,
  countOccurrences,
};
