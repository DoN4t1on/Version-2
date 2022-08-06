const login = async (req, res) => {
  console.log(req.body);
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      return res.status(400).json({ message: 'All input is required' });
    }
    // Validate if user exist in our database
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    console.log('-----------------------');
    console.log(user);

    if (user && user.pass && (await bcrypt.compare(pass, user.pass))) {
      console.log(process.env.TOKEN_Time);
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_Time,
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({ status: true, data: user });
    } else {
      res.status(400).json({ message: 'invalid crendtial' });
    }
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
  // Our register logic ends here
};
