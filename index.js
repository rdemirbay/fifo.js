const fifo = (
  inputs = [1, 2, 3, 4, 2, 1, 5, 6, 2, 1, 2, 3, 7, 6, 3, 2, 1, 2, 3, 6],
  size = 4
) => {
  let miss = 0;
  let hit = 0;
  let lastIndex = 0;

  const stack = new Array(size);
  const history = new Array(size);

  inputs.forEach((input) => {
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
    }

    for (let i = 0; i < size; i++) {
      if (!Array.isArray(history[i])) {
        history[i] = [];
      }

      history[i].push(stack[i]);
    }
  });

  const source = document.getElementById('rows').innerHTML;
  const template = Handlebars.compile(source);
  const html = template({
    miss,
    hit,
    history,
  });

  document.querySelector('.result').innerHTML = html;
};
