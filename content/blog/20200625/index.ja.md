---
title: Powershellをもっと使えるようになりたい
date: "2020-06-25"
tags: ["Powershell", "Windows", "2020"]
disqus: true
---

今回は業務でPowershellを使う機会が増えてきたので、メモのような形で後から読み返すようなものを書いていく。

# 概要
- Microsoftが開発したスクリプト言語
- 従来のDOSコマンドやVBScriptの後継
- Windowsだけでなく、LinuxやMacOSでも動作するシェルスクリプト

# 環境構築
- Windowsの場合は、標準で搭載されているので特に必要ない
- Macの場合は、[こちら](https://docs.microsoft.com/ja-jp/powershell/scripting/install/installing-powershell-core-on-macos?view=powershell-7)の記事を参考にして簡単にインストール可能

なお、エディタに関してはPowershell ISEというものを使用するのが一般的のようだが、Visual Studio code（以降、 VS codeと呼ぶ）の拡張機能で**Powershellの実行環境を用意できる**ことから、筆者が使い慣れている**VS code**を使用することにする。

# スクリプトの実行方法
Powershellスクリプトファイルの拡張子は、`.ps1`である。例として、まずは`hello_world.ps1`というテキストファイルを作成して実行してみる。

```ps1
# hello_world.ps1

write-host Hello world!
```

そして実行するには、実行したいファイルがあるディレクトリに移動して

```terminal
hello_world.ps1 （ps1は省略可能）

# 出力結果
Hello world!
```

# スクリプトの書き方
Powershellのコマンドは主に、「動詞 - 名詞」となっている。  
多くのPowershellコマンドはaliasとしてLinux、MacOSのコマンドが設定されているので、Windowsの操作に慣れていない人でも`ls`などのコマンドを代わりに使うことができる。
## 基本コマンド一覧
| Powershellコマンド                      | Linux、MacOSコマンド | 実行内容                   |
| --------------------------------------- | -------------------- | -------------------------- |
| Get-Location                            | pwd                  | カレントディレクトリの取得 |
| Set-Location/Push-Location/Pop-Location | cd                   | ディレクトリの移動、指定   |
| New-Item                                | touch                | 新規ファイルの作成         |
| New-Item -Type Directory                | mkdir                | 新規フォルダの作成         |
| Get-ChildItem                           | ls                   | ファイルの一覧表示         |
| Remove-Item                             | rm                   | ファイルの削除             |
| Copy-Item                               | cp                   | ファイルのコピー           |
| Move-Item                               | mv                   | ファイルの移動             |
| Rename-Item                             | mv                   | ファイルの改名             |
| Get-Content                             | cat/less             | ファイルの内容表示         |

## 応用コマンド
実用的なスクリプトを書くためには、もう少し複雑なコマンドを知っておく必要がある。

### Out-File
シェルの実行結果をファイルへ出力するコマンド。  
`-encoding`でエンコード指定、`-append`を入れると追記になる。
```
"あいうえお" | Out-File sample.txt -encoding UTF8 -append

# パスを取得している場合、シンプルに結果を出力したいだけなら以下の書き方も可能
$newFile = ‘c:\tmp\sample.txt’
"あいうえお" > $newFile
```

### Split-Path
パスから一部のパスを取得するコマンド。
`-Parent`で指定したファイルの親パスを取得、`-Leaf`で末尾のパスを取得。
```
Split-Path -Parent C:\Folder1\Folder2\FileA.txt

# 出力結果
C:\Folder1\Folder2

Split-Path -Leaf C:\Folder1\Folder2\FileA.txt

# 出力結果
FileA.txt
```

### [System.Windows.Forms.MessageBox]::show()
メッセージウィンドウを表示して、指定した文字列を選択させるコマンド。

```
#アセンブリをロードする必要がある
Add-Type -AssemblyName System.Windows.Forms

#実行確認
$result = [System.Windows.Forms.MessageBox]::Show("実行しますか？","確認","YesNo","Question","Button2")

#結果表示
If($result -eq "Yes"){
  [void][System.Windows.Forms.MessageBox]::Show("Yesが押されました。","結果","OK","Information")
}Else{
  [void][System.Windows.Forms.MessageBox]::Show("Noが押されました。","結果","OK","Information")
}

```

### Select-String
正規表現で文字列の抽出を行うことができるコマンド。

```
$sourceFile = ‘C:\tmp\source.txt’
$regex = ‘\b[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b’
select-string -Path $sourceFile -Pattern $regex -AllMatches -Encoding default
```

他にも書き残したいコマンドや記法があるので、随時この記事に追記しては更新していく。

Tomoya