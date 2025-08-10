import React from 'react';

const Title = ({ text, level = 1, className = "text-2xl font-bold mb-4" }) => {
  const Heading = `h${level}`;
  return <Heading className={`title ${className}`}>{text}</Heading>;
};

export default Title;