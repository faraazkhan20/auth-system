const supabase = require("../supabaseClient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // const { data, error } = await supabase.from("users").insert([{ email, password: hashedPassword }]);
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hashedPassword }])
    .select()
    .single();

  if (error) {
    console.error(error); // log the actual error
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: "User signed up", user: data });
  // console.log(data);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.from("users").select("*").eq("email", email).single();

  if (error || !data) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, data.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ id: data.id }, "secretkey", { expiresIn: "1h" });

  res.status(200).json({ message: "Login successful", token });
  // console.log(token);
};

module.exports = { signupUser, loginUser };
