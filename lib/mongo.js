const mongoose = require("mongoose");

const password = "56cwbNYUK39NNvgS";

const url = `mongodb+srv://maoraz:${password}@cluster0.mspehtz.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

const connection = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection open");
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

const metaSchema = new mongoose.Schema({
  user: String,
  date: String,
  postId: String,
  url: String,
});

const Meta = mongoose.models.Meta || mongoose.model("Meta", metaSchema);

export default function uploadMeta(userName, postId, date, videoUrl) {
  const meta = new Meta({
    user: userName,
    date: date,
    postId: postId,
    url: videoUrl,
  });

  meta
    .save()
    .then((result) => {
      console.log("meta saved!");
    })
    .catch((error) => {
      console.error("Error saving meta: ", error);
    });
}
