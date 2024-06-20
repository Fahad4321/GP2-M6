import { Modal } from "antd";
import ReactPlayer from "react-player";

const VideoPlayerModal = ({ open, onCancel, contents }) => {
  return (
    <Modal
      open={open}
      title="Edit Course Module"
      okText={"Ok"}
      cancelText="Cancel"
      onCancel={onCancel}
      width={850}
    >
      {contents?.videoUrl ? (
        <ReactPlayer
          url={contents?.videoUrl}
          controls={true}
          width="100%"
          height="650px"
        />
      ) : (
        ""
      )}
    </Modal>
  );
};

export default VideoPlayerModal;
