import React from 'react'
import ClipPage from './ClipPage'
import Styled from "styled-components";
import bookmark_before from "../../img/bookmark_before.png";
import bookmark_after from "../../img/bookmark_after.png";
import { useDispatch, useSelector } from "react-redux";
import { removeId } from "../../store";

export default function ClipList() {

  let clipList = useSelector((state) => state.clipList );
  let dispatch = useDispatch();

    return (
      <>
      <ClipPage props={true} />
        <div>
          {clipList&&clipList.map((item)=>{
                      const {title,date:pub_date,id,byline,url,} = item;
                      let sliceByline;
          if (typeof byline === "string") {
             sliceByline = byline.substr(-(byline.length - 3)) } 
             let date;
             if(typeof pub_date === 'string'){
             date = pub_date.substr(0,10)
          }
          return (
              <NewsList key={id}>
                <NewsTitle>
                  <h3>{title}</h3>
                  <a href={url} target="_blank" rel="noreferrer">
                    <button>DETAIL &gt;</button>
                  </a>
                </NewsTitle>
                <NewsInfo>
                  <p>{sliceByline}</p>
                  <span>{date}</span>
                </NewsInfo>
                <ClipBtn onClick={()=> dispatch(removeId(id))} className="clipon" id={id} />
              </NewsList>
            )}
          )}
        </div>

      </>
    )
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