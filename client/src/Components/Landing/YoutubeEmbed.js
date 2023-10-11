import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => (
  <iframe
    width="100%"
    height="100%"
    style={{ minHeight: "200px" }}
    src={`https://www.youtube.com/embed/${embedId}`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube"
  />
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
