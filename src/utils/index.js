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
 * 执行材料切割，并输出结果（使用文本表格显示）
 *
 * @param {number} material 材料长度
 * @param {number} losses 切割损耗
 * @param {Array} orders 订单（材料长度，所需数量）
 */
function cut_and_print(material, losses, orders) {
  // 订单二维数组转一维
  const detail = orders.reduce((p, c) => {
    range(c.count).forEach(() => p.push(c.length));
    return p;
  }, []);

  // 调用材料分割算法
  const result = [];
  firstFitDecreasing(material, losses, detail).forEach((solution) => {
    // 如果切割方案相同，则合并计数
    const item = result.find((item) => same_array(solution, item.solution));
    if (item) {
      item.count++;
    } else {
      result.push({ solution: solution, count: 1 });
    }
  });

  const sb = new StringBuffer();

  // 打印输入参数
  let table = [['序号', '尺寸', '数量']];
  orders.forEach((order, i) => {
    table.push([i + 1, order.length, order.count]);
  });
  let size_fn = function(r, c, v) {
    const size = `${v}`.length;
    return r === 0 ? size * 2 : size;
  };
  let alignment_fn = function(r, c) {
    return c === 2 ? 'right' : 'left';
  };
  sb.append('材料长度：')
    .append(material)
    .append('\n切割损耗：')
    .append(losses)
    .append('\n订单：\n')
    .append(text_table(table, size_fn, alignment_fn));

  // 打印切割方案
  table = [['序号', '尺寸', '余料', '数量']];
  const waste = {}; // length -> count
  result.forEach((r, i) => {
    const { solution, count } = r;
    const w = Math.max(
      material - solution.reduce((total, val) => total + val, 0) - solution.length * losses,
      0
    );
    if (w > 0) {
      waste[w] = (waste[w] ? waste[w] : 0) + count;
    }
    table.push([i + 1, solution.join(', '), w, count]);
  });
  alignment_fn = function(r, c) {
    return c === 2 || c === 3 ? 'right' : 'left';
  };
  sb.append('\n切割方法：共 ')
    .append(result.reduce((total, val) => total + val.count, 0))
    .append('根材料\n')
    .append(text_table(table, size_fn, alignment_fn))
    .append('\n');

  // 打印余料详情
  table = [['序号', '余料', '数量']];
  alignment_fn = function(r, c) {
    return c === 0 ? 'left' : 'right';
  };
  Object.keys(waste)
    .sort((a, b) => parseFloat(a) - parseFloat(b))
    .forEach((key, idx) => table.push([idx + 1, key, waste[key]]));
  sb.append('余料：\n').append(text_table(table, size_fn, alignment_fn));
  return sb.toString();
}

/**
 * 判断两数组是否相等（不考虑数组内元素的顺序）
 */
function same_array(a, b) {
  if (a.length != b.length) {
    return false;
  }
  const searched = [];
  for (let i = 0; i < a.length; i++) {
    const pos = b.findIndex((val, idx) => val === a[i] && searched.indexOf(idx) < 0);
    if (pos > -1) {
      searched.push(i);
    } else {
      return false;
    }
  }
  return true;
}

/**
 * 将二维数组输出为纯文本表格
 *
 * @param {Array} data 二维数组
 * @param {Function} size_fn function(r, c, v) {} 单元格宽度（默认字符长度）
 * @param {Function} alignment_fn function(r, c, v) {} 单元格对齐方式（left、right）（默认左对齐）
 */
function text_table(data, size_fn, alignment_fn) {
  if (typeof size_fn !== 'function') {
    size_fn = (r, c, v) => `${v}`.length;
  }
  if (typeof alignment_fn !== 'function') {
    alignment_fn = () => 'left';
  }

  // 计算出每列的宽度
  const width = [];
  data.forEach((row, rowIdx) => {
    row.forEach((cell, columnIdx) => {
      if (columnIdx + 1 > width.length) {
        width.push(0);
      }
      width[columnIdx] = Math.max(width[columnIdx], size_fn(rowIdx, columnIdx, cell));
    });
  });

  const border = '+-' + width.map((w) => '-'.repeat(w)).join('-+-') + '-+';

  const sb = new StringBuffer();
  data.forEach((row, r) => {
    sb.append(border).append('\n');
    row.forEach((cell, c) => {
      const alignment = alignment_fn(r, c, cell);
      sb.append('| ');
      const repeat = width[c] - size_fn(r, c, cell);
      if (alignment === 'left') {
        sb.append(cell).append(' '.repeat(repeat));
      } else {
        sb.append(' '.repeat(repeat)).append(cell);
      }
      sb.append(' ');
    });
    sb.append('|\n');
  });
  sb.append(border);
  return sb.toString();
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

export { firstFitDecreasing, cut_and_print, range, error, StringBuffer, same_array, round };
