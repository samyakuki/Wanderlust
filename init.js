const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const Listing = require("./models/listing");

const data = [
    {
        title: "Luxury City Apartment",
        description: "Modern and luxurious apartment in the heart of the city.",
        image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 3000,
        location: "Downtown",
        country: "France",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Rustic Countryside Retreat",
        description: "Charming cottage nestled in the peaceful countryside.",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 9200,
        location: "Rural Village",
        country: "United Kingdom",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Seaside Villa with Pool",
        description: "Elegant villa with a private pool overlooking the sea.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 4000,
        location: "Seaside",
        country: "Italy",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Mountain View Chalet",
        description: "Cozy chalet with breathtaking views of the mountains.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 7800,
        location: "Mountain Range",
        country: "Switzerland",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Historic City Loft",
        description: "Spacious loft in a historic building with modern amenities.",
        image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 4500,
        location: "Old Town",
        country: "Germany",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Eco-Friendly Treehouse",
        description: "Unique treehouse experience surrounded by nature.",
        image: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 4000,
        location: "Forest",
        country: "Canada",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Serenity Lakeside Cabin",
        description: "Tranquil cabin by the lake for a peaceful getaway.",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 3800,
        location: "Lakeside",
        country: "Finland",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Urban Studio Loft",
        description: "Modern studio loft with urban views and close to amenities.",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 5500,
        location: "City Center",
        country: "United States",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Historic Manor House",
        description: "Stately manor house with a rich history and beautiful gardens.",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 5000,
        location: "Countryside",
        country: "England",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Beachfront Bungalow",
        description: "Quaint bungalow steps away from the beach with ocean views.",
        image: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 2200,
        location: "Beachfront",
        country: "Australia",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Mountain Lodge Retreat",
        description: "Rustic lodge retreat nestled in the mountains for nature lovers.",
        image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 2000,
        location: "Forest",
        country: "Norway",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "City Skyline Penthouse",
        description: "Luxurious penthouse with panoramic views of the city skyline.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 6000,
        location: "City Center",
        country: "United States",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Tranquil Riverside Cottage",
        description: "Charming cottage by the riverbank for a serene retreat.",
        image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 4400,
        location: "Riverbank",
        country: "New Zealand",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Eco-Friendly Treehouse",
        description: "Unique treehouse experience surrounded by nature.",
        image: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 6000,
        location: "Forest",
        country: "Indonesia",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Historic Chateau",
        description: "Elegant chateau with a grand history and stunning architecture.",
        image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 5700,
        location: "Countryside",
        country: "France",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Lakeside Cabin",
        description: "Rustic cabin with a picturesque view of the lake.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 4600,
        location: "Lakeside",
        country: "Canada",
        owner: '6689965ddb93ece896093dff',
    },
    {
        title: "Mountain View Chalet",
        description: "Cozy chalet with breathtaking views of the mountains.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 8800,
        location: "Mountain Range",
        country: "Nepal",
        owner: '6689965ddb93ece896093dff',
    }
];

Listing.insertMany(data)
    .then(() => {
        console.log("Data inserted successfully");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
