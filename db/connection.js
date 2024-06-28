const mongoose =require("mongoose");

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("____MongoDB Server Connected____");
}).catch(err=>{
    console.log(`___MongoDB Server Not Connected reason::${err}___`);
})
