const GenreTag: React.FC<{ genre: string }> = ({ genre }) => (
  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded">
    {genre}
  </span>
);

export default GenreTag;