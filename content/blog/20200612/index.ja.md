---
title: Androidアプリのソースコードを解析する方法
date: "2020-06-12"
tags: ["Android", "Java", "Kotlin", "2020"]
disqus: true
---

新プロジェクトで開発するアプリの構想を練るために、類似したAndroidアプリの中身を調べた時の手順をここにまとめる。

## 必要なツール
- adb
- JDK
- AndroidStudio
- de2jar
- Jad

上記のツールをあらかじめインストールしておかないと、リバースエンジニアリングは難しい。

## 手順
まず、adb（Android Debug Bridge）コマンドを使う場面が何回かあるので、[windowsでadbコマンドを使えるようにする方法](http://sozoen.com/yuichiro/adb-command)を参考にadbコマンドを使用可能にする。  

（環境変数でパスを通すときに、`~~~/sdk/platform-tools`のようなパスになっているか注意）

次に、実際に解析したいアプリが入っているAndroidスマホの設定画面から機種の情報のページを探し、その中のビルド番号の部分を7回タップする。すると開発者モードとなって、設定のどこかに開発者オプション、そしてUSBデバッグというような設定が現れるはずなのでオンにする。あとは作業するPCにそのスマホを接続すれば準備OK。

うまく接続されたら、コマンドプロンプトもしくはターミナルで`adb shell pm list packages -f`というコマンドを実行。そのスマホに入っているAndroidアプリのapkファイルが全て表示される。その中から解析したいアプリを見つけたら、`adb pull ${解析するアプリのapkファイルの絶対パス}`を実行。カレントディレクトリにapkファイルが抽出される。無事にapkファイルが手に入ったら、**拡張子をapkからzipに変更**して解凍しておく。

中には以下のようなものが入っているはず。（参考：[Android アプリ解析基礎 その2 -PC編-](https://qiita.com/totem/items/48f25abd5769315afa18)）
- AndroidManifest.xml - アプリのコンポーネントやパーミッションを記述するファイル
- classes.dex - 実行ファイル本体
- META-INF - apkファイルの署名情報
- res - アプリのリソース(画像等)
- resources.arsc - リソースのメタ情報

重要なのは、`classes.dex`である。しかし、dexのままだと中身を確認できないので**dex2jar**を使ってjarファイルを生成する。[こちら](https://sourceforge.net/projects/dex2jar/)でインストールできる。パスを通すか、作業するディレクトリに解凍したものを入れておこう。

mac、Linuxなら、

```terminal
d2j-dex2jar.sh classes.dex
```

Windowsなら、

```terminal
d2j-dex2jar.bat classes.dex
```

というコマンドでdexからjarへ変換できるはず。無理なら、おそらくchomdコマンドで権限を与えるか、dex2jarやdexファイルの場所が異なることが原因だと考えられる。

無事にエラーもなく変換が完了したら、最後に**Jad**というツールを使用してjarファイルをデコンパイルする。[こちらの記事](https://gabekore.org/java-jad-jdgui-bytecode)を参考にJadをインストールしたら、dex2jarの時と同じ要領でパスを通すなりしてJadを使えるようにする。

Jadコマンドが使えることが確認できたら、`jad -s java -d src -r classes-dex2jar\**\*.class`（classes-dex2jar\**\の部分は状況に応じて変更）というコマンドで.**class**で終わっていたファイルがデコンパイルされた.**java**ファイルが新しく作成される`src/`の中に生成される。

こうして作られた`src/`フォルダを、AndroidStudioや使い慣れたお好きなエディタでじっくり解析していく。

Tomoya