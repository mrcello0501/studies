const wait = require("./wait");

async function main() {
  console.log("started");
  await wait(3000);
  console.log("finished");

  //   =====================

  console.log("testing on FOR loop: ");
  for (let i = 1; i <= 10; i++) {
    await wait(3000);
    console.log(`${i} row`);
  }
  console.log("finished");
}

main();
