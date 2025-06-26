import './search.styles.css';

const SearchInput = ({ value, onChange, placeholder = "Search items..." }) => {
  return (
    <div className="search-input-wrapper">
      <input
        type="text"
        name='search'
        aria-label="Search"
        autoComplete="off"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <span className="search-icon">🔍</span>
    </div>
  );
};

export default SearchInput;
