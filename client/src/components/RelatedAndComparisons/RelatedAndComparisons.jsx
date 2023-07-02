import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchProducts } from '../../lib/requestHelpers.js';
import Related from './Related.jsx';
import Outfit from './Outfit.jsx';

const RelatedAndComparisons = () => {
  const [prodArr, setProdArr] = useState([]);
  const [currentThumbnail, setCurrentThumbnail] = useState('');
  const [relatedIndex, setRelatedIndex] = useState(0);
  const [outfitIndex, setOutfitIndex] = useState(0);
  const [relatedPosition, setRelatedPosition] = useState();
  const [outfitPosition, setOutfitPosition] = useState();

  useEffect(() => {
    fetchProducts()
      .then(res => setProdArr(res))
      .catch(err => {
        throw (err);
      });
  }, []);


  const scrollToCard = (cardIndex, buttonId) => {
    buttonId.includes('related') ? setRelatedPosition(cardIndex * 238) : setOutfitPosition(cardIndex * 238);
  };

  const handleLeftClick = () => {
    const buttonId = event.target.id;
    const arrLength = prodArr.length - 1;

    if (buttonId.includes('related')) {
      if (-arrLength !== relatedIndex) {
        console.log(relatedIndex);
        setRelatedIndex((prevIndex) => {
          const newIndex = prevIndex - 1;
          scrollToCard(newIndex, buttonId);
          return newIndex;
        });
      }
    } else {
      if (-arrLength !== outfitIndex) {
        setOutfitIndex((prevIndex) => {
          const newIndex = prevIndex - 1;
          scrollToCard(newIndex, buttonId);
          return newIndex;
        });
      }
    }
  };

  const handleRightClick = () => {
    const buttonId = event.target.id;
    if (buttonId.includes('related')) {
      if (relatedIndex !== 0) {
        setRelatedIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          scrollToCard(newIndex, buttonId);
          return newIndex;
        });
      }
    } else {
      if (outfitIndex !== 0) {
        setOutfitIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          scrollToCard(newIndex, buttonId);
          return newIndex;
        });
      }
    }
  };

  return (
    <div id='widget'>
      <div className='carousel-title-container'><div className='carousel-title'>Related Items</div></div>
      <Related products={prodArr} fetchProducts={fetchProducts} handleLeftClick={handleLeftClick} handleRightClick={handleRightClick} scrollPosition={relatedPosition}/>
      <div className='carousel-title-container'><div className='carousel-title'>Your Outfit</div></div>
      <Outfit outfitItems={prodArr} handleLeftClick={handleLeftClick} handleRightClick={handleRightClick} scrollPosition={outfitPosition}/>
    </div>
  );

};

export default RelatedAndComparisons;