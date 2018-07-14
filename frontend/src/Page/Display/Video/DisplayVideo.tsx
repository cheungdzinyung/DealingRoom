// Importing modules from library
import * as React from "react";

export class DisplayVideo extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="display-data-info-container">
        <div className="youtube-container">
          <iframe
            // src="https://www.youtube.com/embed/MEePYLF9Uzs"
            src="https://www.youtube.com/embed/Ga3maNZ0x0w"
            className="video"
            frameBorder={0} 
          />
        </div>
      </div>
    );
  }
}
