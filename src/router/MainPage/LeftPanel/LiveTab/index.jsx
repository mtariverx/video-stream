import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { loadLiveStatus } from "../../../../action";
import LinkItem from "../LinkItem";

class LiveTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
    };
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const { selected } = this.state;
    const { mainPage } = nextProps;
    if (!selected && mainPage.liveContent && mainPage.liveContent.length) {
      this.setState(
        { selected: [mainPage.liveContent[0].name] },
        async () =>
          await this.props.loadLiveStatus(mainPage.liveContent[0].name)
      );
    }
  }

  onClick = (livename) => {
    this.props.loadLiveStatus(livename);
    this.setState({ selected: [livename] });
  };

  render() {
    const { mainPage } = this.props;
    const { selected } = this.state;
    // const lists = mainPage.liveContent.map(list => ({ child: [] }))
    return (
      <div className="live-tab">
        {mainPage.liveContent.map((list, key) => (
          <LinkItem
            title={list.name}
            key={key}
            keyArray={[]}
            linkInfo={{ child: [] }}
            onClick={() => this.onClick(list.name)}
            selected={selected}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ mainPage }) => ({
  mainPage,
});

export default withRouter(
  connect(mapStateToProps, {
    loadLiveStatus,
  })(LiveTab)
);
