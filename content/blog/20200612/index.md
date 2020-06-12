---
title: How to analyze Android app source code
date: "2020-06-12"
tags: ["Android", "Java", "Kotlin", "2020"]
disqus: true
---

Hey there! I'm Tomoya again.
Today I will take a note of how I managed to decompile Java files of Android app and take a close look at the source code in order to gather technical information for new product.

## Tools
- adb
- JDK
- AndroidStudio
- de2jar
- Jad

You better install these tools above for reverse-engineering Android app.

## How to decompile
Firstly, you need to install **adb（Android Debug Bridge）** beforehand because it gives you a great connection with Android API. Check [here](http://sozoen.com/yuichiro/adb-command) if you can read Japanese.
( Note that adb's path in your environment variable should be like `~~~/sdk/platform-tools`) Make sure you successfully installed adb by running `adb --version` on command line.

Next, turn on your Android phone that has the app you'd like to analyze. And then go to Setting => About phone, and tap `Build number` for 7 times, which allows you to switch Developer mode on your phone. If you switch to Developer mode, you can turn on `USB debugging` in developer options somewhere in your settings. Now you can connect the Android phone to your PC. Ready to start!

Once your phone is properly connected to your PC, you can run `adb shell pm list packages -f` on terminal, which outputs all the apk files for each application in the Android phone. After finding out the app you're trying to inspect, run `adb pull {absolute path of the apk file}`, which duplicates the apk file in the current directory on terminal. 

If you unzip it, you'll see the followings;

- AndroidManifest.xml - for app's components and permissions
- classes.dex - main files included
- META-INF - meta information of apk file
- res - resources for app
- resources.arsc - meta information of resources

What you definitely want to look at is `classes.dex` but you can't inspect the file as it's dex file. You need to use **dex2jar** to convert dex files to jar files. Check [here](https://sourceforge.net/projects/dex2jar/) if you can read Japanese.

If you're using mac or Linux,

```terminal
d2j-dex2jar.sh classes.dex
```

if Windows, 

```terminal
d2j-dex2jar.bat classes.dex
```

..these commands will work. If not, it would be permission problem so you can run chomd command on the current directory. Or it could be due to locations of the two files `dex2jar` and `dex`.

Once converted successfully, you can install **Jad** via [here](https://gabekore.org/java-jad-jdgui-bytecode) (it's all Japanese tho) and get ready to decompile jar files.

Finally, you can run `jad -s java -d src -r classes-dex2jar\**\*.class` on the directory that has `classes-dex2jar`, which generates decompiled java files in brand-new directory called `src/`,

Now, you are free to use AndroidStudio or any your favorite text editer for your analysis on the Android app.

Have fun! Thank you for reading, guys!
Cheers!

Tomoya