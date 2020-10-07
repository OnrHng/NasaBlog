const resultNav =document.getElementById('resultNav');
const favoritesNav =document.getElementById('favoritesNav');
const imagesContainer =  document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 5;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultArray = [];

function updateDom() {
  resultArray.forEach((result) => {
    // Card Contianer
    const card = document.createElement('div');
    card.classList.add('card');
    // Link
    const link =document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';
    // Image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = "NASA Picture of Day";
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    // Card Body
    const cardBody= document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Title
    const cardTitle= document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    // Save Text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    saveText.textContent = 'Add To Favorites';
    // Card Text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;
    // Footer Conatiner
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date
    const date = document.createElement('strong');
    date.textContent = result.date;
    // Copyright
    const copyrightResult = result.copyright === undefined ? '' : result.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightResult}`;

    // Append
    footer.append(date,  copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

// Get ten images from NASA api
async function getNasaPic() {
  try {
    const response =  await fetch(apiUrl);
    resultArray = await response.json();
    updateDom();
  } catch (error) {
    
  }
}

// Onload
getNasaPic();