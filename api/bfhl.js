export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method is allowed' });
  }

  try {
    const input = req.body.data;
    if (!Array.isArray(input)) {
      return res.status(400).json({ is_success: false, message: 'Input must be an array' });
    }

    const even = [];
    const odd = [];
    const alphabets = [];
    const specialChars = [];
    let sum = 0;
    let lettersOnly = [];

    input.forEach(item => {
      const str = String(item).trim();

      if (/^[0-9]+$/.test(str)) {
        const num = parseInt(str);
        if (num % 2 === 0) {
          even.push(str);
        } else {
          odd.push(str);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(str)) {
        alphabets.push(str.toUpperCase());
        lettersOnly.push(...str);
      } else {
        specialChars.push(str);
      }
    });

    // Reversed alternating caps string
    const concatString = lettersOnly
      .reverse()
      .map((ch, idx) => idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())
      .join('');

    const response = {
      is_success: true,
      user_id: "john_doe_17091999", // customize yours
      email: "john@xyz.com",        // your email
      roll_number: "ABCD123",       // your roll number
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ is_success: false, message: 'Something went wrong.' });
  }
 
}
