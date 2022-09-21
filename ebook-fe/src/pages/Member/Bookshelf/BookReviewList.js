import React, { useState, useEffect } from 'react'
// test bookCover Importing
import BookCover from '../../../img/book.jpg'
// Star Rating
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarRate from '@mui/icons-material/StarRate'
// React Bootstra
import Button from 'react-bootstrap/Button'
import axios from 'axios'
// API URL
import { API_URL } from '../../..//utils/config'

function BookReviewList() {
  const [scoreFromStarRating, setScoreFromStarRating] = useState(0)

  // star Rating
  const [value, setValue] = useState(0)

  // 接收 review 資料
  const [getReview, setGetReview] = useState([])

  // 一進頁面就先 render Review 資料
  useEffect(() => {
    try {
      const reviewData = async () => {
        let response = await axios.get(`${API_URL}/reviews/get-reviews`)
        // console.log(response.data)
        setGetReview(response.data)
      }
      reviewData()
    } catch (e) {
      console.error(e)
    }
  }, [])

  // 回傳start score
  useEffect(() => {
    setScoreFromStarRating(value)
  }, [value])

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconEmpty': {
      color: '#661F1E',
    },
    '& .MuiRating-iconFilled': {
      color: '#661F1E',
    },
    '& .MuiRating-iconHover': {
      color: '#661F1E',
    },
  })
  return getReview.map((reviewValue) => {
    return (
      <>
        <div key={reviewValue.id} className="Bookshelf-review-container row ">
          <div className="col-sm-3">
            <div className="Bookshelf-book-card m-2">
              <div className="Bookshelf-card-img mb-2">
                <img
                  alt="bookCover"
                  src={BookCover}
                  className="cover-fit"
                ></img>
              </div>
              {/* star rating */}
              <div>
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                  }}
                >
                  <StyledRating
                    name="simple-controlled"
                    defaultValue={reviewValue.star_rating}
                    onChange={(event, newValue) => {
                      setValue(newValue)
                    }}
                    icon={<StarRate fontSize="30px" />}
                    emptyIcon={<StarOutlineIcon fontSize="25px" />}
                    readOnly
                  />
                </Box>
              </div>
              <div className="Review-book-name">{reviewValue.book_name}</div>
              <div className="Review-update-time">
                {reviewValue.create_time}
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="Review-comments m-2 p-3">
              <p>{reviewValue.content}</p>
            </div>
            <div className="Review-comments-btn m-2">
              <Button className="btn btn-primary-reverse m-2">編輯</Button>
              <Button className="btn btn-primary-reverse m-2">刪除</Button>
            </div>
          </div>
        </div>
      </>
    )
  })
}

export default BookReviewList
