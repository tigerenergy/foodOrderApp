import React, { useEffect, useState } from 'react'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'
import Card from '../UI/Card'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true)
      const response = await fetch('https://react-http-a3d8c-default-rtdb.firebaseio.com/meals.json')

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const responseData = await response.json()

      const loadedMeals = []

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }
    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  if (httpError) {
    return (
      <>
        <section className={classes.MealsError}>
          <p>{httpError}</p>
        </section>
      </>
    )
  }

  const mealsList = meals.map((meal) => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />)

  return (
    <>
      {isLoading ? (
        <section className={classes.MealsLoading}>
          <p>Loading...</p>
        </section>
      ) : (
        <section className={classes.meals}>
          <Card>{<ul>{mealsList}</ul>}</Card>
        </section>
      )}
    </>
  )
}

export default AvailableMeals
