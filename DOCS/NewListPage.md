# -NewListPage-

<BR><bR>

# 📘사용한 데이터

## ![](https://velog.velcdn.com/images/nick010397/post/35cc1443-64f8-47b2-87ed-8963f8c2c653/image.png)


## 😊 abstract : 기사 제목

## 😂 byline.original : 기자 이름

## 😜 pub_date : 발행 날짜

## 😘 _id : 키값


<BR><BR>

# 📘API_KEY값 (수정됨 2022-09-01)
> ```.gitignore```에서 #API_KEY가 있습니다.

<BR><BR>

## 🤭.env 방법

<BR>

**1. src폴더밑에 .env 파일 생성**
<BR><BR>
![](https://velog.velcdn.com/images/nick010397/post/a88f747a-e907-42d4-bd24-7e11287ad368/image.png)



<BR><BR>

***2 .env에 작성해주세요***
>REACT_APP_ARTICLES_API_KEY='yourkey'

<BR><BR>

-끝-
>  ``` NewsListPage.js``` => const API_KEY = process.env.REACT_APP_ARTICLES_API_KEY

>  ``` NewsListPage.js``` => ${API_KEY} 적용된다.


