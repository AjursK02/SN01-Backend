const express = require("express")
const connectDB = require("./config/database")
require('dotenv').config();

// const importRoute = require("./scripts/importCelebrity");
const celebRoutes = require("./scripts/importCelebrities");
const movieRoutes = require("./scripts/importMovies");
const influencerRoutes = require("./scripts/importInfluencers");
const tvShowRoutes = require("./scripts/importTvShows");
const adminRoutes = require('./routes/adminRoutes');




const cors = require("cors");



const app = express();
app.use(cors()); // Enable CORS for all routes

app.use(express.json());

// app.use('/', importRoute);
app.use("/", celebRoutes); // ✅ This registers /celebrity and /celebrity/insert
app.use("/", movieRoutes);
app.use("/", influencerRoutes)
app.use("/", tvShowRoutes)
app.use('/api/admin', adminRoutes);



// app.use('/hello', (req, res)=>{
//     res.send("hello hello hello hello hello")
// })

// app.use('/test', (req, res)=>{
//     res.send("hello from the test server")
// })

// app.use('/', (req, res)=>{
//     res.send("hello from the server......")
// })
connectDB()
.then(()=>{
    console.log("database connection established...");
    app.listen(3000, ()=>{
    console.log("server is successfully listening on port 3000...")
});
})
.catch((err)=>{
    console.error("database cannot be conncetd...")
    console.error(err);
})
