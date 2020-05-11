---
title: CORS通信とは
date: "2020-05-11"
tags: ["CORS", "Rails", "2020"]
disqus: true
---

今回のReact × Rails( API )プロジェクトで初めてCORSを知ったので、概要や使い方を忘れないようにメモしておく。

## CORSとは？
CORSは、**Cross Origin Resource Sharing**の略。
要は、開発しているAPIが通信を受け付けるリクエスト元（オリジン）を指定してあげることで、複数のドメインからリクエストを受けて通信できるようにするためのもの。

フロントエンドはReact、バックエンドはRails製APIのように切り分けて開発を行う場合に、Rails側でこのCORS設定をしてあげることによって、React側からAPIを叩けるようになる。

## どうやって使うのか
以前の[この記事](https://techguy10308blog.netlify.app/ja/20200510/)でReact × Rails (API)のサンプルプロジェクトを作成済みなので、今回はそれを使ってCORSの設定をしてみる。

まずは、`Gemfile`の中の`gem 'rack-cors'`がAPIモードだとデフォルトでコメントアウトされているので、コメントアウトを解除する。

Gemfile
```rb
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors' #ここのコメントアウトを解除

```

`bundle install`で無事に`rack-cors`というgemをインストールすると、`config/initializers/cors.rb`というファイルが自動生成される。
`config/application.rb`もしくはその`cors.rb`に以下の記述を追加。

```rb
# cors.rbに記述の際は、Rails.applicationをconfigの前に付ける！
config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000' # フロントエンドで使用
        # するドメインを記述。本番環境の場合はデプロイしたURLを貼る。
        resource '*',
        :headers => :any,
        :methods => [:get, :post, :patch, :delete, :options],
      end
    end
```

ログイン機能でsessionのデータをCookieに保存できるようにしたい場合は、以下の記述を追加。

```rb
config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000'
        resource '*',
        :headers => :any,
        :methods => [:get, :post, :patch, :delete, :options],
        credentials: true # ここの記述を追加
      end
    end
```

これで、`localhost:3000`からRails (API)の`localhost:3001`にリクエストを送ればレスポンスが返ってくるようになる。

Tomoya



 ## 参考にした記事：
[Ruby on Rails+ReactでCRUDを実装してみた](https://qiita.com/yoshimo123/items/9aa8dae1d40d523d7e5d)
[What is CORS | Codecademy](https://www.codecademy.com/articles/what-is-cors)
[CORSがよくわからないので解説してみた＆Rails APIでのCORS設定](https://qiita.com/mtoyopet/items/326ba62d485e9ef0dacd)
