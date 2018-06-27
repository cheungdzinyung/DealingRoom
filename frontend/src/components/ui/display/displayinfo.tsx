// Importing modules from library
import * as React from "react";

export class DisplayInfo extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="display-data-info-container">
        <div className="youtube-container">
          <iframe
            src="https://www.youtube.com/embed/i0p1bmr0EmE"
            className="video"
            frameBorder={0}
          />
        </div>
      </div>
    );
  }
}
