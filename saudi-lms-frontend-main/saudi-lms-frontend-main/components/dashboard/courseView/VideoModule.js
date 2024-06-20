import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const VideoModule = ({ modules, onVideoSelect }) => {
  const handleVideoSelect = (video) => {
    onVideoSelect(video);
  };

  const renderVideos = () => {
    return modules?.map((module, index) => (
      <Panel header={module?.name} key={index}>
        {module?.contents
          ?.sort((content) => content?.serialNo)
          ?.map((video) => (
            <>
              <div onClick={() => handleVideoSelect(video)}>
                {video?.videoTitle}
              </div>
            </>
          ))}
      </Panel>
    ));
  };

  return <Collapse>{renderVideos()}</Collapse>;
};

export default VideoModule;
