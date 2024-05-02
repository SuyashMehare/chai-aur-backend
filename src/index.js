import { app } from "./app.js";
import connectDB from "./db/index.js";



connectDB()
.then(
    () =>{
        
    const port = process.env.PORT || 8000;

    app.listen(port ,async() => {
        console.log(`server is running ar port ${port}`);
    })
    }
)
.catch((error) => {
    console.error('MONGO DB connection failed!!!...',error);
})
