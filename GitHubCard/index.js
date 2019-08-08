/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const followersArray = ["tetondan","dustinmyers","justsml","luishrd","bigknell"];

window.addEventListener("load", function(event) {

  axios.get(`https://api.github.com/users/pusheadmetal`).then((response) => {
    
    let getProfile = createProfile(response);
    document.querySelector(".cards").appendChild(getProfile);

  });

  followersArray.forEach( (item) => {
    axios.get(`https://api.github.com/users/${item}`).then((response) => {
      let getProfile = createProfile(response);
      document.querySelector(".cards").appendChild(getProfile);
    })
  })

  

  function createProfile(response){
    //Create Elements
      let newOutsideDiv = document.createElement("div");
      let newImg = document.createElement("img");
      let newInsideDiv = document.createElement("div");
      let newH3 = document.createElement("h3");
      let p = [];
      for (let i = 0; i < 6; i++){
        p[i] = document.createElement("p");
      }
      let newAnchor = document.createElement("a");
    //Assign Classes
      newOutsideDiv.classList.add("card");
      newInsideDiv.classList.add("card-info");
      newH3.classList.add("name");
      p[0].classList.add("username");
    //Assign Data
      newImg.src = response.data.avatar_url;
      newH3.textContent = response.data.name;
      p[0].textContent = response.data.login;
      if (response.data.location === null){
        p[1].textContent = `Location: Unknown`;
      }else{
        p[1].textContent = `Location: ${response.data.location}`;
      }
      p[2].textContent = `Profile: `;
      p[3].textContent = `Followers: ${response.data.followers}`;
      p[4].textContent = `Following: ${response.data.following}`;
      p[5].textContent = `Bio: ${response.data.bio}`;
      newAnchor.href = response.data.html_url;
      newAnchor.textContent = response.data.html_url;
    //Append
      newInsideDiv.appendChild(newH3);
      p[2].appendChild(newAnchor);
      for (i = 0; i < 6; i++){
        newInsideDiv.appendChild(p[i]);
      }
      newOutsideDiv.appendChild(newImg);
      newOutsideDiv.appendChild(newInsideDiv);
    //Return
      return newOutsideDiv;
  }
  

})
