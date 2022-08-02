const app_id = "07e96bbe"
const app_key = "80dddfa2f1cf23fa274aae214f6e9398"
const button = document.querySelector("button");
const input = document.querySelector("input");
const loader = document.querySelector("div.loader-container")
const recipeList = document.querySelector('.cards')

// function to show/remove the loader
const loading = (state)=>{
    loader.style = `display: ${state==true? 'block':"none"}`
}

loading(false)

const getRecipe = async (query) => {
  try {
    loading(true)
    const endpoint = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`;
    const response = await fetch(endpoint);
    const {hits} = await response.json();
    console.log(hits)
    if(hits.length===0) window.alert("No recipe found, try searching something earthly")

    hits.map(({recipe})=>{
      console.log(recipe)
      const {image,calories,label,url} = recipe
      const ele = document.createElement('li')
      ele.classList.add('cards_item')
      ele.innerHTML = `
                <div class="card">
                    <div class="card_image"><img src=${image} alt="mixed vegetable salad in a mason jar. " /></div>
                    <div class="card_content">
                        <h2 class="card_title">${label}<span class="orange"> ${calories.toFixed(0)} Cal</span></h2>
                        <h5 class="card_content">Want to Know more about Recipe of ${label}, Click on See more.</h5>
                       
                        <button class="card_btn orange"><a target="_blank" href=${url} >See more +</a></button>
                    </div>
                </div>
            `
      recipeList.appendChild(ele)


    })


    loading(false)
  } catch (error) {
    loading(false)
    console.log(error);
  }
};

const searchRecipe = () => {
  // remove the previous results
  recipeList.innerHTML=null
  const query = input.value;
  getRecipe(query);
};

button.addEventListener("click", searchRecipe);

input.addEventListener('keydown',e=>e.key==='Enter'?searchRecipe():null)

// below h2 card content
/*{ <div class="card_text">
<p>
Dig into the freshest veggies of the season! This salad-in-a-jar features a mixture of leafy greens and seasonal vegetables, fresh from the farmer's market.
</p>
<p>
Served with your choice of dressing on the side: housemade ranch, cherry balsamic vinaigrette, creamy chipotle, avocado green goddess, or honey mustard. Add your choice of protein for $2 more.
</p>
</div> }*/