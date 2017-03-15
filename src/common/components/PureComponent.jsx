import shallowCompare from 'react-addons-shallow-compare';
import Component from './Component';

class PureComponent extends Component {
  constructor() {
    super();
    if (this.constructor === PureComponent) {
      throw new TypeError('Abstract class "PureComponent" cannot be instantiated directly.');
    }
  }

  // PureRenderMixin
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
}
export default PureComponent;
