---
title: Memo for using Powershell
date: "2020-06-25"
tags: ["Powershell", "Windows", "2020"]
disqus: true
---

Hi, I'm Tomoya.  
It's been a while since I posted last time.  
This time I'll be writing about Powershell because I've been working on writing scripts with Powershell recently. It will be just a personal memo tho.


# About Powershell
- Shell script initially developed by Microsoft
- Successor from DOS and VBScript, and based on .NET framework,
- Works not only on Windows but also on Linux and MacOS

# Installation
- If Windows, it's already installed by default.
- If Mac, you can easily install Powershell [here](https://docs.microsoft.com/ja-jp/powershell/scripting/install/installing-powershell-core-on-macos?view=powershell-7)（it's all Japanese tho）

In terms of text editor, **Powershell ISE** is one of the best choices in general. However, I'll use **Visual Studio** code because I'm used to it and able to do similar things on VS code too, with Powershell extension which works like IDE for Powershell.

# How to run Powershell scripts
File extension for Powershell is `.ps1`. Let's just execute `hello_world.ps1` which just outputs "Hello world!".

```ps1
# hello_world.ps1

write-host Hello world!
```

You created the file, and run it on terminal with just file name.

```terminal
# terminal

hello_world.ps1 （you can omit ps1）

# output
Hello world!
```

# How to write scripts
Powershell commands（commandlet）are basically consist of {Verb - Noun}.  
And luckily Powershell commands have alias for Linux and MacOS commands as well so you can use something like `ls` on Powershell.


## Basic commands
| Powershell                      | Linux、MacOS | What it does                   |
| --------------------------------------- | -------------------- | -------------------------- |
| Get-Location                            | pwd                  | Get current directory's path  |
| Set-Location/Push-Location/Pop-Location | cd                   | Change current directory   |
| New-Item                                | touch                | Create a new file         |
| New-Item -Type Directory                | mkdir                | Create a new directory         |
| Get-ChildItem                           | ls                   | Show a list of files         |
| Remove-Item                             | rm                   | Remove a file or directory            |
| Copy-Item                               | cp                   | Copy a file or directory           |
| Move-Item                               | mv                   | フMove a file or directory             |
| Rename-Item                             | mv                   | Rename a file or directory             |
| Get-Content                             | cat/less             | Show a content of a file         |

## More commands for scripting
To write more practical scripts, you need to understand and make use of complicated commands.

### Out-File
This command outputs a result of shell commands to another file.  
(`-encoding` for charset, `-append` for appending to a remaining file)
```
"abcdefg" | Out-File sample.txt -encoding UTF8 -append

# If the path already defined, you can write a script like this too
$newFile = ‘c:\tmp\sample.txt’
"abcdefg" > $newFile
```

### Split-Path
This command splits a remaining path and return a part of it.
(`-Parent` for parent path `-Leaf` for a path at tip)
```
Split-Path -Parent C:\Folder1\Folder2\FileA.txt

# output
C:\Folder1\Folder2

Split-Path -Leaf C:\Folder1\Folder2\FileA.txt

# output
FileA.txt
```

### [System.Windows.Forms.MessageBox]::show()
This shows a message window and return a value that users choose.

```
# You need to load Assembly
Add-Type -AssemblyName System.Windows.Forms

# Ask question here
$result = [System.Windows.Forms.MessageBox]::Show("実行しますか？","確認","YesNo","Question","Button2")

# Show the result
If($result -eq "Yes"){
  [void][System.Windows.Forms.MessageBox]::Show("Yesが押されました。","結果","OK","Information")
}Else{
  [void][System.Windows.Forms.MessageBox]::Show("Noが押されました。","結果","OK","Information")
}

```

### Select-String
This command extracts a specific string based on regex(Regular Expression).

```
$sourceFile = ‘C:\tmp\source.txt’
$regex = ‘\b[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b’
select-string -Path $sourceFile -Pattern $regex -AllMatches -Encoding default
```

There're more other commands which I would be using in near future so I'll just add those commands here on this post...



Tomoya