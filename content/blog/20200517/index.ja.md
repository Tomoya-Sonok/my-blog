---
title: RubyとPythonの比較
date: "2020-05-17"
tags: ["Ruby", "Python", "2020"]
disqus: true
---

Rubyに加えてPythonも学習し始めたので、それぞれの概念や書き方を混同しないように比較したものを書き残しておく。


## 概念における相違
`Ruby`は「プログラミングを楽しむ (Enjoy programming) 」という設計思想で作られており、コードが省略可能で色々な書き方ができる。それゆえに他の人が書いたコードはpythonに比べると可読性が低くなる可能性がある。

一方で`Python`は「The Zen of Python (どう訳すのが正解なんだろう..) 」に基づいており、「誰が書いても同じようなコードになる」というような、統一感を好む設計思想となっている。

たしかに、Rubyと違ってPythonではreturnを省略できなかったり、強制的にインデントを使用して書かなくてはいけなかったりと、Pythonはコーディングの際のルールがRubyよりも厳しめ。だが、その分Rubyよりも可読性が高いと感じる人が多いのは他サイトの比較まとめを読んでいても事実のようだ。

## 関数の宣言、実行
基本的な書き方は同じ。Pythonでは、関数名のあとに()を付ける。
### Ruby
```ruby
def greeting
  put "Hello, world!"
end

greeting
```

### Python
```python
def greeting():
    print("Hello, world!")

greeting()
```

## 条件分岐
if文の使い方も、さほど変わらない。`elsif`が`elif`になったり、Rubyで処理をスキップする時に使用する`next`がPythonでは`continue`になったりする。
### Ruby
```ruby
print "Enter a number! "
num = gets.to_i

if num > 8
  puts num.to_s + " is bigger than 8"
elsif num < 8
  puts num.to_s + " is smaller than 8"
else
  puts num.to_s + " is equal to 8"
end
```

### Python
```python
input_value = input("Enter a number! ")
num = int(input_value)

if int(num) > 8:
    print(str(num) + " is bigger than 8")
elif num < 8:
    print(str(num) + " is smaller than 8")
else:
    print(str(num) + " is equal to 8")
```

## 繰り返し処理
for文やwhile文など、共通で使用できるものに関してはほとんど同じ書き方で処理が行えるようだ。
### ruby
```ruby
# forを使用
for i in 1..8 do # doはあってもなくてもよい
  puts i
end

# whileを使用
num = 1
while num <= 8 do # doはあってもなくてもよい
  p num
  num += 1
end
```
（Rubyでは、他にも`times`や`upto`、`loop`などたくさんの繰り返し文が存在する）

### Python
```python
# forを使用
for i in range(1,8):
    print(i)

# whileを使用
num = 1
while num <= 8:
    print(num)
    num += 1
```

## 演算子
### Ruby
&& や || の他に and や or も使えるが、優先順位は && や || より低め。
```ruby
age = 22
if age >= 20 && age < 30
  puts "私は20代です"
end

pref = "Hiroshima"
if pref == "Osaka" || pref == "Hiroshima"
  puts "出身地は大阪か広島です"
end
```

### Python
and や or しか使えない。 & や | といったものも存在するが、ビット演算子なので同じような使い方はできない。（ビットとは`Binary degIT`のことで、整数を2進数で表示したときの一桁を表す）
```python
age = 22
if age >= 20 and age < 30:
    print("私は20代です")

pref = "Hiroshima"
if pref == "Osaka" or pref == "Hiroshima":
    print("出身地は大阪か広島です")

```

## クラスやインスタンス
Rubyの書き方に慣れているせいか一番覚えにくいのが、Pythonのクラス生成やメソッドの書き方である。どうやらPythonでは、クラス内のメソッド宣言には必ず引数が必要で、使わないにしても必ず`self`を引数として入れる。
### Ruby
```ruby
class Greeting
  def initialize(name) # 必須ではないがインスタンスの初期化によく使われる特殊メソッド
    @name = name
  end

  def say_hello
    puts "Hello, #{@name}!"
  end
end

greeting = Greeting.new("Tomoya")
greeting.say_hello
```

### Python
```python
class Greeting:
    def __init__(self, name): # コンストラクタ => インスタンス初期化を行う
        self.name = name

    def say_hello(self):
        print("Hello, " + self + "!")

    name = "Tomoya"
    say_hello(name)
```


## あとがき
Pythonの書き方は、ところどころrubyとJavaScript混ぜたみたいなのがあって面白いと思った。（関数名のあとに()付けるとことか、if分岐の`elif`がRubyの`elsif`とJavaScriptの`else if`の両方の雰囲気を併せもってるとことか）クラスでconstructorを使用してインスタンス初期化を行う部分は、最近開発で書いたReactと似てる部分があったり。

他にも、pythonには`tuple`と`list`というJavaScriptでいう`const`と`let`のようなものがあったり(全然イコールではないが笑)、Rubyとは違って比較演算子を連結できたりして非常に面白い。

これからも、Pythonに関する気づき等があればブログに書き残していく。

Tomoya

参考にした記事：  
[PythonとRubyの比較をよく聞かれるので明示するか略せるかが違うよという説明をまとめておいたPython](https://blog.hirokiky.org/entry/2019/02/06/120114)  
[initializeメソッド | Let's プログラミング](https://www.javadrive.jp/ruby/class/index5.html)  
