module.exports = (req, res) => {
  const admin = require("firebase-admin");
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(Buffer.from(process.env.GOOGLE_JSON, "base64").toString())
      )
    });
  }

  let db = admin.firestore();
  let dbRef = db.collection("tips");
  var key = dbRef.doc().id;

  let queryRef = dbRef
    .where("approved", "==", true)
    .where(admin.firestore.FieldPath.documentId(), ">=", key)
    .limit(1);

  let query = queryRef
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        let queryRetry = dbRef
          .where("approved", "==", true)
          .where(admin.firestore.FieldPath.documentId(), "<", key)
          .limit(1)
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              res.status(404).send();
              return;
            }
            snapshot.forEach(doc => {
              res.status(200).json(doc.data());
              return;
            });
          })
          .catch(error => {
            res.status(500).send(error);
          });
      }
      snapshot.forEach(doc => {
        res.status(200).json(doc.data());
        return;
      });
    })
    .catch(error => {
      res.status(500).send(error);
    });
};
