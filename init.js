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
      price: 120,
      location: "Rural Village",
      country: "United Kingdom",
    },
    {
      title: "Seaside Villa with Pool",
      description: "Elegant villa with a private pool overlooking the sea.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 400,
      location: "Seaside",
      country: "Italy",
    },
    {
      title: "Mountain View Chalet",
      description: "Cozy chalet with breathtaking views of the mountains.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 180,
      location: "Mountain Range",
      country: "Switzerland",
    },
    {
      title: "Historic City Loft",
      description: "Spacious loft in a historic building with modern amenities.",
      image: "https://example.com/image7.jpg",
      price: 250,
      location: "Old Town",
      country: "Germany",
    },
    {
      title: "Eco-Friendly Treehouse",
      description: "Unique treehouse experience surrounded by nature.",
      image: "https://example.com/image8.jpg",
      price: 100,
      location: "Forest",
      country: "Canada",
    },
    {
      title: "Serenity Lakeside Cabin",
      description: "Tranquil cabin by the lake for a peaceful getaway.",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 180,
      location: "Lakeside",
      country: "Finland",
    },
    {
      title: "Urban Studio Loft",
      description: "Modern studio loft with urban views and close to amenities.",
      image: "https://example.com/image10.jpg",
      price: 150,
      location: "City Center",
      country: "United States",
    },
    {
      title: "Historic Manor House",
      description: "Stately manor house with a rich history and beautiful gardens.",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 500,
      location: "Countryside",
      country: "England",
    },
    {
      title: "Beachfront Bungalow",
      description: "Quaint bungalow steps away from the beach with ocean views.",
      image: "https://example.com/image12.jpg",
      price: 220,
      location: "Beachfront",
      country: "Australia",
    },
    {
      title: "Mountain Lodge Retreat",
      description: "Rustic lodge retreat nestled in the mountains for nature lovers.",
      image: "https://example.com/image13.jpg",
      price: 200,
      location: "Forest",
      country: "Norway",
    },
    {
      title: "City Skyline Penthouse",
      description: "Luxurious penthouse with panoramic views of the city skyline.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 600,
      location: "City Center",
      country: "United States",
    },
    {
      title: "Tranquil Riverside Cottage",
      description: "Charming cottage by the riverbank for a peaceful retreat.",
      image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      price: 150,
      location: "Riverside",
      country: "New Zealand",
    },
    {
        title: "Cozy Mountain Cabin",
        description: "Warm and inviting cabin nestled in the mountains.",
        price: 180,
        location: "Mountain Range",
        country: "Canada",
      },
      {
        title: "Seaside Cottage Getaway",
        description: "Quaint cottage with ocean views for a relaxing escape.",
        price: 220,
        location: "Seaside",
        country: "Australia",
      },
      {
        title: "City Center Apartment",
        description: "Modern apartment in the heart of the city with easy access to attractions.",
        price: 250,
        location: "City Center",
        country: "United States",
      },
      {
        title: "Historic Townhouse",
        description: "Charming townhouse with period features and a cozy atmosphere.",
        price: 300,
        location: "Old Town",
        country: "United Kingdom",
      },
      {
        title: "Rural Farmhouse Retreat",
        description: "Tranquil farmhouse surrounded by fields and countryside views.",
        price: 120,
        location: "Rural Village",
        country: "France",
      },
      {
        title: "Lakeside Cabin Serenity",
        description: "Peaceful cabin by the lake for nature lovers seeking tranquility.",
        price: 180,
        location: "Lakeside",
        country: "Finland",
      },
      {
        title: "Urban Studio Living",
        description: "Compact studio with modern amenities for urban living.",
        price: 150,
        location: "City Center",
        country: "Germany",
      },
      {
        title: "Mountain View Chalet",
        description: "Scenic chalet with stunning views of the surrounding mountains.",
        price: 200,
        location: "Mountain Range",
        country: "Switzerland",
      },
      {
        title: "Beachfront Paradise",
        description: "Breathtaking beachfront property with direct access to the sandy shore.",
        price: 400,
        location: "Beachfront",
        country: "Italy",
      },
      {
        title: "Country Manor House",
        description: "Grand manor house with sprawling gardens and elegant interiors.",
        price: 500,
        location: "Countryside",
        country: "England",
      },
      {
        title: "Riverside Cabin Escape",
        description: "Cozy cabin retreat by the riverbank, perfect for relaxation.",
        price: 150,
        location: "Riverside",
        country: "New Zealand",
      },
      {
        title: "Modern City Loft",
        description: "Sleek and stylish loft apartment in a vibrant urban setting.",
        price: 300,
        location: "City Center",
        country: "Spain",
      },
      {
        title: "Eco-Friendly Retreat",
        description: "Environmentally conscious retreat with sustainable features.",
        price: 250,
        location: "Forest",
        country: "Norway",
      },
      {
        title: "Hilltop Villa Retreat",
        description: "Exclusive villa perched atop a hill with panoramic views.",
        price: 600,
        location: "Hilltop",
        country: "Greece",
      },
      {
        title: "Charming Countryside Cottage",
        description: "Charming cottage in a picturesque countryside setting.",
        price: 180,
        location: "Countryside",
        country: "Ireland",
      },
  ];
  
Listing.deleteMany({});  
Listing.insertMany(data);

