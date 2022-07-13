const express = require("express")
const {
    getMeals,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
} = require("../controller/mealController")
const router = express.Router()

//get wszystkich posiłków
router.get("/", getMeals)

//get pojeyńczego posiłku
router.get("/:id", getMeal)

//post na serwer stworzonego ćwiczenia
router.post("/", createMeal)

//usuwanie pojedyńczego ćwiczenia
router.delete("/:id", deleteMeal)

//uptade pojedyńczego ćwiczenia
router.patch("/:id", updateMeal)

module.exports = router