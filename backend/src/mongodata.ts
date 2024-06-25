import mongoose from 'mongoose';
import EventModel from './models/Event';

const sample_event = [
    {
        id: '1',
        name: 'Music Concert',
        Time: '1:00 AM',
        price: 10,
        location: ['Italy'],
        description: "Experience the magic of live music with our Music Concert event. Join us for an unforgettable night filled with soulful melodies and energetic performances. Whether you're a fan of rock, pop, jazz, or classical music, there's something for everyone to enjoy. Don't miss out on this opportunity to create lasting memories with friends and family.",
        count: 25,
        imageUrl: '../assets/images/Alan Walker.png',
        tags: ['Songs', 'Exhibit', 'Comedy'],
      },
      {
        id: '2',
        name: 'Comedy Show',
        price: 20,
        Time: '5:30 PM',
        location: ['Persia', 'Middle East', 'China'],
        description: "Get ready to laugh until your sides hurt at our Comedy Show event. Featuring top comedians from around the world, this event promises non-stop entertainment and hilarious performances. From witty one-liners to hilarious anecdotes, our comedians will leave you in stitches. Book your tickets now for a night of laughter and fun!",
        count: 30,
        imageUrl: '../assets/images/console.jpg',
        tags: ['Theatre', 'Comedy'],
      },
      {
        id: '3',
        name: 'Birthday Celebration',
        price: 5,
        Time: '10:15 PM',
        location: ['Germany', 'US'],
        description: "Celebrate your special day with our Birthday Celebration event. Whether it's your own birthday or a loved one's, our event offers everything you need for a memorable celebration. Enjoy delicious food, lively music, and fun activities for guests of all ages. Let us make your birthday one to remember!",
        count: 20,
        imageUrl: '../assets/images/Beyodvan gogh card.png',
        tags: ['Songs', 'Comedy'],
      },
      {
        id: '4',
        name: 'Wedding Ceremony',
        price: 2,
        Time: '10:10 PM',
        location: ['Belgium', 'France'],
        description: "Experience the magic of love at our Wedding Ceremony event. Join us as we celebrate the union of two souls in matrimony. From the exchange of vows to the cutting of the cake, our event promises to be a beautiful and joyous occasion. Share in the love and happiness of the newlyweds as they begin their journey together.",
        count: 40,
        imageUrl: '../assets/images/guldasta card.png',
        tags: ['Songs', 'Wed'],
      },
      {
        id: '5',
        name: 'EDM Festival',
        price: 11,
        Time: '4:30 PM',
        location: ['India', 'Asia'],
        description: "Get ready to dance the night away at our EDM Festival event. Featuring top DJs and electronic music artists, this festival promises an electrifying experience like no other. Lose yourself in the pulsating beats and vibrant atmosphere as you party with thousands of music lovers. Don't miss out on the ultimate EDM experience!",
        count: 50,
        imageUrl: '../assets/images/console.jpg',
        tags: ['Theatre', 'EDM'],
      },
      {
        id: '6',
        name: 'Theater Performance',
        price: 9,
        Time: '5:00 PM',
        location: ['Italy'],
        description: "Experience the thrill of live theater with our Theater Performance event. From classic dramas to side-splitting comedies, our performances showcase the best in theatrical talent. Immerse yourself in captivating stories and mesmerizing performances that will leave you spellbound. Join us for an unforgettable evening of entertainment!",
        count: 23,
        imageUrl: '../assets/images/console.jpg',
        tags: ['Songs', 'Live', 'Comedy'],
      },
      {
        id: '7',
        name: 'Special Theater Event',
        price: 9,
        Time: '5:00 PM',
        location: ['Italy'],
        description: "Step into a world of wonder and imagination with our Special Theater Event. Featuring awe-inspiring performances and dazzling visual effects, this event promises an unforgettable experience for audiences of all ages. Join us as we transport you to fantastical realms and magical adventures. Don't miss out on this extraordinary theatrical spectacle!",
        count: 23,
        imageUrl: '../assets/images/exhibition.png',
        tags: ['Songs', 'Live', 'Comedy'],
      },
  // Add other event objects here
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/event');

    // Insert sample_event data into MongoDB
    await EventModel.insertMany(sample_event);

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// Call the seedDatabase function to insert sample data
seedDatabase();
