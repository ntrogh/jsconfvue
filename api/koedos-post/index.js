const data = require('../shared/koedo-data');

function getUser(req) {
  console.log('getUser:');
  const header = req.headers["x-ms-client-principal"];
  if (header != undefined) {
    console.log(header);
    const encoded = Buffer.from(header, "base64");
    const decoded = encoded.toString("ascii");

    console.log(JSON.parse(decoded));

    return JSON.parse(decoded);
  } else {
    return 'John Doe';
  }
}

module.exports = async function (context, req) {
  const user = getUser(req);

  const koedo = {
    from: user,
    to: req.body.to,
    message: req.body.message,
  };

  try {
    const newKoedo = await data.addKoedo(koedo);
    context.res.status(201).json(newKoedo);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
