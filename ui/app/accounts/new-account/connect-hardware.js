const { Component } = require('react')
const PropTypes = require('prop-types')
const h = require('react-hyperscript')
const { connect } = require('react-redux')
const actions = require('../../actions')
const t = require('../../../i18n')

class ConnectHardware extends Component {
  render () {
    return (
      h('.new-account-create-form', [
        h('div', ['Connect your Ledger device before continuing']),
        h('div.new-account-create-form__buttons', {}, [

          h('button.new-account-create-form__button-cancel.allcaps', {
            onClick: () => this.props.goHome(),
          }, [
            t('cancel'),
          ]),

          h('button.new-account-create-form__button-create.allcaps', {
            onClick: () => this.props.connectHardwareWallet(),
          }, [
            t('connect'),
          ]),

        ]),
      ])
    )
  }
}

const mapStateToProps = state => {
  const { metamask: { network, selectedAddress, identities = {} } } = state
  const numberOfExistingAccounts = Object.keys(identities).length

  return {
    network,
    address: selectedAddress,
    numberOfExistingAccounts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    connectHardwareWallet: () => dispatch(actions.connectLedgerWallet()).then(
      () => dispatch(actions.goHome())
    ),
    showImportPage: () => dispatch(actions.showImportPage()),
    goHome: () => dispatch(actions.goHome()),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConnectHardware)
