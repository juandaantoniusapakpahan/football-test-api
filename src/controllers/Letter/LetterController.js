const BigPromise = require("../../middlewares/bigPromise");

exports.containLetter = BigPromise(async (req, res, next) => {
  try {
    const { first_word, second_word } = req.body;

    for (let i = 0; i < first_word.length; i++) {
      if (!second_word.includes(first_word[i])) {
        res.status(200).json({ value: false });
        break;
      }
    }
    res.status(200).json({ value: true });
  } catch (error) {
    next(error);
  }
});
