---
title: How to use gatsby starter
date: "2020-05-05"
tags: ["Gatsby", "2020"]
disqus: true
---

Hey guys.
This time I'll be sharing how to build a blazing fast portfolio site with Gatsby.js in a few mins.

[Here](https://my-portfolio-en.netlify.com) is what you can build in this post.

### What is Gatsby？
> Gatsby is a free and open source framework based on React that helps developers build blazing fast websites and apps
  
*[GatsbyJS Document](https://www.gatsbyjs.org/)

### How to build

1 . First of all, you need to make sure you have these tools for using Gatsby.js

- Git
- Node.js（if you're using npm, I'm sure you already have Node.js too）
- Gatsby CLI

2 . Find your favorite starter template in [Starter Library](https://www.gatsbyjs.org/starters/?v=2).

This time I'm using [gatsby-starter-portfolio-cara](https://www.gatsbyjs.org/starters/LekoArts/gatsby-starter-portfolio-cara/) for showing how to use gatsby starter.

<img width="1143" alt="Screen Shot 2020-04-01 at 17.21.06.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/482472/9eb017c9-58a6-aaed-0c3f-64786dfcd90a.png">


3 . Move to the directory which you want to build your gatsby site by running `cd [directory name]` and `gatsby new`.（You'll see how to run `gatsby new` at the bottom of the starter page. Something like below.）

```shell
cd [directory name]
gatsby new gatsby-starter-portfolio-cara https://github.com/LekoArts/gatsby-starter-portfolio-cara
```

4 . Then move to the directory you just generate by `gatsby new` and run `gatsby develop`.

```shell
cd gatsby-starter-portfolio-cara
gatsby develop
```

After `gatsby develop` is successfully done, go to `localhost:8000`.


<img width="1439" alt="Screen Shot 2020-04-01 at 17.34.58.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/482472/b5a2c984-6202-32ec-e980-bd615e979e92.png">

Depends on which starter template you choose, but you can edit the content of the gatsby site. Please read README.md of the template to know how to edit contents of them.

If you want to use this [gatsby-starter-portfolio-cara](https://www.gatsbyjs.org/starters/LekoArts/gatsby-starter-portfolio-cara/), you can change the letters on top part of the page by editing `intro.mdx` inside of `src`. To edit other parts of the page, you need to create and edit `projects.mdx`, `about.mdx`, `contact.mdx` in the same `src`.

Tomoya