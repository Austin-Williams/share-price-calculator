import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      probInvalid: 25,
      probValid: 75,
      probYesGivenValid: 50,
      probNoGivenValid: 50,
      probYes: 37.5,
      probNo: 37.5
    };

    this.changeProbInvalid = this.changeProbInvalid.bind(this);
    this.changeProbYesGivenValid = this.changeProbYesGivenValid.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState = () => {
    console.log("called");
    let probValid = 100 - this.state.probInvalid;
    console.log("probValid is ", probValid);

    this.setState({
      probValid: probValid
    });
  };

  changeProbInvalid(event) {
    let probInvalid = event.target.value;
    let probValid = 100 - event.target.value;
    let probYesGivenValid = this.state.probYesGivenValid;
    let probNoGivenValid = 100 - this.state.probYesGivenValid;
    let probYes =
      ((100 - event.target.value) * this.state.probYesGivenValid) / 100;
    let probNo =
      ((100 - event.target.value) * (100 - this.state.probYesGivenValid)) / 100;

    this.setState({
      probInvalid,
      probValid,
      probYesGivenValid,
      probNoGivenValid,
      probYes,
      probNo
    });
  }

  changeProbYesGivenValid(event) {
    let probYesGivenValid = event.target.value;
    let probNoGivenValid = 100 - event.target.value;
    let probYes = (this.state.probValid * event.target.value) / 100;
    let probNo = (this.state.probValid * (100 - event.target.value)) / 100;

    this.setState({
      probYesGivenValid,
      probNoGivenValid,
      probYes,
      probNo
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Header Section">
          <h1 className="App-title">Augur Share Price Calculator</h1>
          <p className="App-intro">
            Infers breakeven Yes/No share price from user assumptions.
          </p>
        </div>

        <Form className="Section">
          <h2>Assumptions</h2>
          <Form.Group>
            <Form.Input
              label="With what probability (%) do you think the market will resolve
              as Invalid?"
              type="number"
              placeholder="50"
              value={this.state.probInvalid}
              onChange={this.changeProbInvalid}
            />
            <Form.Input
              label="Assuming the market DOES NOT resolve as Invalid, with what
              probability (%) do you think the market will resolve as Yes?"
              type="number"
              placeholder="50"
              value={this.state.probYesGivenValid}
              onChange={this.changeProbYesGivenValid}
            />
          </Form.Group>
        </Form>
        <div className="Summary Section">
          <h2>Results</h2>
          <div>P[Invalid] = {this.state.probInvalid}%</div>
          <div>P[Valid] = {this.state.probValid}%</div>
          <div>P[Yes | Valid] = {this.state.probYesGivenValid}%</div>
          <div>P[No | Valid] = {this.state.probNoGivenValid}%</div>
          <div>P[Yes] = {this.state.probYes}%</div>
          <div>P[No] = {this.state.probNo}%</div>
          <div className="emphasize">
            Breakeven price of a Yes share ={" "}
            {(this.state.probYes + 0.5 * this.state.probInvalid) / 100} ETH
          </div>
          <div className="emphasize">
            Breakeven price of a No share ={" "}
            {(this.state.probNo + 0.5 * this.state.probInvalid) / 100} ETH
          </div>
        </div>

        <div className="Section">
          <h2>Explanation</h2>
          <p>
            If your assumptions are correct, then your expected value is
            positive for the following actions:
          </p>
          <ul>
            <li>
              buying Yes shares for less than{" "}
              {(this.state.probYes + 0.5 * this.state.probInvalid) / 100} ETH
            </li>
            <li>
              selling Yes shares for more than{" "}
              {(this.state.probYes + 0.5 * this.state.probInvalid) / 100} ETH
            </li>
            <li>
              buying No shares for less than{" "}
              {(this.state.probNo + 0.5 * this.state.probInvalid) / 100} ETH
            </li>
            <li>
              selling No shares for more than{" "}
              {(this.state.probNo + 0.5 * this.state.probInvalid) / 100} ETH
            </li>
          </ul>
          <p>
            <b>
              Why isn't the breakeven price of a Yes share always exactly P[Yes]
              ETH?
            </b>
            <br />
            In most common prediction markets it is the case that "price =
            probability". However, the current version of Augur (as of Spetember
            2018) has a special property: it will pay out 0.5 ETH for both Yes
            and No shares in the event that a Yes/No market resolves as Invalid.
            This means that the classic "price = probability" theorem doesn't
            hold here. In particular, if P[Invalid] > 0 then the breakeven price
            of a Yes share will not equal P[Yes]. The same can be said for the
            price/probability of No. This tool takes into consideration the way
            Augur pays out when the market resolves Invalid, and computes the
            breakeven price for Yes and No shares.
          </p>
        </div>

        <div className="Section">
          <h2>Disclaimer</h2>
          <p>
            This is a toy. I don't guarantee the accuracy of any of this. Use at
            your own risk.
          </p>
        </div>
        <footer className="Section">
          <a href="https://github.com/Austin-Williams/share-price-calculator">
            <img className="ghimg" src="./gh.png" />
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
