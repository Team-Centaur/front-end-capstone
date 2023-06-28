import React, { useState, useEffect } from 'react';
import { averageRating } from '../../lib/ratingsAndReviewsHelpers.js';
import { getReviews, getReviewsMeta } from '../../lib/requestHelpers.js';


const RatingBreakdown = ({ reviews }) => {

  const [oneStar, setOneStar] = useState('');
  const [twoStar, setTwoStar] = useState('');
  const [threeStar, setThreeStar] = useState('');
  const [fourStar, setFourStar] = useState('');
  const [fiveStar, setFiveStar] = useState('');

  useEffect(() => {
    getReviewsMeta(40346)
      .then(({ data }) => {
        let ratings = data.ratings;
        console.log(ratings);
        let totalReviews = calculateTotalReviews(ratings);
        setOneStar(calculateRatingsPercentage(ratings['1'], totalReviews));
        setTwoStar(calculateRatingsPercentage(ratings['2'], totalReviews));
        setThreeStar(calculateRatingsPercentage(ratings['3'], totalReviews));
        setFourStar(calculateRatingsPercentage(ratings['4'], totalReviews));
        setFiveStar(calculateRatingsPercentage(ratings['5'], totalReviews));
      });
  }, []);

  const calculateTotalReviews = (ratingsObject) => {
    var sum = 0;
    for (var key in ratingsObject) {
      sum += parseInt(ratingsObject[key]);
    }
    return sum;
  };

  const calculateRatingsPercentage = (starRating, totalReviews) => {
    return Math.round(starRating * 100 / totalReviews);
  };

  return (
    <>
      <div>Average Rating: {averageRating(40347)}</div>
      <div>5 Stars: {fiveStar}%</div>
      <div>4 Stars: {fourStar}%</div>
      <div>3 Stars: {threeStar}%</div>
      <div>2 Stars: {twoStar}%</div>
      <div>1 Stars: {oneStar}%</div>
    </>
  );
};

export default RatingBreakdown;