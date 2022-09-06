import React, { useState, useEffect } from "react";
import SearchPage from "../Search/SearchPage";
import Styled from "styled-components";
import { NewsWrap } from "../../styles/WrapStyle";
import ClipPage from "../Clip/ClipPage";
import bookmark_before from "../../img/bookmark_before.png";
import bookmark_after from "../../img/bookmark_after.png";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { addId, removeId } from "../../store";
const API_KEY = process.env.REACT_APP_ARTICLES_API_KEY;

export default function NewsListPage() {
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState(); 
  const [pageNo, setPageNo] = useState(0);
  const [ref, inView] = useInView(false);
  const value = window.localStorage.getItem('clipHistory');
  const [clipdata,setClipdata] = useState()

  //redux store 가져와줌
  let clipList = useSelector((state) => state.clipList );
  console.log(clipList);
  let dispatch = useDispatch();
  localStorage.setItem('clip', JSON.stringify(clipList));
  

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

  useEffect(() => {
    if(articles.length !== 0){
      setPageNo(prev => prev+1);
    }
    console.log(inView)
  }, [inView]);

  
  

  return (
    <>
      <SearchPage setTerm={setTerm} setArticles={setArticles}/>
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
              
              {
                clipList.map((item) => item.id).indexOf(_id) !== -1?
                <ClipBtn onClick={()=> dispatch(removeId(_id))} className="clipon" id={_id} />
                :
                <ClipBtn onClick={()=> dispatch(addId({id: _id, title: main, url: web_url, byline: sliceByline, date: pub_date}))} id={_id} />
              }
              
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