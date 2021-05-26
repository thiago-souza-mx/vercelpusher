const Pusher = require('pusher');

const {
  APP_ID: appId,
  KEY: key,
  SECRET: secret,
  CLUSTER: cluster,
} = process.env;

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
});

module.exports = async (req, res) => {
 
  if(req.query.session){
    try {
      await new Promise((resolve, reject) => {
        pusher.trigger(
          'msg',
          req.query.session,
          {message:req.body},
          err => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
      res.status(200).end('sent event succesfully');
    } catch (e) {
      console.log(e.message);
    }
  }
  res.status(404);
};
