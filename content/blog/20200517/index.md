---
title: Ruby and Python
date: "2020-05-17"
tags: ["Ruby", "Python", "2020"]
disqus: true
---

Recently I just started learning Python and got confused by how similar the way it's written is to the one Ruby is written. So this time I'll be taking a note of comparison between Ruby and Python.

## Conceptual difference
`Ruby` is designed for the concept "Enjoy programming.", which let you write codes in various ways and have more freedom on coding Ruby than any other programming languages. Instead, the more freely you code, the less readable your code gets on coding Ruby.

On the other hand, `Python` is designed for the concept "The Zen of Python", which leads every Python code to look similar because of the strict rules or syntax.


## Declaration and execution of function
Python requires you to put `()` right after the function name when either declaring or executing it. On the contrary, Ruby doesn't.
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

## If statement
The ways both Ruby and Python recognize `if statement` are quite similar as you see below. (`elsif => elif`, `next => continue`, etc..)

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

## Loops
Ruby and Python has quite much syntax in common when it comes to Loops like `for loop` and `while loop` below. 

### ruby
```ruby
# for loop
for i in 1..8 do # do is omittable
  puts i
end

# while loop
num = 1
while num <= 8 do # do is omittable
  p num
  num += 1
end
```
（Ruby has more sorts of loops such as `times`, `upto`, `loop`, etc..）

### Python
```python
# for loop
for i in range(1,8):
    print(i)

# while loop
num = 1
while num <= 8:
    print(num)
    num += 1
```

## Operator
### Ruby

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

```python
age = 22
if age >= 20 and age < 30:
    print("私は20代です")

pref = "Hiroshima"
if pref == "Osaka" or pref == "Hiroshima":
    print("出身地は大阪か広島です")

```

## Class and Instance
How to declare and generate instance in Python is something I'm not familiar with. You need to put in `self` as an argument of methods.

### Ruby
```ruby
class Greeting
  def initialize(name)
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
    def __init__(self, name):
        self.name = name

    def say_hello(self):
        print("Hello, " + self + "!")

    name = "Tomoya"
    say_hello(name)
```


## P. S.
The we code Python has some mashup-ish syntax of Ruby and JavaScript, which I found really interesting. ( like putting () after functions, `elif` can look like JavaScript's `else if` turns into Ruby's `elsif` and ends up with being `elif` ) Also, I somehow feel similarity on how Python use constructor to initialize a instance because I've been writing a similar one on React recently.

Python has `tuple` and `list` which work in a similar ways of `const` and `let` in JavaScript. There must be more interesting points that I haven't make on this post.

I'll keep look for those similarities on the journey of mastering Python and Ruby.

Tomoya