import React from 'react';

export default class Html extends React.Component {

  render() {
    const {webpackAssets, markup, state} = this.props;
    const appHtml = {__html: markup};
    const scriptHtml = {__html: `window._app_state_ = ${JSON.stringify(state)};`};

    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <title>example</title>
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={appHtml} />
          <script dangerouslySetInnerHTML={scriptHtml} />
          <script src={webpackAssets['client.js']} />
        </body>
      </html>
    );
  }

}
