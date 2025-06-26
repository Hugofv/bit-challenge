import './card.styles.css';

const Card = ({ children, styles }) => {
  return (
    <div className='card-container' style={styles}>
      {children}
    </div>
  );
};

export default Card;
