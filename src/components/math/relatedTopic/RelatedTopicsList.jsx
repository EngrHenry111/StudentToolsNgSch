const RelatedTopicsList = ({ topics }) => {
  return (
    <div className="related-topics">
      <h4>Related Topics</h4>

      <div className="tags">
        {topics.map((t, i) => (
          <span key={i} className="tag">{t}</span>
        ))}
      </div>
    </div>
  );
};

export default RelatedTopicsList;