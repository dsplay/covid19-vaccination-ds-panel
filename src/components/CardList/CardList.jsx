import React from 'react';
import Card from '../Card/Card';

const cards = [
  {
    label: 'Casos Confirmados',
    value: 14779529,
  },
  {
    label: 'Mortes',
    value: 408829,
  },
  {
    label: 'Recuperados',
    value: 13135143,
  },
  {
    label: 'Vacinados',
    value: 14120523,
  },
];

function CardList() {
  const renderedCards = cards.map((card) => (
    <Card key={card.label} title={card.label} value={card.value} />
  ));

  return renderedCards;
}

export default CardList;
