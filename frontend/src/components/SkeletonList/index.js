import Card from '../Card';
import './skeleton.styles.css';

const SkeletonList = ({ count = 3 }) => {
  return (
    <Card>
      <div className='skeleton-title shimmer'></div>
      <ul className='skeleton-list'>
        {Array.from({ length: count }).map((_, i) => (
          <li key={i} className='skeleton-item shimmer'></li>
        ))}
      </ul>
    </Card>
  );
};

export default SkeletonList;
