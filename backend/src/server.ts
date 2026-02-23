import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res ) => {
    res.json({ message: "Flowra API runnig" }); 
});

app.listen(PORT, () => {
    console.log(`Server runnibg on port ${PORT}`);
});