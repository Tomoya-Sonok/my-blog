---
title: callbackについて
date: "2020-05-02"
tags: ["JavaScript", "2020"]
disqus: true
---

`callback関数`とは、`関数A`の引数としてさらに`関数B`を入れると、入れられた`関数B`は`callback関数`という扱いになり、`関数A`の処理の中の好きなタイミングで実行させることができるというものである。

文章で書いても理解しにくいので、実際にコードを書いてみる。

例えば、1から5を順に出力する次のような関数があったとする。

```js
function countUp(){
  console.log(1)
  console.log(2)
  console.log(3)
  console.log(4)
  console.log(5)
}

countUp()

// 出力
// 1
// 2
// 3
// 4
// 5

```

次に、`console.log(2)`を`setTimeout()`で2秒後に出力するよう以下のように編集。

```js
function countUp(){
  console.log(1)
  setTimeout(function () {
  console.log(2)
}, 2000) 
//setTimeout()は第2引数で
// 受け取った時間が過ぎた後に中の処理を実行する
console.log(3)
console.log(4)
console.log(5)
}

countUp()

// 出力
// 1
// 3
// 4
// 5
// 2 （2秒後に出力）

```

一般的にプログラムは上から順番に処理が実行されるが、このように「**3〜5を出力する処理は、2を出力する`setTimeout()`の処理を待ってはくれない**」

そこで登場するのが、**callback**という考え方である。

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

// 出力
// 1
// 2 （2秒後に出力）
// 3 （2秒後に出力）
// 4 （2秒後に出力）
// 5 （2秒後に出力）
```

**callback**をこのように使えば、1が出力されて2秒後にようやく2が出力され、そのあとに3から5が出力される。1から5まで順番に出力できるようになるのだ。

同じコードを見ながら、中で何が起きているのか順番に追ってみる。

```js
// with callback
console.log(1) // ① まず1が出力される 

function first(callback) { // ③ 関数の引数として渡されたsecond()はcallback関数となる
  setTimeout(function () {
    console.log(2) // ④ first()が実行され、2秒後に2を出力 
    callback() // ⑤ second()を実行 
  }, 2000)
}

function second() { // second() = callback()
  console.log(3)
  console.log(4)
  console.log(5)
}

first(second) // ② first()の引数としてsecond()を入れる 

// 出力
// 1
// 2 （2秒後に出力）
// 3 （2秒後に出力）
// 4 （2秒後に出力）
// 5 （2秒後に出力）
```

1が出力された後、`setTimeout()で2秒後に2を出力するfirst()`という関数の引数として`3〜5を出力するsecond()`という関数を入れる。入れられた`second()`は`callback関数`として、`first()`の中の処理の一部となる。つまり、上記のように引数で受け取った`callback()`（中身は**second()**）を`setTimeout()`の中に入れれば、`console.log(2)`と同じように2秒後に`callback()`が実行される。

なお、上記で`callback`と書いたが引数なので`callback`という名前である必要はない。

以下のような書き方でも同じように動作するはずだ。

```js
// with callback
console.log(1)

function first(hoge) { //callback => hoge
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

// 出力
// 1
// 2 （2秒後に出力）
// 3 （2秒後に出力）
// 4 （2秒後に出力）
// 5 （2秒後に出力）
```

Tomoya