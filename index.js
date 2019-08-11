const fifo = (
  inputs = [1, 2, 3, 4, 2, 1, 5, 6, 2, 1, 2, 3, 7, 6, 3, 2, 1, 2, 3, 6],
  size = 4
) => {
  let miss = 0;
  let hit = 0;
  let lastIndex = 0;

  const stack = new Array(size);
  const history = new Array(size);
  const hitIndexs = new Array();

  inputs.forEach((input, index) => {
    if (stack.indexOf(input) === -1) {
      miss = miss + 1;

      stack[lastIndex] = input;

      if (lastIndex < (size - 1)) {
        lastIndex = lastIndex + 1;
      } else {
        lastIndex = 0;
      }
    } else {
      hit = hit + 1;

      hitIndexs.push({
        input,
        index,
      });
    }

    for (let i = 0; i < size; i++) {
      if (!Array.isArray(history[i])) {
        history[i] = new Array();
      }

      history[i].push(stack[i]);
    }
  });

  Handlebars.registerHelper('itContains', (num, index) => {
    const found = hitIndexs.find((hit) => {
      return hit.index === index;
    });

    if (found) {
      if (found.input === num) {
        return `${num}*`;
      } else {
        return '';
      }
    } else {
      return num;
    }
  });

  const source = document.getElementById('rows').innerHTML;
  const template = Handlebars.compile(source);

  const html = template({
    inputs,
    miss,
    hit,
    hitIndexs,
    history,
  });

  document.querySelector('#result').innerHTML = html;
};
