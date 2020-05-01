---
title: callback function
date: "2020-05-02"
tags: ["JavaScript", "2020"]
disqus: true
---


Recently I often use `callback function` on my React × RailsAPI project.  

### What is callback function?
It's not easy to explain what it is only with words but I'd say something like this...

> Callback function is a function which is going to be executed inside of another function. For example, if you put `functionB` as an argument of `functionA`, `functionB` becomes `callback function`, which means you can run `functionB` inside of `functionA` as it works better sometimes.

Well, I'm gonna describe how it works with actual codes.

Here is the function which outputs numbers from 1 to 5.

```js
function countUp(){
  console.log(1)
  console.log(2)
  console.log(3)
  console.log(4)
  console.log(5)
}

countUp()

// output
// 1
// 2
// 3
// 4
// 5

```

Next, let us add `setTimeout()` to put off `console.log(2)` for 2 seconds.

```js
function countUp(){
  console.log(1)
  setTimeout(function () {
  console.log(2)
}, 2000) // 2000ms = 2s
// the second argument of setTimeout()
// is going to be how long the execution is delayed
console.log(3)
console.log(4)
console.log(5)
}

countUp()

// output
// 1
// 3
// 4
// 5
// 2 （in 2s）

```

As you see now, just because programs are read from the top doesn't mean each program will be executed in right order.（from the top to bottom）

In rules of this JavaScript, `console.log(3)〜(5)` doesn't wait `console.log(2)` to be executed. Therefore, you need this `callback function`.


```js
// with callback
console.log(1)

function first(callback) {
  setTimeout(function () {
    console.log(2)
    callback()
  }, 2000)
}

function second() {
  console.log(3)
  console.log(4)
  console.log(5)
}

first(second)

// output
// 1
// 2 （in 2s）
// 3 （in 2s）
// 4 （in 2s）
// 5 （in 2s）
```

With this `callback function` technique, you can run `console.log(3)〜(5)` after `console.log(2)` is executed!

Let's take a close look at the same code together.

```js
// with callback
console.log(1) // ① executed 

function first(callback) { // ③ second() given as an argument is callback function now
  setTimeout(function () {
    console.log(2) // ④ As first() was called, output 2 in 2s
    callback() // ⑤ second() is now executed as callback function inside of first()
  }, 2000)
}

function second() { // second() = callback()
  console.log(3)
  console.log(4)
  console.log(5)
}

first(second) // ② put second() as an argument of first() 

// output
// 1
// 2 （in 2s）
// 3 （in 2s）
// 4 （in 2s）
// 5 （in 2s）
```

After `console.log(1)` is executed, `first()` is called with `second()` as an argument.（which means `second()` is `callback function` here）As `callback function` can be used inside of a function, `first()` can run `second()` after `console.log(2)`.

This is how `callback function` works!

By the way, I wrote `callback` to make it easy to understand. You don't have to name the argument `callback`.

So you can write a code like this and it should work as well.


```js
// with callback
console.log(1)

function first(hoge) { // callback => hoge
  setTimeout(function () {
    console.log(2)
    hoge() //callback() => hoge()
  }, 2000)
}

function second() {
  console.log(3)
  console.log(4)
  console.log(5)
}

first(second)

// output
// 1
// 2 （in 2s）
// 3 （in 2s）
// 4 （in 2s）
// 5 （in 2s）
```

Tomoya