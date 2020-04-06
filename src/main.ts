const isHas = [1, 2, 3].includes(2);

const p = new Promise((resolve, reject) => {
  resolve(100);
}).then((res) => {
  console.log("res----------", res);
});

function func() {
  return new Promise((resolve, reject) => {
    let sino = parseInt((Math.random() * 6 + 1).toString());
    setTimeout(() => {
      resolve(sino);
    }, 3000);
  });
}
async function test() {
  let n = await func();
  console.log(n);
}
test();

console.log(242)

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept();
    }
}
