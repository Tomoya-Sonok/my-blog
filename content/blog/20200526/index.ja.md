---
title: Dockerの概要と使い方
date: "2020-05-26"
tags: ["Docker", "2020"]
disqus: true
---

今回は、最近チーム開発で使用して気に入ったDockerについて書いてみる。

## Dockerとは？
Dockerとは、Linux上で動く軽量なコンテナ型仮想化ソフトウェアのひとつで、Web開発のスタンダードになりつつある人気の技術。仮想化と言われるとわかりにくいかもしれないが、要はあの面倒くさい環境構築をコンテナ化することで、人為的ミス無しで何度も簡単に壊したり再構築したりできる優れものということである。これからエンジニアとして働く自分としては必ず使いこなせるようになっておきたい。

Dockerについてもう少しだけ具体的に書くと、環境構築の作業や設定をコード化した`Dockerfile`というものを作成し、それを元に生成される`Docker image`を`Dockerhub`にプッシュすることで、チームメンバーはその`Docker image`を使って全く同じ環境(コンテナ)を一瞬で構築できるようになる、といった仕組みだ。


## なぜ流行っている？
`VMware`などをはじめとする従来のホスト型仮想化とは異なり、手軽に導入できて起動も速いから。環境構築は一からやろうとすると時間がかかるし、人為的なミスでさらに余計な時間がかかって非効率的だが、Dockerというコンテナ型仮想化技術を使えば簡単に確実に、そして効率よく開発メンバー全員分の環境構築を済ませることができる。

これまでインフラ構築をコード化して実行するだけで構築が完了する ( **IaC** = Infrastructure as Code)という技術は世に出ていなかったので、IaCで誰でも同じ環境を作業ミス無しで構築できるDockerの普及はどんどん進んでいる。

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

### 参考にした記事：  
[初心者による初心者のためのDocker入門 その１ dockerコマンド編](https://qiita.com/k5n/items/2212b87feac5ebc33ecb)  
[Dockerfileの書き方](https://hacknote.jp/archives/54050/)  