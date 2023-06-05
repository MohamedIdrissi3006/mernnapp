const express = require('express');
const router = express.Router();
router.post('/foodData',(req,res)=>{
    try{
        let resil = {
            foodItems: global.food_items,
            foodCategory: global.food_category
          };
          const categoryNames = resil.foodCategory.map(category => category.CategoryName);

        res.send(resil)
    }catch(error){
        console.log(error.message)
        res.send("Server Error")
    }

    
})

module.exports = router;