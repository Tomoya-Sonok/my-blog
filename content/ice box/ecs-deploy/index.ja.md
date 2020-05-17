---
title: ECSについて、デプロイ用メモ
date: "2020-05-??"
tags: ["ECS", "Docker", "2020"]
disqus: true
---

つい最近、React × Rails ( API ) × Docker で開発したアプリをECSを用いてデプロイした。慣れない作業でかなり苦労したので、デプロイ時の作業手順を思い出せるよう書き残しておく。なお、ECSの用語やコマンドの意味については触れない（実際に使ってみないと理解しにくいが、最もわかりやすく概念を解説してくれていたのは[この記事](https://qiita.com/NewGyu/items/9597ed2eda763bd504d7)）。あくまで自分用のメモなのであしからず。

# 前提
Dockerコンテナで開発済みのアプリがある
Dockerhubアカウント作成済み  
AWSアカウント作成済み  
dockerとdocker-composeインストール済み  
aws cliインストール済み
IAMユーザを作成しており、AmazonEC2ContainerServiceFullAccessとAmazonEC2ContainerRegistryFullAccessの権限を付与済み  



# メモ、使用したコマンド
<!-- 01

docker build -t wlcmty08kh/thinky_web .  
docker push wlcmty08kh/thinky_web  
docker build -t wlcmty08kh/thinky_node:latest . -f Dockerfile_node  
docker push wlcmty08kh/thinky_node   -->

02
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 945098287150.dkr.ecr.ap-northeast-1.amazonaws.com
docker build -t thinky-repo .
docker tag thinky-repo:latest 945098287150.dkr.ecr.ap-northeast-1.amazonaws.com/thinky-repo:latest
docker push 945098287150.dkr.ecr.ap-northeast-1.amazonaws.com/thinky-repo:latest
docker build -t thinky-repo-front . -f Dockerfile_node
docker tag thinky-repo-front:latest 945098287150.dkr.ecr.ap-northeast-1.amazonaws.com/thinky-repo-front:latest
docker push 945098287150.dkr.ecr.ap-northeast-1.amazonaws.com/thinky-repo-front:latest



# 手順
<!-- - Dockerhubに、デプロイに使用するコンテナに対応するimageをpushする 01
デプロイするアプリのディレクトリにて、`docker build -t {レポジトリのユーザ名}/{image名} .`でDockerhubのレポジトリ名に対応するimageを作成。それを、`docker push {作成したimage名}`でpushできる。 -->

- ECRにimageをpush
コンソールで、ECS -> AmazonECR レポジトリ -> レポジトリを作成  
リポジトリ名の右にimage名を入れる（イミュータビリティもスキャンも無効でok） -> 「作成」をクリック  
作成されたリポジトリ名をクリックして、「プッシュコマンドを表示」  指示に従ってコマンドを実行していけばECRにpushできる 02

- クラスタの作成
クラスター名: thinky-cluster01  
プロビジョニングモデル: オンデマンドインスタンス  
EC2 インスタンスタイプ: t3.micro  
インスタンス数: 2  
EC2 Ami Id: Linux2の方  
EBS ストレージ (GiB): 22  
キーペア: 使ってるもの選択
VPC: 作成したことがある場合は、それを使用  
サブネット: ap-northeast-1a、ap-northeast-1c、ap-northeast-1d  
セキュリティグループ: 使用しているものを選択  
Tags: つける必要はない。（例：Name, thinky-ecs01）  

全て記入が終わったら、「作成」

- タスクの定義
タスク定義名: thinky-task01  
タスクロール: なし  
ネットワークモード: bridge  

コンテナの追加
  コンテナ名: thinky_web  
  イメージ: wlcmty08kh/thinky_web  
  メモリ制限 (MiB): ソフト制限で300  
  ポートマッピング: 0, 8080, tcp
 詳細コンテナ設定は、「ストレージとログ」のログ設定にて{Auto-configure CloudWatch Logs}にチェックを入れる

  コンテナ名: thinky_node  
  イメージ: wlcmty08kh/thinky_node  
  メモリ制限 (MiB): ソフト制限で300  
  ポートマッピング: 0, 8080, tcp
 詳細コンテナ設定は、「ストレージとログ」のログ設定にて{Auto-configure CloudWatch Logs}にチェックを入れる

終わったら、「作成」

- ELBの作成
サブネット、セキュリティグループは既存のものを選択
ターゲットもほぼデフォルトのまま進む。
ターゲットの登録で、クラスタの作成時に登録したサブネットをターゲットとして指定して登録

終わったら、「作成」 
（=> タスクの実行 ==> 実行中のタスクが1になっていることを確認）

- サービスの作成
起動タイプ: EC2  
タスク定義: タスク名、リビジョンをそれぞれ入力  
クラスター、サービス名はそれぞれ自由に入力  
サービスタイプ: REPLICA  
タスクの数: 2  
最小ヘルス率: 100  
最大率: 200  
デプロイメントタイプ: ローリングアップデート  
配置テンプレート: A-Z バランススプレッド  

ヘルスチェックの猶予期間: 180 （よくわからない）
ロードバランサーの種類: Application Load Balancer  
ロードバランサー名: 作成済みのELB名を入力  
  「ロードバランス用のコンテナ」の記述も作成済みのターゲットグループ等を入力

サービスの検出 (オプション)など、オプションの設定は一旦無視。






# 参考にした記事
[知識0から Docker 環境を AWS の ECS でデプロイするまで](https://techblog.istyle.co.jp/archives/1652)
[AWS ECSでDockerコンテナ管理入門（基本的な使い方、Blue/Green Deployment、AutoScalingなどいろいろ試してみた）](https://qiita.com/uzresk/items/6acc90e80b0a79b961ce#%E6%A7%8B%E6%88%90%E3%81%99%E3%82%8B%E9%A0%86%E7%95%AA%E3%82%92%E6%8A%91%E3%81%88%E3%82%88%E3%81%86)
[Amazon EC2 Container Service(ECS)の概念整理](https://qiita.com/NewGyu/items/9597ed2eda763bd504d7)

[AWS ECS編～EC2 Container Registry を試してみる～](https://recipe.kc-cloud.jp/archives/8572)
[【AWS】EC2のインスタンスとは？インスタンスタイプの特徴と比較,覚え方/選び方](https://milestone-of-se.nesuke.com/sv-advanced/aws/instance-type-and-feature/)
[Docker基本コマンドまとめ](https://qiita.com/zamakei1016/items/660236084f29195b6a90)
[AWS Black Belt Online Seminar 2016 Amazon EC2 Container Service](https://www.slideshare.net/AmazonWebServicesJapan/aws-black-belt-online-seminar-2016-amazon-ec2-container-service)