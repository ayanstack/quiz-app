import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Quiz from './models/Quiz.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const quizzes = [
  // ─── 1. General Science ───────────────────────────────────────────────────
  {
    title: '🔬 General Science Fundamentals',
    description: 'Test your knowledge of basic science concepts spanning physics, chemistry, and biology.',
    timeLimit: 300,
    isPublished: true,
    questions: [
      {
        question: 'What is the chemical symbol for gold?',
        options: ['Go', 'Gd', 'Au', 'Ag'],
        correctAnswer: 'Au',
      },
      {
        question: 'How many bones are in the adult human body?',
        options: ['196', '206', '216', '226'],
        correctAnswer: '206',
      },
      {
        question: 'What is the speed of light in a vacuum (approximately)?',
        options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
        correctAnswer: '300,000 km/s',
      },
      {
        question: 'What planet is known as the Red Planet?',
        options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
        correctAnswer: 'Mars',
      },
      {
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'],
        correctAnswer: 'Mitochondria',
      },
      {
        question: 'What gas do plants absorb from the atmosphere during photosynthesis?',
        options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
        correctAnswer: 'Carbon dioxide',
      },
      {
        question: 'What is the atomic number of carbon?',
        options: ['4', '6', '8', '12'],
        correctAnswer: '6',
      },
      {
        question: 'Which law states that for every action there is an equal and opposite reaction?',
        options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", 'Law of Gravity'],
        correctAnswer: "Newton's Third Law",
      },
      {
        question: 'What is the most abundant gas in Earth\'s atmosphere?',
        options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'],
        correctAnswer: 'Nitrogen',
      },
      {
        question: 'At what temperature does water boil at sea level?',
        options: ['90°C', '95°C', '100°C', '105°C'],
        correctAnswer: '100°C',
      },
    ],
  },

  // ─── 2. World History ─────────────────────────────────────────────────────
  {
    title: '🏛️ World History Challenge',
    description: 'Journey through key moments in world history from ancient civilizations to the modern era.',
    timeLimit: 360,
    isPublished: true,
    questions: [
      {
        question: 'In which year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        correctAnswer: '1945',
      },
      {
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
        correctAnswer: 'George Washington',
      },
      {
        question: 'The Great Wall of China was primarily built during which dynasty?',
        options: ['Han Dynasty', 'Tang Dynasty', 'Ming Dynasty', 'Qing Dynasty'],
        correctAnswer: 'Ming Dynasty',
      },
      {
        question: 'Which empire was ruled by Julius Caesar?',
        options: ['Greek Empire', 'Roman Empire', 'Ottoman Empire', 'Byzantine Empire'],
        correctAnswer: 'Roman Empire',
      },
      {
        question: 'In what year did the French Revolution begin?',
        options: ['1776', '1783', '1789', '1799'],
        correctAnswer: '1789',
      },
      {
        question: 'Who painted the Mona Lisa?',
        options: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Donatello'],
        correctAnswer: 'Leonardo da Vinci',
      },
      {
        question: 'Which country first sent a human to the Moon?',
        options: ['Soviet Union', 'United States', 'France', 'United Kingdom'],
        correctAnswer: 'United States',
      },
      {
        question: 'Who was the Egyptian queen who allied with Julius Caesar and Mark Antony?',
        options: ['Nefertiti', 'Hatshepsut', 'Cleopatra', 'Isis'],
        correctAnswer: 'Cleopatra',
      },
      {
        question: 'Which civilization built Machu Picchu?',
        options: ['Aztec', 'Maya', 'Inca', 'Olmec'],
        correctAnswer: 'Inca',
      },
      {
        question: 'In which year did the Berlin Wall fall?',
        options: ['1987', '1988', '1989', '1990'],
        correctAnswer: '1989',
      },
    ],
  },

  // ─── 3. JavaScript & Web Dev ──────────────────────────────────────────────
  {
    title: '💻 JavaScript & Web Development',
    description: 'Challenge yourself on JavaScript fundamentals, ES6+ features, and core web development concepts.',
    timeLimit: 300,
    isPublished: true,
    questions: [
      {
        question: 'Which keyword is used to declare a block-scoped variable in JavaScript?',
        options: ['var', 'let', 'const', 'both let and const'],
        correctAnswer: 'both let and const',
      },
      {
        question: 'What does DOM stand for?',
        options: ['Document Object Model', 'Data Object Module', 'Document Oriented Markup', 'Dynamic Object Management'],
        correctAnswer: 'Document Object Model',
      },
      {
        question: 'Which method is used to add an element to the end of a JavaScript array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 'push()',
      },
      {
        question: 'What is the correct HTTP status code for "Not Found"?',
        options: ['200', '301', '401', '404'],
        correctAnswer: '404',
      },
      {
        question: 'What does "=== " mean in JavaScript?',
        options: ['Assignment', 'Equality without type check', 'Strict equality (value and type)', 'Greater than or equal'],
        correctAnswer: 'Strict equality (value and type)',
      },
      {
        question: 'Which of the following is NOT a JavaScript framework/library?',
        options: ['React', 'Vue', 'Django', 'Angular'],
        correctAnswer: 'Django',
      },
      {
        question: 'What does CSS stand for?',
        options: ['Computer Style Sheets', 'Creative Style System', 'Cascading Style Sheets', 'Colorful Style Syntax'],
        correctAnswer: 'Cascading Style Sheets',
      },
      {
        question: 'Which method removes the last element from a JavaScript array?',
        options: ['shift()', 'pop()', 'splice()', 'slice()'],
        correctAnswer: 'pop()',
      },
      {
        question: 'What is the purpose of the "async/await" syntax in JavaScript?',
        options: ['To declare class methods', 'To handle asynchronous operations more cleanly', 'To create type definitions', 'To import modules'],
        correctAnswer: 'To handle asynchronous operations more cleanly',
      },
      {
        question: 'Which tag is used to link an external CSS file in HTML?',
        options: ['<style>', '<css>', '<link>', '<script>'],
        correctAnswer: '<link>',
      },
    ],
  },

  // ─── 4. Geography ─────────────────────────────────────────────────────────
  {
    title: '🌍 World Geography Quiz',
    description: 'Put your geographical knowledge to the test — capitals, countries, landmarks and more!',
    timeLimit: 300,
    isPublished: true,
    questions: [
      {
        question: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswer: 'Canberra',
      },
      {
        question: 'Which is the longest river in the world?',
        options: ['Amazon', 'Yangtze', 'Mississippi', 'Nile'],
        correctAnswer: 'Nile',
      },
      {
        question: 'Which country has the largest population in the world?',
        options: ['India', 'China', 'United States', 'Indonesia'],
        correctAnswer: 'India',
      },
      {
        question: 'What is the smallest country in the world by area?',
        options: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'],
        correctAnswer: 'Vatican City',
      },
      {
        question: 'Which ocean is the largest?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 'Pacific Ocean',
      },
      {
        question: 'What is the capital of Japan?',
        options: ['Osaka', 'Kyoto', 'Tokyo', 'Hiroshima'],
        correctAnswer: 'Tokyo',
      },
      {
        question: 'Which mountain range separates Europe from Asia?',
        options: ['Alps', 'Himalayas', 'Ural Mountains', 'Caucasus Mountains'],
        correctAnswer: 'Ural Mountains',
      },
      {
        question: 'The Sahara Desert is located on which continent?',
        options: ['Asia', 'South America', 'Australia', 'Africa'],
        correctAnswer: 'Africa',
      },
      {
        question: 'Which country does the Amazon rainforest primarily lie in?',
        options: ['Colombia', 'Peru', 'Brazil', 'Venezuela'],
        correctAnswer: 'Brazil',
      },
      {
        question: 'What is the capital of Canada?',
        options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
        correctAnswer: 'Ottawa',
      },
    ],
  },

  // ─── 5. Mathematics ───────────────────────────────────────────────────────
  {
    title: '➗ Mathematics Brain Teaser',
    description: 'Sharpen your math skills with algebra, geometry, and number theory questions.',
    timeLimit: 420,
    isPublished: true,
    questions: [
      {
        question: 'What is the value of π (pi) to two decimal places?',
        options: ['3.12', '3.14', '3.16', '3.18'],
        correctAnswer: '3.14',
      },
      {
        question: 'What is the square root of 144?',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12',
      },
      {
        question: 'Solve: 2x + 5 = 15. What is x?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '5',
      },
      {
        question: 'What is 15% of 200?',
        options: ['20', '25', '30', '35'],
        correctAnswer: '30',
      },
      {
        question: 'What is the sum of angles in a triangle?',
        options: ['90°', '180°', '270°', '360°'],
        correctAnswer: '180°',
      },
      {
        question: 'What is 9 factorial (9!)?',
        options: ['362880', '40320', '720', '5040'],
        correctAnswer: '362880',
      },
      {
        question: 'What is the next prime number after 13?',
        options: ['14', '15', '17', '19'],
        correctAnswer: '17',
      },
      {
        question: 'If a rectangle has a length of 8 and width of 5, what is its area?',
        options: ['26', '35', '40', '45'],
        correctAnswer: '40',
      },
      {
        question: 'What is the result of 2^10?',
        options: ['512', '1024', '2048', '256'],
        correctAnswer: '1024',
      },
      {
        question: 'What is the mean of: 4, 8, 12, 16, 20?',
        options: ['10', '12', '14', '16'],
        correctAnswer: '12',
      },
    ],
  },

  // ─── 6. Movies & Pop Culture ──────────────────────────────────────────────
  {
    title: '🎬 Movies & Pop Culture',
    description: 'How well do you know blockbuster movies, iconic characters, and pop culture moments?',
    timeLimit: 300,
    isPublished: true,
    questions: [
      {
        question: 'Which movie features the quote "I\'ll be back"?',
        options: ['RoboCop', 'The Terminator', 'Total Recall', 'Predator'],
        correctAnswer: 'The Terminator',
      },
      {
        question: 'Who directed the movie "Inception" (2010)?',
        options: ['Steven Spielberg', 'James Cameron', 'Christopher Nolan', 'Ridley Scott'],
        correctAnswer: 'Christopher Nolan',
      },
      {
        question: 'Which studio produced the Toy Story franchise?',
        options: ['DreamWorks', 'Universal', 'Pixar', 'Warner Bros'],
        correctAnswer: 'Pixar',
      },
      {
        question: 'What is the highest-grossing movie of all time (not adjusting for inflation)?',
        options: ['Avengers: Endgame', 'Avatar', 'Titanic', 'Star Wars: The Force Awakens'],
        correctAnswer: 'Avatar',
      },
      {
        question: 'In "The Lion King," what is Simba\'s father\'s name?',
        options: ['Scar', 'Mufasa', 'Rafiki', 'Timon'],
        correctAnswer: 'Mufasa',
      },
      {
        question: 'Which fictional wizard school does Harry Potter attend?',
        options: ['Beauxbatons', 'Durmstrang', 'Hogwarts', 'Ilvermorny'],
        correctAnswer: 'Hogwarts',
      },
      {
        question: 'What year was the first iPhone released?',
        options: ['2005', '2006', '2007', '2008'],
        correctAnswer: '2007',
      },
      {
        question: 'Which band performed "Bohemian Rhapsody"?',
        options: ['The Beatles', 'Led Zeppelin', 'Queen', 'Pink Floyd'],
        correctAnswer: 'Queen',
      },
      {
        question: 'What is the name of the Iron Man\'s AI assistant?',
        options: ['JARVIS', 'FRIDAY', 'HAL', 'ARIA'],
        correctAnswer: 'JARVIS',
      },
      {
        question: 'Which country produces the most movies per year?',
        options: ['United States', 'China', 'India', 'Japan'],
        correctAnswer: 'India',
      },
    ],
  },

  // ─── 7. Sports ────────────────────────────────────────────────────────────
  {
    title: '⚽ Sports World Quiz',
    description: 'From football to cricket, test your sports trivia across different disciplines.',
    timeLimit: 300,
    isPublished: true,
    questions: [
      {
        question: 'How many players are on a standard football (soccer) team on the field?',
        options: ['9', '10', '11', '12'],
        correctAnswer: '11',
      },
      {
        question: 'Which country won the first FIFA World Cup in 1930?',
        options: ['Brazil', 'Argentina', 'Uruguay', 'Italy'],
        correctAnswer: 'Uruguay',
      },
      {
        question: 'How many Grand Slam tennis tournaments are held each year?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
      },
      {
        question: 'In basketball, how many points is a regular field goal worth?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
      },
      {
        question: 'Which country has won the most Cricket World Cup titles?',
        options: ['India', 'Australia', 'West Indies', 'England'],
        correctAnswer: 'Australia',
      },
      {
        question: 'How many rings are on the Olympic flag?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '5',
      },
      {
        question: 'Which athlete has won the most Olympic gold medals?',
        options: ['Usain Bolt', 'Carl Lewis', 'Michael Phelps', 'Mark Spitz'],
        correctAnswer: 'Michael Phelps',
      },
      {
        question: 'In which sport is the term "love" used as a score?',
        options: ['Badminton', 'Squash', 'Tennis', 'Table Tennis'],
        correctAnswer: 'Tennis',
      },
      {
        question: 'How long is a standard marathon in kilometers?',
        options: ['40 km', '41.195 km', '42.195 km', '43 km'],
        correctAnswer: '42.195 km',
      },
      {
        question: 'What is the national sport of Canada?',
        options: ['Ice Hockey', 'Lacrosse', 'Both Ice Hockey and Lacrosse', 'Curling'],
        correctAnswer: 'Both Ice Hockey and Lacrosse',
      },
    ],
  },

  // ─── 8. Computer Science & AI ─────────────────────────────────────────────
  {
    title: '🤖 Computer Science & AI',
    description: 'Dive into algorithms, data structures, machine learning, and artificial intelligence concepts.',
    timeLimit: 360,
    isPublished: true,
    questions: [
      {
        question: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Computer Processing Utility', 'Central Program Unit', 'Core Processing Unit'],
        correctAnswer: 'Central Processing Unit',
      },
      {
        question: 'Which sorting algorithm has the best average-case time complexity?',
        options: ['Bubble Sort', 'Merge Sort', 'Selection Sort', 'Insertion Sort'],
        correctAnswer: 'Merge Sort',
      },
      {
        question: 'What is the binary representation of the decimal number 10?',
        options: ['1000', '1010', '1100', '0110'],
        correctAnswer: '1010',
      },
      {
        question: 'Which data structure follows LIFO (Last In, First Out)?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 'Stack',
      },
      {
        question: 'What does "AI" stand for?',
        options: ['Automated Intelligence', 'Artificial Intelligence', 'Algorithmic Intelligence', 'Applied Intelligence'],
        correctAnswer: 'Artificial Intelligence',
      },
      {
        question: 'Which programming language is primarily used for data science and machine learning?',
        options: ['Java', 'C++', 'Python', 'Ruby'],
        correctAnswer: 'Python',
      },
      {
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(log n)',
      },
      {
        question: 'What does HTTP stand for?',
        options: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'Hyper Transfer Text Process', 'HyperText Type Protocol'],
        correctAnswer: 'HyperText Transfer Protocol',
      },
      {
        question: 'Which company created the GPT series of language models?',
        options: ['Google', 'Meta', 'OpenAI', 'Anthropic'],
        correctAnswer: 'OpenAI',
      },
      {
        question: 'In machine learning, what is "overfitting"?',
        options: ['Model performs well on training data but poorly on new data', 'Model performs poorly on all data', 'Model trains too slowly', 'Model has too few parameters'],
        correctAnswer: 'Model performs well on training data but poorly on new data',
      },
    ],
  },

  // ─── 9. Biology & Human Body ──────────────────────────────────────────────
  {
    title: '🧬 Biology & Human Body',
    description: 'Explore the wonders of living organisms, genetics, and the incredible human body.',
    timeLimit: 300,
    isPublished: true,
    questions: [
      {
        question: 'What is the largest organ in the human body?',
        options: ['Liver', 'Brain', 'Skin', 'Heart'],
        correctAnswer: 'Skin',
      },
      {
        question: 'How many chambers does the human heart have?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
      },
      {
        question: 'What is the basic unit of life?',
        options: ['Organ', 'Tissue', 'Cell', 'Molecule'],
        correctAnswer: 'Cell',
      },
      {
        question: 'Which blood type is known as the "universal donor"?',
        options: ['A+', 'B-', 'AB+', 'O-'],
        correctAnswer: 'O-',
      },
      {
        question: 'What molecule carries genetic information in living organisms?',
        options: ['Protein', 'RNA', 'DNA', 'ATP'],
        correctAnswer: 'DNA',
      },
      {
        question: 'How many chromosomes do humans typically have?',
        options: ['23', '44', '46', '48'],
        correctAnswer: '46',
      },
      {
        question: 'What organ produces insulin in the human body?',
        options: ['Liver', 'Kidney', 'Pancreas', 'Spleen'],
        correctAnswer: 'Pancreas',
      },
      {
        question: 'Which part of the brain controls balance and coordination?',
        options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Hypothalamus'],
        correctAnswer: 'Cerebellum',
      },
      {
        question: 'What process do plants use to make food from sunlight?',
        options: ['Respiration', 'Fermentation', 'Photosynthesis', 'Digestion'],
        correctAnswer: 'Photosynthesis',
      },
      {
        question: 'What is the name of the process by which cells divide?',
        options: ['Meiosis', 'Mitosis', 'Both Meiosis and Mitosis', 'Osmosis'],
        correctAnswer: 'Both Meiosis and Mitosis',
      },
    ],
  },

  // ─── 10. Space & Astronomy ────────────────────────────────────────────────
  {
    title: '🚀 Space & Astronomy',
    description: 'Venture beyond Earth and test your knowledge of stars, planets, and the cosmos.',
    timeLimit: 300,
    isPublished: true,
    questions: [
      {
        question: 'Which planet is closest to the Sun?',
        options: ['Venus', 'Earth', 'Mercury', 'Mars'],
        correctAnswer: 'Mercury',
      },
      {
        question: 'How many planets are in our Solar System?',
        options: ['7', '8', '9', '10'],
        correctAnswer: '8',
      },
      {
        question: 'What is the name of the galaxy that contains our Solar System?',
        options: ['Andromeda Galaxy', 'Milky Way', 'Triangulum Galaxy', 'Sombrero Galaxy'],
        correctAnswer: 'Milky Way',
      },
      {
        question: 'Which planet has the most moons?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correctAnswer: 'Saturn',
      },
      {
        question: 'What is a light-year?',
        options: ['The time it takes light to travel from Sun to Earth', 'The distance light travels in one year', 'The age of a star', 'A unit of brightness'],
        correctAnswer: 'The distance light travels in one year',
      },
      {
        question: 'Who was the first human to walk on the Moon?',
        options: ['Buzz Aldrin', 'Yuri Gagarin', 'Neil Armstrong', 'John Glenn'],
        correctAnswer: 'Neil Armstrong',
      },
      {
        question: 'What type of celestial object is the Sun?',
        options: ['White Dwarf', 'Neutron Star', 'Yellow Dwarf Star', 'Red Giant'],
        correctAnswer: 'Yellow Dwarf Star',
      },
      {
        question: 'What is the name of NASA\'s most famous space telescope?',
        options: ['Kepler', 'Spitzer', 'Hubble', 'Chandra'],
        correctAnswer: 'Hubble',
      },
      {
        question: 'Which planet has a Great Red Spot?',
        options: ['Mars', 'Saturn', 'Neptune', 'Jupiter'],
        correctAnswer: 'Jupiter',
      },
      {
        question: 'What phenomenon occurs when the Moon passes between Earth and the Sun?',
        options: ['Lunar Eclipse', 'Solar Eclipse', 'Meteor Shower', 'Aurora'],
        correctAnswer: 'Solar Eclipse',
      },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    // ── Find or create admin user ────────────────────────────────────────────
    let admin = await User.findOne({ email: 'admin@quizhub.com' });
    if (!admin) {
      admin = await User.create({
        name: 'QuizHub Admin',
        email: 'admin@quizhub.com',
        password: 'Admin@123',
        role: 'admin',
      });
      console.log('✅ Admin user created  →  admin@quizhub.com / Admin@123');
    } else {
      console.log('ℹ️  Admin user already exists, skipping creation');
    }

    // ── Delete existing seeded quizzes and re-insert ──────────────────────
    const deleted = await Quiz.deleteMany({ createdBy: admin._id });
    console.log(`🗑️  Removed ${deleted.deletedCount} previously seeded quiz(zes)`);

    const quizzesWithAdmin = quizzes.map((q) => ({ ...q, createdBy: admin._id }));
    const inserted = await Quiz.insertMany(quizzesWithAdmin);
    console.log(`🎉 Successfully seeded ${inserted.length} quizzes!`);

    inserted.forEach((q, i) => console.log(`   ${i + 1}. ${q.title}`));
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
}

seed();
