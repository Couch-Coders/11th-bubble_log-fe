interface HotCoffeeType {
  description: string
  id: number
  image: string
  ingredients: string[]
  title: string
}

type GetHotCoffeesResponseType = HotCoffeeType[]
