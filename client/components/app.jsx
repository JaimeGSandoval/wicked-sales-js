import React from 'react';
import Header from './header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {

    return (
      <>
        <Header />
        <div className="container col-sm-12 col-md-10 col-lg-9">
        </div>
      </>
    );

    // return this.state.isLoading
    //   ? <h1>Testing connections...</h1>
    //   : <h1>{ this.state.message }</h1>;
  }
}
