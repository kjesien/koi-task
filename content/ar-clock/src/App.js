import React from "react";
import axios from "axios";
import "./App.css";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.tick();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  formatDateTime() {
    return `${this.state.date.toLocaleDateString()} ${this.state.date.toLocaleTimeString()}`;
  }

  render() {
    return <h2>{this.formatDateTime()}</h2>;
  }
}

class ArPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { price: 0 };
  }

  fetchCurrentPrice() {
    axios.get("https://api.coingecko.com/api/v3/coins/arweave").then((res) => {
      this.setState({ price: res.data?.market_data.current_price.usd });
    });
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.fetchCurrentPrice(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div>
        <h3>AR price</h3>
        <h1>{this.state.price} USD</h1>
      </div>
    );
  }
}
function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Clock />
        <ArPrice />
      </div>
    </div>
  );
}

export default App;
