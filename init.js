const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


const Listing=require("./models/listing");

const data = [
    {
      title: "Luxury City Apartment",
      description: "Modern and luxurious apartment in the heart of the city.",
      image:"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 3000,
      location: "Downtown",
      country: "France",
    },
    {
      title: "Rustic Countryside Retreat",
      description: "Charming cottage nestled in the peaceful countryside.",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 1200,
      location: "Rural Village",
      country: "United Kingdom",
    },
    {
      title: "Seaside Villa with Pool",
      description: "Elegant villa with a private pool overlooking the sea.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 4000,
      location: "Seaside",
      country: "Italy",
    },
    {
      title: "Mountain View Chalet",
      description: "Cozy chalet with breathtaking views of the mountains.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 1800,
      location: "Mountain Range",
      country: "Switzerland",
    },
    {
      title: "Historic City Loft",
      description: "Spacious loft in a historic building with modern amenities.",
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      price: 2500,
      location: "Old Town",
      country: "Germany",
    },
    {
      title: "Eco-Friendly Treehouse",
      description: "Unique treehouse experience surrounded by nature.",
      image: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      price: 1000,
      location: "Forest",
      country: "Canada",
    },
    {
      title: "Serenity Lakeside Cabin",
      description: "Tranquil cabin by the lake for a peaceful getaway.",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 1800,
      location: "Lakeside",
      country: "Finland",
    },
    {
      title: "Urban Studio Loft",
      description: "Modern studio loft with urban views and close to amenities.",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    
      price: 1500,
      location: "City Center",
      country: "United States",
    },
    {
      title: "Historic Manor House",
      description: "Stately manor house with a rich history and beautiful gardens.",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 5000,
      location: "Countryside",
      country: "England",
    },
    {
      title: "Beachfront Bungalow",
      description: "Quaint bungalow steps away from the beach with ocean views.",
      image: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 2200,
      location: "Beachfront",
      country: "Australia",
    },
    {
      title: "Mountain Lodge Retreat",
      description: "Rustic lodge retreat nestled in the mountains for nature lovers.",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    
      price: 2000,
      location: "Forest",
      country: "Norway",
    },
    {
      title: "City Skyline Penthouse",
      description: "Luxurious penthouse with panoramic views of the city skyline.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 6000,
      location: "City Center",
      country: "United States",
    },
    {
      title: "Tranquil Riverside Cottage",
      description: "Charming cottage by the riverbank for a peaceful retreat.",
      image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      price: 1500,
      location: "Riverside",
      country: "New Zealand",
    },
    {
        title: "Cozy Mountain Cabin",
        description: "Warm and inviting cabin nestled in the mountains.",
        image: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    
        price: 1800,
        location: "Mountain Range",
        country: "Canada",
      },
      {
        title: "Seaside Cottage Getaway",
        description: "Quaint cottage with ocean views for a relaxing escape.",
        image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 2200,
        location: "Seaside",
        country: "Australia",
      },
      {
        title: "City Center Apartment",
        description: "Modern apartment in the heart of the city with easy access to attractions.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 2500,
        location: "City Center",
        country: "United States",
      },
      {
        title: "Historic Townhouse",
        description: "Charming townhouse with period features and a cozy atmosphere.",
        image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 3000,
        location: "Old Town",
        country: "United Kingdom",
      },
      {
        title: "Rural Farmhouse Retreat",
        description: "Tranquil farmhouse surrounded by fields and countryside views.",
        image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 1200,
        location: "Rural Village",
        country: "France",
      },
      {
        title: "Lakeside Cabin Serenity",
        description: "Peaceful cabin by the lake for nature lovers seeking tranquility.",
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 1800,
        location: "Lakeside",
        country: "Finland",
      },
      {
        title: "Urban Studio Living",
        description: "Compact studio with modern amenities for urban living.",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 1500,
        location: "City Center",
        country: "Germany",
      },
      {
        title: "Mountain View Chalet",
        description: "Scenic chalet with stunning views of the surrounding mountains.",
        image: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 2000,
        location: "Mountain Range",
        country: "Switzerland",
      },
      {
        title: "Beachfront Paradise",
        description: "Breathtaking beachfront property with direct access to the sandy shore.",
        image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 4000,
        location: "Beachfront",
        country: "Italy",
      },
      {
        title: "Country Manor House",
        description: "Grand manor house with sprawling gardens and elegant interiors.",
        image: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 5000,
        location: "Countryside",
        country: "England",
      },
      {
        title: "Riverside Cabin Escape",
        description: "Cozy cabin retreat by the riverbank, perfect for relaxation.",
        image: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 1500,
        location: "Riverside",
        country: "New Zealand",
      },
      {
        title: "Modern City Loft",
        description: "Sleek and stylish loft apartment in a vibrant urban setting.",
        image: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 3000,
        location: "City Center",
        country: "Spain",
      },
      {
        title: "Eco-Friendly Retreat",
        description: "Environmentally conscious retreat with sustainable features.",
        image: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 2500,
        location: "Forest",
        country: "Norway",
      },
      {
        title: "Hilltop Villa Retreat",
        description: "Exclusive villa perched atop a hill with panoramic views.",
        image: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 6000,
        location: "Hilltop",
        country: "Greece",
      },
      {
        title: "Charming Countryside Cottage",
        description: "Charming cottage in a picturesque countryside setting.",
        image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 1800,
        location: "Countryside",
        country: "Ireland",
      },
  ];
  
Listing.deleteMany({});  
Listing.insertMany(data);

