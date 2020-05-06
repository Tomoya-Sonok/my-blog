---
title: bcrypt（Rails）
date: "2020-05-04"
tags: ["bcrypt", "2020"]
disqus: true
---

I used **bcrypt** on Rails(API) project and it wasn't easy to figure out how it works. So I'll take a note of it.

Saving a password which users type in a form directly to the DataBase is really dangerous. So "bcrypt" uses something called `hashing function` to encrypt the password which users type in.


### What is hashing function?

**hashing function** is a function that can get a data which has fixed length of string, regardless of the original length of the string.

If a string gets encrypted through hashing function...

 - the encrypted string will never return to be the original string
 - only the original string can get the same encrypted random string(called `hash value`) from hashing function
 - a typed string can be approved only if its `hash value` is the same as the original string 


This bcrypt uses more techniques such as `salt` and `key stretching` and more. If you want to know more, I guess [this article](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/) will help you.

To use bcrypt on your rails application, it is really simple and easy. ( **If you are using `devise` for login-related features, bycrypt is already installed as default**)

### How to use
1. If not using `devise`, you need to install bycrypt with `Gemfile`

```shell
gem 'bcrypt'
bundle install
```

2. This time you're going to encrypt password, so generate the `User model` as you usually do. Please note that the `password` column should be **password_digest**. You'll see how important it is later on.

```shell
rails g model User name:string email:string password_digest:string
```

3. After generating User model, run `rails db:migrate`.

```shell
rails db:migrate
```

4. [important!] You need to write **has_secure_password** in `user.rb` like this. This method can be executable once you install **bcrypt**. This '**has_secure_password**' will encrypt the password and put it into `password_digest` column.

```shell
class User < ApplicationRecord
  has_secure_password
end
```

Now your application is ready to use bcrypt!
A string which gets put into `password` column is going to be encrypted by **hashing function**, and the encrypted string will be saved on Database. A random string encrypted by hashing function is called **hash value**.

When a user want to login or edit his password, the application will check if the hash value for what he typed corresponds the one on Database. If corresponded, the user can finally login and edit the user information.

Thanks for reading, guys.

Tomoya