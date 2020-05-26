---
title: What Docker is and how to use it
date: "2020-05-26"
tags: ["Docker", "2020"]
disqus: true
---

Hi,mates! I'm Tomoya.
This time I'm gonna write about Docker because I really like using it on team development the other day.

## What is Docker?
Docker is one of containerization software systems which is faster and lighter than virtual machine softwares like VMware and all that stuff. And its popularity in Japan is now skyrocketing especially on web development. By containerizing your application's environment, Docker simplifies the process of how you set up for developing the app so that you can easily break and rebuild it without any human mistakes.

Speaking of how it works, you create `Dockerfile` which has detailed process of how you want to set up the environment. And then, you generate a `Docker image` based on the `Dockerfile` and push it to `Dockerhub`. After that, anyone can duplicate the same environment (container) by pulling the `Docker image` in a moment!


## Why so popular?
Unlike other virtual machine softwares `like VMware`, Docker container is lightweight, standalone, executable package of software that includes everything needed to run an application. Docker makes it easy and efficient for all of team members to set up necessary environment on their local machines.

**IaC ( Infrastructure as Code )** came to be recognized for Docker, and this concept is boosting its popularity I think.

## 使い方
今回はなんとなく、Pythonの開発環境をコンテナを簡単に作っていく。

1 . まずは、[こちら](https://hub.docker.com/editions/community/docker-ce-desktop-mac)からDockerhubアカウントを作成し、`Docker Desktop for Mac`をインストール。

2 . 今回扱うPython開発環境用コンテナを使うディレクトリを作成して、その中でDockerfileを新規作成。

```terminal
mkdir python_env
cd python_env
touch Dockerfile
```

3 . 作成したDockerfileにPythonの環境構築に必要な記述を書く。（Dockerfileの中では、行頭の#以外はコメントとして判別されないので注意）

```terminal
vim Dockerfile
```

```Dockerfile
# Dockerhubから公式イメージを取得
FROM python
# コマンドを実行するユーザーを指定
USER root
# コンテナ内で作業を行うディレクトリを指定
WORKDIR /python_env
# RUNでコンテナ起動時に実行するコマンドを指定
# RUNが多い場合は、「&&」を使ってなるべく１つのRUNにまとめた方がbetter
# FROMやRUNなどのレイヤーが多いとコンテナ起動が少し遅くなる
RUN apt-get update
RUN apt-get install -y vim
RUN pip install requests

# 以下の3つは日本語の設定
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
```

4 . `docker build -t {任意のイメージ名} .`で実際にDockerfileからイメージをビルドして、確認してみる。

```terminal
docker build -t python_img .
docker images
```

`python_img`というイメージが生成されていればOK。

5 . `docker run -it {作成したイメージ名} bash`でそのイメージからコンテナを生成して、`-it`というオプションを付ければそのまま中に入ることができる。実際に入って、Pythonのバージョンを確認してみる。

```terminal
docker run -it python_img bash

（コンテナの中に入ったら）
python --version
```

Pythonのバージョンが表示されれば完了。
このコンテナ内でvimを使ってpythonプログラムを書けば、問題なく実行できるはず。


Tomoya

参考にした記事：  
[初心者による初心者のためのDocker入門 その１ dockerコマンド編](https://qiita.com/k5n/items/2212b87feac5ebc33ecb)  
[Dockerfileの書き方](https://hacknote.jp/archives/54050/)  