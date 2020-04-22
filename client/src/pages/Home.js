import React, { Component } from 'react';
import { Form, Input, FormBtn } from '../components/search';
import { RiskTitle, Address, Recommendation, LocationCard } from '../components/location';
import baseWebApi from '../services/baseWebApi';
import DenseTable from '../components/DenceTable';

class App extends Component {
  state = {
    input: '',
    locations: [],
    pageTitle: 'Covid Shopping Risk'
  }

  componentDidMount() {
    document.title = this.state.pageTitle;
  };

  handleInputChange = event => {
    const value = event.target.value;
    this.setState({ input: value });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.input) {
      baseWebApi.getLocationsRisk()
        .then(res => {
          this.setState({
            input: '',
            locations: res.data
          });
        })
        .catch(error => {
          let errorCode = error.status;
          if (errorCode !== 401 && errorCode >= 399 && errorCode < 500) {
            errorCode = 400;
          }
          switch (errorCode) {
            case 401:
            case 400:
              window.location.assign(`/`);//should make an error page if have time
              break;
            default:
              window.location.assign(`/`);
          }
          console.log(error);
        }
        )
    }
  };

  render() {
    return (
      <div className="app">
        <div className="container">
          {/* search form */}
          <div className="search">
            <h2 className="search-title">Where are you going?</h2>
            <Form handleFormSubmit={this.handleFormSubmit}>
              <Input
                value={this.state.input}
                onChange={this.handleInputChange}>
              </Input>
              <FormBtn />
            </Form>
          </div>
          {/* details table */}
          {this.state.locations.length ? (
            <div>
            {this.state.locations.map(location => (
            <LocationCard key={location.address}>
              <div className="risk-level-title">
                <h3>Current Risk Level: 
                  <RiskTitle>
                    <h3 style={{color:`${location.popularTimesLivePercent < 30? '#0d9a2e': 
                         location.popularTimesLivePercent < 60? '#ef8700':'#c30017'}`}}>
                          {location.popularTimesLivePercent<30?'Low':
                          location.popularTimesLivePercent<60?'Medium':'Red'}</h3>
                  </RiskTitle>
                </h3>
              </div>
              <div className="location-title">{location.title}</div>
              <Address>{location.address}</Address>
              <Recommendation>{location.recommendation}</Recommendation>
              <DenseTable location={location} />
              </LocationCard>
               )
              )}
            </div>
            ) : (<div></div>)}
        </div>
      </div>
    );
  }
}

export default App;
