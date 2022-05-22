import React, { Component } from "react";

class MusicButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      pause: true,
    };
    this.url =
      "https://docs.google.com/uc?export=open&id=1Fd-xxuLWWDkBd2HCdYB2gC0II7f4Lf-C";
    this.audio = new Audio(this.url);
  }

  toogle = () => {
    if (this.state.play === false) {
      this.setState({ play: true, pause: false });
      this.audio.play();
    } else {
      this.setState({ play: false, pause: true });
      this.audio.pause();
    }
  };

  render() {
    return (
      <div>
        <div active onClick={this.toogle}>
          {this.state.play ? <div>Pause</div> : <div>Play</div>}
        </div>
      </div>
    );
  }
}
export default MusicButton;
