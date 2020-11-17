const React = require('react');

const VideoListEntry = ({ videos }) => {
  return (
    <div>
      {videos.map((video) => {
        return (
          <div>
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.description}</p>
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
              <img src={video.snippet.thumbnails.default.url} />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default VideoListEntry;
