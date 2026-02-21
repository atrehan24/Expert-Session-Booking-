import Expert from "../models/Expert.js";

export const getExperts = async (req, res) => {
  try {
    const { page = 1, limit = 4, search = "", category } = req.query;

    const query = {
      name: { $regex: search, $options: "i" }
    };

    if (category) {
  query.category = { $regex: category, $options: "i" };
}

    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Expert.countDocuments(query);

    res.json({ experts, total });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    res.json(expert);
  } catch {
    res.status(404).json({ message: "Expert not found" });
  }
};