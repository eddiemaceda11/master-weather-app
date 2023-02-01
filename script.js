// create a function that takes in a number
// return an array where the sum of 2 consecutive numbers === 3rd number

// const fibs = (n) => {
//   let array = [];
//   let sum = 0;
//   let num1 = 1;
//   let num2 = 1;

//   // [0, 1, 1, 2, 3...]
//   // num1 + num2;

//   for (let i = 0; i < n; i++) {
//     array.push(sum);
//     sum = num1;
//     num1 = num2;
//     num2 = sum + num1;
//   }
//   console.log(sum);
//   console.log(array);
// };

// fibs(8);
// let array = [];
// let sum = 0;
// let num1 = 1;
// let num2 = 1;

// const fibs = (n) => {
//   if (n <= 0) return;

//   array.push(sum);
//   sum = num1;
//   num1 = num2;
//   num2 = sum + num1;
//   console.log(`Sum: ${sum}`);
//   console.log(`Num1: ${num1}`);
//   console.log(`Num2: ${num2}`);
//   return fibs(n - 1);
// };

// fibs(8);
// console.log(array);

// MERGE SORT //

// recursive function that divides arr into 2 arrs
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);

  return merge(mergeSort(leftArr), mergeSort(rightArr));
};

// takes 2 arrs and sorts into 1 arr
const merge = (leftArr, rightArr) => {
  const output = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    const leftEl = leftArr[leftIndex];
    const rightEl = rightArr[rightIndex];

    if (leftEl < rightEl) {
      output.push(leftEl);
      leftIndex++;
    } else {
      output.push(rightEl);
      rightIndex++;
    }
  }

  return [
    ...output,
    ...leftArr.slice(leftIndex),
    ...rightArr.slice(rightIndex),
  ];
};

console.log(
  mergeSort([
    1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92,
  ])
);
