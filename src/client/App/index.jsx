import React from 'react';
import GSAP from 'react-gsap-enhancer';
import { TimelineMax } from 'gsap';

function createAnim() {
  const box = document.getElementById('box');
  const box1 = document.getElementById('box1');

  // add api is not working for me
  // however you can sequencing different animation on timelineMax directly
  const timelineM = new TimelineMax({ repeat: -1 });
  timelineM.to(box, 1, { scale: 1.23, y: '+120' });
  timelineM.to(box, 1, { scale: 1, y: '0' });
  timelineM.to(box, 1, { rotation: 90 }, 1);

  // https://greensock.com/docs/TimelineMax/add() with multiple tweens it doesn't sequeece
  // todo: work in jsfiddle mismatch? https://jsfiddle.net/veke646L/7/
  const tween1 = (box1, 1, { scale: 1.23, y: '+120' });
  const tween2 = (box1, 1, { scale: 1, y: '0' });
  const tween3 = (box1, 1, { rotation: 90 }, 1);

  timelineM.add([tween1, tween2, tween3], '', '', 0.5);

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
      backgroundColor: 'pink',
      width: 123,
      height: 123,
    };

    const containerStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: x,
      left: y,
      display: 'flex',
    };

    return (
      <div style={containerStyle}>
        <div id={'box'} style={style} />
        <div id={'box1'} style={Object.assign({}, style, { backgroundColor: 'grey' })} />
      </div>
    );
  }
}

const ConnectedApp = GSAP()(App);
export default ConnectedApp;
