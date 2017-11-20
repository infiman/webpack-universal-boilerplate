import React from 'react';
import GSAP from 'react-gsap-enhancer';
import { TweenMax, TimelineMax } from 'gsap';

function createAnim() {
  const box = document.getElementById('box');

  const timelineM = new TimelineMax(box);
  // TODO: why not chaining, why why why!
  const tween1 = TweenMax.to(box, 1, { scale: 1.5, y: '+120', yoyo: true });
  const tween2 = TweenMax.to(box, 1, { scale: 1, y: '-120', yoyo: true });
  timelineM.repeat(-1);
  timelineM.add([tween1, tween2], 0.5);
  return timelineM;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 300, y: 300 };
  }

  componentDidMount() {
    this.jumpAnim = this.addAnimation(createAnim);
  }

  render() {
    // TODO: utilize incorporating state into animation
    const { x, y } = this.state;

    const style = {
      backgroundColor: 'grey',
      width: 123,
      height: 123,
    };

    const containerStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: x,
      left: y,
    };

    return (
      <div style={containerStyle}>
        <div id={'box'} style={style} />
      </div>
    );
  }
}

const ConnectedApp = GSAP()(App);
export default ConnectedApp;
