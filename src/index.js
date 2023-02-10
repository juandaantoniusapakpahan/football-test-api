const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();
app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT: ${process.env.PORT}`);
});
