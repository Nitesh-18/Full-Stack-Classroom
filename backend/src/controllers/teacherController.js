import {User} from '../models/User.js'; // Assuming User model is defined

// Controller function to create a new teacher
const createTeacher = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Create a new user with the role of 'Teacher'
    const newTeacher = new User({
      name,
      email,
      password, // Make sure to hash the password before saving in production
      role: 'Teacher'
    });

    // Save the new teacher to the database
    await newTeacher.save();

    res.status(201).json(newTeacher);
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ error: 'Failed to create teacher' });
  }
};

export { createTeacher };
