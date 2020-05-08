---
title: Kubernetesについて
date: "2020-05-08"
tags: ["Kubernetes", "2020"]
disqus: true
---

Google信者なのに、Googleと深い関わりのあるKubernetesという技術をあまり知らなかったのでここにメモとしてまとめておく。

![kubernetes](./kubernetes.png)
from [Kerbenetes in 5 mins](https://youtu.be/PH-2FfFD2PU)

## Kubernetesとは？
2014年にGoogleからオープンソースとして発表されたコンテナ・オーケストレーターで、現在はCloud Native Computing Foundation（CNCF）によって管理されている。

## コンテナ・オーケストレーターとは？
複数のコンテナのデプロイやスケーリング等を自動管理してくれるもの。サーバが数台で足りるような小規模のアプリケーションならば必要ないが、急にユーザー数やリクエスト数の増加でサーバの数を増やしてサービスをスケールしたい時や必要なコンテナの数が増えてきた時に効果を発揮する。

### 結局、Kubernetesは何をしてくれるの？
1つ以上のコンテナを「pod」と呼ばれる入れ物に入れて複数のコンテナを同時に管理してくれたり、circleCIを連携して継続的デプロイを可能にしてくれる。他にも、外部ネットワークからの通信の負荷を自動で複製された複数のコンテナに分散してくれたり、コンテナが落ちたら自動で新たに立ち上げたりしてくれる。

上記の働きをしてくれる各パーツの名称や説明は、[この記事](https://mai-naga17.hatenablog.com/entry/2019/04/22/205747)がわかりやすかった。

参考になった記事やYoutube動画
 - [Kubernetes Documentation（公式ドキュメント）](https://kubernetes.io/) 
 - [Kubernetesとは何か？ 3大クラウドが追従する「コンテナ管理」入門](https://www.sbbit.jp/article/cont1/35564#head1)
 - [今さら人に聞けないKubernetes入門！AWS環境で動かす25分の高速学習【有名ツールのみ使用】](https://www.youtube.com/watch?v=PeRE90mSHQo)
 - [Kubernetes とは | RedHat](https://www.redhat.com/ja/topics/containers/what-is-kubernetes)
 - [Kerbenetes in 5 mins](https://youtu.be/PH-2FfFD2PU)


Tomoya