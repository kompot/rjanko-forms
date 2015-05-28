import React from 'react';

import {branch} from 'baobab-react/decorators';

@branch({
  cursors: {
    user: ['user']
  }
})
export default class User extends React.Component {

  render() {
    return (
      <div>
        {this.props.user.username}
      </div>
    );
  }

};
