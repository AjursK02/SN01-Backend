const express = require("express")
const connectDB = require("./config/database")
require('dotenv').config();
const cookieParser = require("cookie-parser");
// const importRoute = require("./scripts/importCelebrity");
const celebRoutes = require("./scripts/importCelebrities");
const movieRoutes = require("./scripts/importMovies");
const influencerRoutes = require("./scripts/importInfluencers");
const tvShowRoutes = require("./scripts/importTvShows");
const designerRoutes = require("./scripts/importDesigners");
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require("./routes/authRoutes");
const statsRoutes = require("./routes/adminStatsRoutes")
const topOutfitsRoutes = require("./routes/topOutfitsRoutes")
const profileRoutes = require("./routes/profileRoutes");
const lookTrackerRoutes = require("./routes/lookTrackerRoutes");



const cors = require("cors");



const app = express();
// app.use(cors()); // Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:8080", // frontend dev URL
  credentials: true // allow cookies
}));

app.use(express.json());
app.use(cookieParser());

// app.use('/', importRoute);
app.use("/", celebRoutes); 
app.use("/", movieRoutes);
app.use("/", influencerRoutes)
app.use("/", tvShowRoutes)
app.use("/", designerRoutes)
app.use('/api/admin', adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin/stats", statsRoutes)
app.use("/api/topOutfits", topOutfitsRoutes)
app.use("/api/profile", profileRoutes);
app.use("/api/look-tracker", lookTrackerRoutes);




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
//     app.listen(3000, ()=>{
//     console.log("server is successfully listening on port 3000...")
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is successfully listening on port ${PORT}...`);
});
})
.catch((err)=>{
    console.error("database cannot be conncetd...")
    console.error(err);
})
