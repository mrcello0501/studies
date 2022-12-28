async function wait(ms) {
  return new Promise((resolve, reject) => {
    return setTimeout(resolve, ms);
  });
}

module.exports = wait;
