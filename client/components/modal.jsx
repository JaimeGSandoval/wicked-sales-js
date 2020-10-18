import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsShowing: false,
      view: '',
      messageToUser: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      modalIsShowing: false
    });
  }

  componentDidMount() {
    const modalMessage = '';
    if (this.props.currentView === 'checkout') {
      this.messageToUser = 'Important Notice: Please Do Not Enter Any Personal Information When Filling Out This Form. It Is For Demonstration Purposes Only.';
    } else {
      this.messageToUser = 'Important Notice: This Site Is For Demonstration Purposes Only. None Of The Products Here Are Available For Purchase.';
    }

    this.setState({
      modalIsShowing: true,
      view: this.props.currentView,
      messageToUser: modalMessage

    });
  }

  render() {
    let cssClass = '';
    if (!this.state.modalIsShowing) {
      cssClass = 'hide';
    } else {
      cssClass = 'modal-overlay show';
    }

    return (
      <>
        <div className={cssClass}>
          <div className="modal-content col-sm-10 col-md-5 pt-3 pb-5">
            <p>{this.messageToUser}</p>
            <button className="modal-btn mt-2" onClick={this.handleClick}>Continue</button>
          </div>
        </div>
      </>
    );
  }
}

export default Modal;
