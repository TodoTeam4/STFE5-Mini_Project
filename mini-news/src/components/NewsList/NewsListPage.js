import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import SearchPage from "../Search/SearchPage";
import Header from "../Header/Header";
import Styled, { css } from "styled-components";
import { NewsWrap } from "../../styles/WrapStyle";
import ClipPage from "../Clip/ClipPage";
import bookmark_before from "../../img/bookmark_before.png";
import bookmark_after from "../../img/bookmark_after.png";
import { useInView } from "react-intersection-observer";
import API_KEY from './Token.js'
//뉴스기사 검색 받은걸 보여주는 기능 구현

export default function NewsListPage() {
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState(); 
  const [pageNo, setPageNo] = useState(0);
  const [ref, inView] = useInView(false);
  const [btnActive, setBtnActive] = useState(null);
  const [clickNum, setClickNum] = useState(0);
  // const API_KEY = process.env.REACT_APP_ARTICLES_API_KEY

  useEffect(() => {
    const fetchArticles = async () => {
      if (term !== undefined) {
        const res = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&page=${pageNo}&api-key=${API_KEY}`
        );
        const articlesResponse = await res.json();
        articles.concat(...articlesResponse.response.docs);
        setArticles(articles.concat(...articlesResponse.response.docs));
        
      }
    };
    fetchArticles();
  }, [term,pageNo]);

  const [clipdata,setClipdata] = useState()
  
  const toggleActive = (e) => {
    setBtnActive(e.target.id) 
    setClickNum(prev => prev +1)

    articles.map((article) =>
      article._id === e.target.id ? setClipdata(article) : null

    );

  };

useEffect(() => {
    if(btnActive !== null){
      let current = document.getElementById(btnActive);
      current.classList.toggle('clipon');
    }})

  return (
    <>
      <SearchPage setTerm={setTerm} />
      <NewsWrap>
      <ClipPage clipdata={clipdata}/>
        {articles.map((article) => {
          const {
            headline: { main },
            pub_date,
            _id,
            byline: { original },
            web_url,
          } = article;
          let sliceByline;
          if (typeof original === "string") {
            sliceByline = original.substr(-(original.length - 3));
          }
          return (
            <NewsList key={_id}>
              <NewsTitle>
                <h3>{main}</h3>
                <a href={web_url} target="_blank" rel="noreferrer">
                  <button>DETAIL &gt;</button>
                </a>
              </NewsTitle>
              <NewsInfo>
                <p>{sliceByline}</p>
                <span>{pub_date}</span>
              </NewsInfo>
              <ClipBtn onClick={toggleActive} id={_id} />
              <div ref={ref}></div>
            </NewsList>
          );
        })}
      </NewsWrap>
    </>
  );
}

const NewsList = Styled.div`
  position: relative;
  padding: 16px 16px 20px 50px;
  background: rgb(255, 255, 255);
  overflow: hidden;
  margin: 0px auto 12px;
  box-shadow: rgb(0 0 0 / 8%) 0px 2px 12px;
  border-radius: 16px;
`;

const ClipBtn = Styled.button`
  position: absolute;
  top: 23px;
  left: 15px;
  width: 20px;
  height: 30px;
  border: 0;
  background: url(${bookmark_before}) no-repeat;
  background-size: contain;
  background-position: center;
  transition: all 0.2s linear;
  cursor: pointer;
  &.clipon {
    background: url(${bookmark_after}) no-repeat;
    background-size: contain;
    background-position: center;
  }
`;

const NewsTitle = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0 14px;
  > h3{
    font-size: 1rem;
    font-weight: normal;
  }
  > a{
    margin: 0 0 0 5px;
  }
  > a button{
    width: 80px;
    padding: 2px 0;
    background: #f2f2f6;
    border: 0;
    border-radius: 20px;
    color: #999;
    font-family: 'Roboto', 'NanumSquareRound', sans-serif;
    font-size: .75rem;
    cursor: pointer;
  }
`;
const NewsInfo = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0 0;
  border-top: 1px solid rgb(240, 240, 246);
  > p , span{
    color: rgb(118, 118, 118);
    font-size: .8rem;
  }
  > span{
    width: 78px;
    height: 12px;
    overflow: hidden;
    word-break: break-all;
  }
`;
