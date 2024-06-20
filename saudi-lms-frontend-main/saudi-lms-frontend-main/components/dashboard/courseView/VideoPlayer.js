import ReactPlayer from "react-player";

const VideoPlayer = ({ video }) => {
  return (
    <>
      <ReactPlayer
        url={video?.videoUrl}
        controls={true}
        width="100%"
        height="650px"
      />
    </>
  );
};

export default VideoPlayer;
