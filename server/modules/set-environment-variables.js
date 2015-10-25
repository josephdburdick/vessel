let setEnvironmentVariables = ( ) => {
  let settings__mail_url = Meteor.settings.private.services.mailgun.mail_url,
      env__mail_url = process.env.MAIL_URL,
      env__mail_urlPass = process.env.MAIL_URL_PASS;

      settings__mail_url = `smtp://${env__mail_url}:${env__mail_urlPass}@smtp.mailgun.org:587`;
};

Modules.server.setEnvironmentVariables = setEnvironmentVariables;
