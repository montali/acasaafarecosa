module.exports = (req, res) => {
  const admin = require("firebase-admin");
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(Buffer.from(process.env.GOOGLE_JSON, "base64").toString())
      ),
    });
  }
  let db = admin.firestore();
  req.body.approved = false;
  req.body.nsfw = false;
  let addDoc = db
    .collection("tips")
    .add(req.body)
    .then((ref) => {
      res.status(200).json();
    });
};
