const Meal = require("../models/mealsModels")
const mongoose = require("mongoose")
const { json } = require("express")

//pobieranie wszystkich posiłków
const getMeals = async (req, res)=>{
    const meals = await Meal.find({}).sort({createdAt: -1})
    res.status(200).json(meals)
}

//pobieranie jednego posiłku
const getMeal = async (req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Nie ma takiego posiłku"})
    }

    const meal = await Meal.findById(id)

    if(!meal){
        return res.status(404).json({error:"Nie ma takiego posiłku"})
    }

    res.status(200).json(meal)
}

//twożenie własnego posiłku
const createMeal = async (req, res)=>{
    const {title, composition, hour} = req.body
//sprawdzanie czy pola obowiązkowe są wypełnione
    let emptyFields = []
    if(!title){
        emptyFields.push("title")
    }
    if(!composition){
        emptyFields.push("composition")
    }
    if(!hour){
        emptyFields.push("hour")
    }
    if(emptyFields.length > 0){
        res.status(400).json({error:"Wszystkie pola są obowiązkowe", emptyFields})
    }

    //dodawanie do bazy danych
    try{
    const meal = await Meal.create({title, composition, hour})
    res.status(200).json(meal)
    }
    catch(error){
    res.status(400).json({error: error.message})
    }
}

//usuwanie posiłku
const deleteMeal = async (req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error:"Nie ma takiego ćwiczenia"})
    }

    const meal = await Meal.findByIdAndDelete({_id:id})

    if(!meal){
        return res.status(400).json({error:"Nie ma takiego ćwiczenia"})
    }

    res.status(200).json(meal)
}

//update`owanie ćwiczenia
const updateMeal = async (req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({error:"Nie ma takiego posiłku"})
    }

    const meal = await Meal.findByIdAndUpdate({_id:id}, {
        ...req.body
    })

    if(!meal){
        return res.status(400).json({error:"Nie ma takiego posiłku"})
    }

    res.status(200).json(meal)
}

module.exports={
    getMeals,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
}