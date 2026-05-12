const {
  generateExcuseFromAI
} = require("../services/aiService");

const generateExcuse = async (req, res) => {

  try {

    const { context, category } = req.body;

    const result =
      await generateExcuseFromAI(
        context,
        category
      );

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Something went wrong"
    });

  }

};

module.exports = {
  generateExcuse
};