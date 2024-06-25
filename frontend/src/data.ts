// import { Event } from "./app/shared/Models/Event"
// import { Tag } from "./app/shared/Models/Tags"

// export const sample_event: Event[] = [
//   {
//     id:'1',
//     name: 'Music',
//     Time: '1:00 Am',
//     price: 10,
//     origins: ['italy'],
//     discription:"This is really great fun",
//     count:25,
//     imageUrl: '../assets/images/console.jpg',
//     tags: ['Songs', 'Party', 'Dance'],
//   },
//   {
//     id:'2',
//     name: 'Dance',
//     price: 20,
//     Time: '5:30 Pm',
//     origins: ['persia', 'middle east', 'china'],
//     discription:" this is realllldsay snjdnasndjknasjndjansnd",
//     count:30,
//     imageUrl: '../assets/images/console.jpg',
//     tags: ['Clasical', 'Dance'],
//   },
//   {
//     id:'3',
//     name: 'Birthday',
//     price: 5,
//     Time: '10:15 pm',
//     origins: ['germany', 'us'],
//     discription: " this is realllldsay snjdnasndjknasjndjansnd",
//     count:20,
//     imageUrl: '../assets/images/console.jpg',
//     tags: ['Songs', 'Dance'],
//   },
//   {
//     id:'4',
//     name: 'Wedding',
//     price: 2,
//     Time: '10:10 Pm',
//     origins: ['belgium', 'france'],
//     discription: " this is realllldsay snjdnasndjknasjndjansnd",
//     count:40,
//     imageUrl: '../assets/images/console.jpg',
//     tags: ['Songs', 'Wed'],
//   },
//   {
//     id:'5',
//     name: 'EDM',
//     price: 11,
//     Time: '4-30 Pm',
//     origins: ['india', 'asia'],
//     discription: " this is realllldsay snjdnasndjknasjndjansnd",
//     count:50,
//     imageUrl: '../assets/images/console.jpg',
//     tags: ['Clasical', 'EDM'],
//   },
//   {
//     id:'6',
//     name: 'Theater',
//     price: 9,
//     Time: '5:00 Pm',
//     origins: ['italy'],
//     discription: " this is realllldsay snjdnasndjknasjndjansnd",
//     count:23,
//     imageUrl: '../assets/images/console.jpg',
//     tags: ['Songs', 'Live', 'Dance'],
//   },
//   {
//     id:'7',
//     name: 'Theater',
//     price: 9,
//     Time: '5:00 Pm',
//     origins: ['italy'],
//     discription: " this is realllldsay snjdnasndjknasjndjansnd",
//     count:23,
//     imageUrl: '../assets/images/console.jpg',
//     tags: ['Songs', 'Live', 'Dance'],
//   },
// ]

// // Calculate tag counts dynamically based on sample_event
// const tagCounts: { [tag: string]: number } = {};
// let totalEvents = 0;
// sample_event.forEach(event => {
//   if (event.tags) {
//     totalEvents++;
//     event.tags.forEach(tag => {
//       if (tagCounts[tag]) {
//         tagCounts[tag]++;
//       } else {
//         tagCounts[tag] = 1;
//       }
//     });
//   }
// });

// // Create sample_tags array based on tagCounts
// const sample_tags: Tag[] = Object.entries(tagCounts).map(([name, count]) => ({
//   name,
//   count,
// }));

// // Add "All" tag with total count
// sample_tags.unshift({ name: 'All', count: totalEvents });

// export { sample_tags };
// // export const sample_tags:Tag[] = [
// //   { name: 'All', count: 6 },
// //   { name: 'Songs', count: 4 },
// //   { name: 'Live', count: 2 },
// //   { name: 'Dance', count: 3 },
// //   { name: 'Party', count: 2 },
// //   { name: 'Clasical', count: 1 },
// //   { name: 'EDM', count: 1 },
// //   { name: 'Wed', count: 1 },
// // ]