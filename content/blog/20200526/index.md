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

## How to use Docker
Let's set up Python environment by Docker.

1 . [Here](https://hub.docker.com/editions/community/docker-ce-desktop-mac) you can create `Dockerhub account` and install `Docker Desktop for Mac`.

2 . Make a directory for this python environment, and create Dockerfile inside of the directory.

```terminal
mkdir python_env
cd python_env
touch Dockerfile
```

3 . Write necessary codes below in Dockerfile. (Note that Dockerfile doesn't recognize `#` as a comment unless it's at beginning of the line)

```terminal
vim Dockerfile
```

```Dockerfile
# Pull the official image from Dockerhub
FROM python
# User who executes the commands
USER root
# Working directory
WORKDIR /python_env
# Commands that are going to be executed when the container is running
RUN apt-get update
RUN apt-get install -y vim
RUN pip install requests

# Configuration of Japanese
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
```

4 . By running `docker build -t {image name} .`, you can build the image. Make sure if you successfully created one by running `docker images`.

```terminal
docker build -t python_img .
docker images
```

5 . By running `docker run -it {作成したイメージ名} bash`, you can generate the container and get into it if you put `-it`. Again make sure Python is certainly installed inside.

```terminal
docker run -it python_img bash

（Inside the container）
python --version
```

You see the version of Python? Alright!
Now you can use `vim` to write python programs and execute them successfully inside the container.


Tomoya

### References:  
[初心者による初心者のためのDocker入門 その１ dockerコマンド編](https://qiita.com/k5n/items/2212b87feac5ebc33ecb)  
[Dockerfileの書き方](https://hacknote.jp/archives/54050/)  