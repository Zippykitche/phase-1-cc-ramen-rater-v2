// index.js
const PORT = 3000; 
// Callbacks
const handleClick = (ramen) => {
  // Add code
 
    const detailImg = document.querySelector("#ramen-detail > .detail-image");
    const detailName = document.querySelector("#ramen-detail > .name");
    const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
    const detailsRating = document.getElementById("rating-display");
    const detailsComment = document.getElementById("comment-display");
  
    detailImg.src = ramen.image;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailsRating.textContent = ramen.rating;
    detailsComment.textContent = ramen.comment;
 
  
};

const addSubmitListener = () => {
  // Add code
  const ramenForm = document.getElementById('new-ramen');
  ramenForm.addEventListener('submit', handleSubmit);
};

const displayRamens = async () => {
  // Add code
  try {
    const response = await fetch(`http://localhost:${PORT}/ramens`);
    if (!response.ok) throw new Error('Network response was not ok');
    const ramens = await response.json();
    const ramenMenuDiv = document.getElementById('ramen-menu');
    ramenMenuDiv.innerHTML = '';
    ramens.forEach(ramen => {
      const ramenImg = document.createElement('img');
      ramenImg.src = ramen.image;
      ramenImg.alt = ramen.name;
      ramenMenuDiv.appendChild(ramenImg);
      ramenImg.addEventListener('click', () => handleClick(ramen));
    });
  } catch (error) {
    console.error('Fetch error: ', error);
  }
};

const handleSubmit = (event) => {
  event.preventDefault(); 

  const name = document.getElementById('new-name').value;
  const restaurant = document.getElementById('new-restaurant').value;
  const image = document.getElementById('new-image').value;
  const rating = document.getElementById('new-rating').value;
  const comment = document.getElementById('new-comment').value;

  const newRamen = {
    name,
    restaurant,
    image,
    rating,
    comment,
  };

  const ramenMenuDiv = document.getElementById('ramen-menu');
  const ramenImg = document.createElement('img');
  ramenImg.src = newRamen.image;
  ramenImg.alt = newRamen.name;
  ramenMenuDiv.appendChild(ramenImg);
  ramenImg.addEventListener('click', () => handleClick(newRamen));

  event.target.reset();
};


const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
}

document.addEventListener('DOMContentLoaded', () => {
  main();
});

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};