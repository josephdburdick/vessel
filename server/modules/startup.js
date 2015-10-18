let startup = () => {
  _setMailService()
  _setBrowserPolicies();
  _generateAccounts();
};

var _setBrowserPolicies = () => {};

var _generateAccounts = () => Modules.server.generateAccounts();

var _setMailService = () => Modules.server.setMailService();

Modules.server.startup = startup;
