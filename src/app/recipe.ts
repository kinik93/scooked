export class Recipe {
    constructor(
      public title: string,
      public imageUrl: string,
      public recipeLink: string,
      public recipeIngredients: string[],
      public recipeDescription: string,
      public recipeHTML: string,
      public recipePriority: number
    ){}
}
