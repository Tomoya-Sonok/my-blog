---
title: Docker使ってReact × Rails(API)の環境構築
date: "2020-05-10"
tags: ["React", "Rails", "2020"]
disqus: true
---

現在チーム開発中のアプリをデプロイするにあたり、環境構築した時のことを思い出せるようなものがあったほうがいいと思ったのでメモ。

同じ仕様の仮アプリを作成する流れで実際に行なった手順をまとめてみる。
（ところどころ改善の余地がある記載があるが、自分用メモなのでご理解いただきたい。ソースの方を読みたい方は、一番下の参考記事までどうぞ）

### 前提
 - Dockerhubアカウント作成済み
 - 本当に環境構築のみなので、DB作成やCORS通信の設定などは含まない

### 手順
まずは、使用するディレクトリを作成して、移動。

```terminal
mkdir sample_app
cd sample_app
```

その中に、以下の4つのファイルを用意。

```
Dockerfile
entrypoint.sh
Gemfile
Gemfile.lock
```

それぞれ、以下のように記述。

Dockerfile
```Dockerfile
FROM ruby:2.6.5
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /sample_app 
WORKDIR /sample_app
COPY Gemfile /sample_app/Gemfile
COPY Gemfile.lock /sample_app/Gemfile.lock
RUN bundle install
COPY . /sample_app

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3001

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
```

entrypoint,sh
```sh
#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
```

Gemfile
```Gemfile
source 'https://rubygems.org'
ruby '2.6.5' # 使用したいバージョンを記載
gem 'rails', '< 6.0' # 使用したいバージョンを記載
```

Gemfile.lock
---> 空でOK

Dockerfileがちゃんとビルドできるか、確認してみる。
「docker build [ -t ｛イメージ名｝ [ :｛タグ名｝ ] ] ｛Dockerfileのあるディレクトリ｝」を実行。

```terminal
docker build -t tomoya/sample_image .
```

「docker images」コマンドで作成したイメージがあればOK。

次に、docker-compose.ymlを作成。

docker-compose.yml
```yml
version: "3"
services:
  db:
    image: mariadb # MySQLを使用する場合は、mariadb => mysql
    command: mysqld --character-set-server=utf8 --collation-server=utf8_unicode_ci
    environment:
      MYSQL_DATABASE: "sample_app_development"
      MYSQL_ROOT_PASSWORD: "password"
    volumes:
      - mysql-data:/var/lib/mysql/data
      - /tmp/dockerdir:/etc/mysql/conf.d/
    ports:
      - 3306:3306
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3001 -b '0.0.0.0'"
    volumes:
      - .:/sample_app
    ports:
      - "3001:3001"
    depends_on:
      - db
volumes:
  mysql-data: {}
```

では、Railsとデータベース（今回はMariaDBを使用）の環境構築をdocker-composeコマンドで行う。

```terminal
docker-compose run web rails new . --force --no-deps -d mysql --api --skip-bundle
```

これで、APIモードのRailsアプリケーションが作成できたはず。
`database.yml`でDBの設定も忘れずに行う。

database.yml
```yml
default: &default
  adapter: mysql2
  encoding: utf8
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: root
  password: "password"
  host: db
  socket: /var/run/mysqld/mysqld.sock

development:
  <<: *default
  database: sample_app_development
```

次に、Reactの環境構築を行うために、Dockerfileと同じ階層にもう１つDockerfile_nodeを作成。

Dockerfile_node
```Dockerfile
FROM node:13-alpine  
WORKDIR /usr/src/app/sample_app_front
```

Docker-compose.ymlにも、以下のように追記

Docker-compose.yml
```yml
version: "3"
services:
  db:
    image: mariadb
    command: mysqld --character-set-server=utf8 --collation-server=utf8_unicode_ci
    environment:
      MYSQL_DATABASE: "sample_app_development"
      MYSQL_ROOT_PASSWORD: "password"
    volumes:
      - mysql-data:/var/lib/mysql/data
      - /tmp/dockerdir:/etc/mysql/conf.d/
    ports:
      - 3306:3306
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3001 -b '0.0.0.0'"
    volumes:
      - .:/sample_app
    ports:
      - "3001:3001"
    depends_on:
      - db
  node:
    build:
      context: .
      dockerfile: Dockerfile_node
    volumes:
      - ./:/usr/src/app/sample_app_front
    command: sh -c "cd sample_app_front && npm start --host 0.0.0.0 --port 3000"
    ports:
      - "3000:3000"
    stdin_open: true
volumes:
  mysql-data: {}
```

最後に以下のコマンドを実行。

```terminal
docker-compose run node sh -c "npm i -g create-react-app && ./node_modules/.bin/create-react-app sample_app_front"
```

これでOK。

`docker-compose up`をすれば、`localhost:3000`と`localhost:3001`のそれぞれで以下の画面が表示される。

![react_ready](react_ready.png)
![rails_ready](rails_ready.png)



Tomoya

### 参考記事
 - [丁寧すぎるDocker-composeによるrails5 + MySQL on Dockerの環境構築(Docker for Mac)](https://qiita.com/azul915/items/5b7063cbc80192343fc0#%E7%92%B0%E5%A2%83rails5%E7%B3%BB%E3%81%A7%E4%BD%9C%E6%88%90%E3%81%97%E3%81%A6%E3%81%BE%E3%81%99)
 - [DockerでRuby on Rails + Reactを別々にアプリ作成する環境構築手順](https://qiita.com/dl10yr/items/b76969da1c2c33595a4a)

