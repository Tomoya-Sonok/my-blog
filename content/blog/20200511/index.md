---
title: What is CORS?
date: "2020-05-11"
tags: ["CORS", "Rails", "2020"]
disqus: true
---

Hi, I'm Tomoya.  How's it going guys?  
This time I'll be writing a memo about what CORS is and how to make use of it in Rails API mode.


## What is CORS?
CORS stands for "**Cross Origin Resource Sharing**". In a nutshell, it allows your application to recieve requests from external origins which are specified by CORS configuration.

If you're developing React as front-end and Rails (API) as back-end individually, you definitely need to configure CORS in RailsAPI in order to recieve requests from the React side of the project.

## How to configure

On [this post](https://techguy10308blog.netlify.app/20200510/), I've already created sample React × Rails (API) project. So I'm using the sample app to show how to configure CORS for its project.

First, let's install `rack-cors` to start off the CORS configuration.  
Uncomment `gem 'rack-cors'` in `Gemfile`, and run `bundle install`.

Gemfile
```rb
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors' # here

```

After installing `rack-cors`, you'll notice you have `cors.rb` in `config/initializers`. Add the configuration below.

```rb
config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000' # URL used for React-side
        resource '*',
        :headers => :any,
        :methods => [:get, :post, :patch, :delete, :options],
      end
    end
```

If you want to store session data with cookie, you also need to add `credentials: true` to the same file.

```rb
config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000'
        resource '*',
        :headers => :any,
        :methods => [:get, :post, :patch, :delete, :options],
        credentials: true # here
      end
    end
```

Now Rails (API) on `localhost:3001` can recieve requests from React on `localhost:3000` and surely return the certain response to the client (browser).

Tomoya

 ## Reference：  
[Ruby on Rails+ReactでCRUDを実装してみた](https://qiita.com/yoshimo123/items/9aa8dae1d40d523d7e5d)  
[What is CORS | Codecademy](https://www.codecademy.com/articles/what-is-cors)  
[CORSがよくわからないので解説してみた＆Rails APIでのCORS設定](https://qiita.com/mtoyopet/items/326ba62d485e9ef0dacd)
