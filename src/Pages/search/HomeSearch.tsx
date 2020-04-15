import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import "./homesearch.css";

interface HomeSearchState {
  postCode: string;
  validSearch: boolean;
  alert: string;
  loading: boolean;
}

interface Props {}

class HomeSearch extends React.Component<Props, HomeSearchState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      postCode: "",
      validSearch: false,
      alert: "",
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleChange(e: any) {
    this.setState({
      postCode: e.target.value
    });
  }

  handleSearch(e: any) {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.state.postCode.length === 6) {
      this.setState({
        postCode: this.state.postCode,
        validSearch: true,
        loading: false
      });
    } else {
      this.setState({
        alert: "Please Enter a vaild postcode",
        loading: false
      });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="displayForm">
          <Spinner animation="border" variant="danger"></Spinner>
        </div>
      );
    }
    if (this.state.validSearch) {
      return <Redirect push to={`/home?${this.state.postCode}`} />;
    }
    return (
      <div className="displayForm">
        <Card className="searchForm">
          <Card.Body>
            <Form>
              <h1 className="searchTitle">
                Book your first driving lesson today
              </h1>
              <p className="searchText">
                Find most humble and experienced instructors near you.
              </p>
              <Row>
                <Col className="searchbox">
                  <Form.Control
                    size="lg"
                    type="search"
                    placeholder="Postcode"
                    value={this.state.postCode}
                    onChange={this.handleChange}
                  />
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={this.handleSearch}
                    className="buttonColor"
                  >
                    Search
                  </Button>
                </Col>
              </Row>
              <p className="searchAlert">{this.state.alert}</p>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default HomeSearch;
