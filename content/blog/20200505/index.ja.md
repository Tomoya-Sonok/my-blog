---
title: 【Gatsby.js】爆速でポートフォリオを作成する方法
date: "2020-05-05"
tags: ["Gatsby", "2020"]
disqus: true
---

今回は、Gatsby.jsを使って簡単にカッコいいポートフォリオサイトを作る方法を共有したい。

完成形は[こちら](https://my-portfolio-en.netlify.com)。

### そもそもGatsbyとは？
> Gatsbyは、Reactに基づく無料のオープンソースフレームワークであり、開発者が非常に高速なWebサイトやアプリを構築するのに役立ちます
  
*[公式ドキュメント（英語）](https://www.gatsbyjs.org/)より

### 手順

1 . まずは、Gatsbyでの開発に必要な以下のツールを揃える。

- Git
- Node.js（npmを使えているなら入っているはず）
- Gatsby CLI

インストール方法がわからない場合は、過去にQiitaで投稿した[この記事](https://qiita.com/wlcmty/items/67b6f51ddc646484d7bc)を参考。

2 . [Gatsby公式サイト](https://www.gatsbyjs.org/starters/?v=2)で、使いたいテンプレートを見つける。

今回の投稿では、この[gatsby-starter-portfolio-cara](https://www.gatsbyjs.org/starters/LekoArts/gatsby-starter-portfolio-cara/)というテンプレートを使用する。

<img width="1143" alt="Screen Shot 2020-04-01 at 17.21.06.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/482472/9eb017c9-58a6-aaed-0c3f-64786dfcd90a.png">


3 . 作業用のディレクトリに`cd 開発をするディレクトリ名`で移動し、`gatsby new`する

先ほどのテンプレート詳細ページに下にスクロールしてもらうと、使い方が英語で載っている。

そこに、`gatsby new`のコマンドが載っているので、それを作業するディレクトリに移動して実行。

```shell
cd ディレクトリ名
gatsby new gatsby-starter-portfolio-cara https://github.com/LekoArts/gatsby-starter-portfolio-cara
```

その後、`gatsby new`で生成したディレクトリに`cd`で移動し、次は`gatsby develop`を実行。

```shell
cd gatsby-starter-portfolio-cara
gatsby develop
```

`gatsby develop`が成功したら、ブラウザでタブを開いて`localhost:8000`にアクセスする。

テンプレート通りのサイトができあがっていれば、成功！

<img width="1439" alt="Screen Shot 2020-04-01 at 17.34.58.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/482472/b5a2c984-6202-32ec-e980-bd615e979e92.png">


使用するテンプレートによっても異なるが、もちろん中身の編集も簡単が可能。

今回の[gatsby-starter-portfolio-cara](https://www.gatsbyjs.org/starters/LekoArts/gatsby-starter-portfolio-cara/)というテンプレートの場合、作成されたフォルダの中の`src`の中に`intro.mdx`というファイルが入っており、ページのトップの部分はマークダウン式で中身を自由に編集できるようになっている。トップ以外の箇所も、`projects.mdx`、`about.mdx`、`contact.mdx`という風にそれぞれファイルを`src`の中に作成してマークダウン式で編集が可能。

転載元のQiita記事は[こちら](https://qiita.com/wlcmty/items/1fc6a4bc57896fd84035)。