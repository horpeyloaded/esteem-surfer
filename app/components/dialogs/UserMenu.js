import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import UserAvatar from '../elements/UserAvatar';

class UserMenu extends Component {
  menuItemClicked = e => {
    const rel = e.target.getAttribute('rel');

    const { actions, closeFn } = this.props;

    if (rel === 'logout') {
      actions.deactivateAccount();
      closeFn();
    }
  };

  render() {
    const { accounts } = this.props;
    const { activeAccount } = accounts;
    const { accountData } = activeAccount;
    const { username } = activeAccount;

    let displayName;
    try {
      const jsonMeta = JSON.parse(accountData.json_metadata);
      displayName = jsonMeta.profile.name;
    } catch (e) {
      displayName = accountData.username;
    }

    return (
      <div className="user-menu-content">
        <div className="menu-header">
          <span className="display-name">{displayName}</span>
          <UserAvatar user={username} size="normal" />
        </div>

        <div className="user-menu-items">
          <a
            className="menu-item"
            rel="profile"
            role="none"
            onClick={this.menuItemClicked}
          >
            <span className="item-icon">
              <i className="mi">account_box</i>
            </span>{' '}
            <FormattedMessage id="user-menu.profile" />
          </a>
          <a
            className="menu-item"
            rel="bookmarks"
            role="none"
            onClick={this.menuItemClicked}
          >
            <span className="item-icon">
              <i className="mi">star_border</i>
            </span>{' '}
            <FormattedMessage id="user-menu.bookmarks" />
          </a>
          <a
            className="menu-item"
            rel="favorites"
            role="none"
            onClick={this.menuItemClicked}
          >
            <span className="item-icon">
              <i className="mi">favorite_border</i>
            </span>
            <FormattedMessage id="user-menu.favorites" />
          </a>
          <a
            className="menu-item"
            rel="favorites"
            role="none"
            onClick={this.menuItemClicked}
          >
            <span className="item-icon">
              <i className="mi">insert_drive_file</i>
            </span>
            <FormattedMessage id="user-menu.drafts" />
          </a>
          <a
            className="menu-item"
            rel="schedules"
            role="none"
            onClick={this.menuItemClicked}
          >
            <span className="item-icon">
              <i className="mi">today</i>
            </span>
            <FormattedMessage id="user-menu.schedules" />
          </a>
          <a
            className="menu-item"
            rel="gallery"
            role="none"
            onClick={this.menuItemClicked}
          >
            <span className="item-icon">
              <i className="mi">image</i>
            </span>
            <FormattedMessage id="user-menu.gallery" />
          </a>
          <a
            className="menu-item"
            rel="login-as"
            role="none"
            onClick={this.menuItemClicked}
          >
            <span className="item-icon">
              <i className="mi">supervisor_account</i>
            </span>
            <FormattedMessage id="user-menu.login-as" />
          </a>
          <a
            className="menu-item"
            rel="logout"
            role="none"
            onClick={this.menuItemClicked}
          >
            <span className="item-icon">
              <i className="mi">exit_to_app</i>
            </span>
            <FormattedMessage id="user-menu.logout" />
          </a>
        </div>
      </div>
    );
  }
}

UserMenu.propTypes = {
  actions: PropTypes.shape({
    deactivateAccount: PropTypes.func.isRequired
  }).isRequired,
  accounts: PropTypes.shape({
    activeAccount: PropTypes.instanceOf(Object)
  }).isRequired,
  closeFn: PropTypes.func.isRequired
};

export default UserMenu;