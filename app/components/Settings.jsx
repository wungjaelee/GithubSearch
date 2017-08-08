var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var github = require('../api/githubSearch');

var Settings = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false,
      currentIndex: 0,
      repos: []
    }
  },

  handleNext: function () {
    var { currentIndex } = this.state;
    var { option3 } = this.props;
    if (currentIndex * option3 < 30) {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  },

  handlePrevious: function () {
    var { currentIndex } = this.state;
    var { option3 } = this.props;
    if (currentIndex * option3 > 0) {
      this.setState({
        currentIndex: this.state.currentIndex - 1
      });
    }
  },

  handleSearch: function () {
    var { searchRepo, option1, option2 } = this.props;
    var that = this;

    this.setState({
      isLoading: true,
      errorMessage: undefined,
      currentIndex: 0,
      repos: []
    });

    github.getRepos(searchRepo, option1, option2).then(function (repos) {
      that.setState({
        isLoading: false,
        repos
      })
    }, function (e) {
      that.setState({
        isLoading: false,
        errorMessage: e.message
      });
    });
  },

  renderLoadingOrTable: function () {
    if (this.state.isLoading) {
      return (
        <h3>Searching...</h3>
      );
    }
    return (
      this.renderTable()
    )
  },

  renderTable: function () {
    var { option3 } = this.props;
    var { repos, currentIndex } = this.state;
    function renderTableRows () {
      return (
        repos.map((repo, index) => {
          if (currentIndex * option3 <= index && index < (currentIndex+1) * option3)
          return (
            <tr>
              <td>{repo.full_name}</td>
              <td>{repo.description}</td>
              <td>{repo.html_url}</td>
            </tr>
          );
        })
      );
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    )
  },

  render: function () {
    var { dispatch, searchRepo, option1, option2, option3 } = this.props;
    option3 = option3.toString();
    return (
      <div>
        <div className="container__header">
          <div>
            <input
              type="search"
              ref="searchRepo"
              placeholder="Search repositories"
              value={searchRepo}
              onChange={() => {
                var searchRepo = this.refs.searchRepo.value;
                dispatch(actions.setSearchRepo(searchRepo));
              }}
            />
          </div>
          <div className="radio__container">
            <div>
              Name:
              <input
                type="radio"
                value="name"
                checked={option1 === "name"}
                onChange={(changeEvent) => {
                  dispatch(actions.setOption1(changeEvent.target.value));
                }}
              />
              Stars:
              <input
                type="radio"
                value="stars"
                checked={option1 === "stars"}
                onChange={(changeEvent) => {
                  dispatch(actions.setOption1(changeEvent.target.value));
                }}
              />
            </div>

            <div>
              Asc:
              <input
                type="radio"
                value="asc"
                checked={option2 === "asc"}
                onChange={(changeEvent) => {
                  dispatch(actions.setOption2(changeEvent.target.value));
                }}
              />
              Desc:
              <input
                type="radio"
                value="desc"
                checked={option2 === "desc"}
                onChange={(changeEvent) => {
                  dispatch(actions.setOption2(changeEvent.target.value));
                }}
              />
            </div>

            <div>
              10:
              <input
                type="radio"
                value="10"
                checked={option3 === "10"}
                onChange={(changeEvent) => {
                  dispatch(actions.setOption3(changeEvent.target.value));
                }}
              />
              20:
              <input
                type="radio"
                value="20"
                checked={option3 === "20"}
                onChange={(changeEvent) => {
                  dispatch(actions.setOption3(changeEvent.target.value));
                }}
              />
              30:
              <input
                type="radio"
                value="30"
                checked={option3 === "30"}
                onChange={(changeEvent) => {
                  dispatch(actions.setOption3(changeEvent.target.value));
                }}
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="button success"
              onClick={this.handleSearch}
            >
              Submit
            </button>
          </div>
        </div>
        {/* {this.renderTable()} */}
        {this.renderLoadingOrTable()}
        <div className="button__container">
          <button
            type="button"
            className="button hollow primary"
            onClick={this.handlePrevious}
          >
            Previous
          </button>
          <button
            type="button"
            className="button hollow success"
            onClick={this.handleNext}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
});

module.exports = connect(
  (state) => {
    return {
      searchRepo: state.searchRepo,
      option1: state.radio.option1,
      option2: state.radio.option2,
      option3: state.radio.option3
    };
  }
)(Settings);
