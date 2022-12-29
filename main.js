// Replace YOUR_GPT-3_API_KEY with your actual GPT-3 API key
const GPT_3_API_KEY = "";


///"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";

// Set the base URL for the GPT-3 API
const GPT_3_API_URL = "https://api.openai.com/v1/completions";

// Set the base URL for the Lexica API
const LEXICA_API_URL = "https://lexica.art/api/v1/search";

// Set the list of topics for the elevator pitches
const topics = ["AI technology", "education", "environment", "healthcare", "finance", "trade", "mining", "space exploration", "climate change", "the future of work", "the future of cities", "the future of transportation", "the future of energy", "the future of food", "the future of entertainment", "the future of communication", "the future of medicine", "the future of agriculture", "the future of manufacturing", "the future of retail", "the future of travel", "the future of education", "the future of government", "the future of law", "the future of media", "the future of politics", "the future of religion", "the future of science", "the future of sports", "the future of technology", "the future of transportation", "the future of work", "the future of the world"];

// Function to generate a random slide
async function generateSlide() {
  // Select a random topic from the list
  const randomIndex = Math.floor(Math.random() * topics.length);
  const topic = topics[randomIndex];

  // Generate an elevator pitch using the GPT-3 API
  const pitchResponse = await fetch(GPT_3_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GPT_3_API_KEY}`
    },
    body: JSON.stringify({
      "model": "text-davinci-003",
      "prompt": `Youre a innovative highly intelligent Bot and you Generate elevator pitchs from first principles 
                Write a captivating description of your new product in the field of ${topic}`,
      "max_tokens": 1000
    })
  });
  const pitchData = await pitchResponse.json();
  const pitch = pitchData.choices[0].text;

  // Generate a random image using the Lexica API
  const imageResponse = await fetch(`${LEXICA_API_URL}?q=${topic}`);
  const imageData = await imageResponse.json();
  const images = imageData.images;
  const randomIndex0 = Math.floor(Math.random() * images.length);
  const imageUrl = images[randomIndex0].src;

  // Create a new slide element with the generated content
  const slide = document.createElement("div");
  slide.innerHTML = `
    <h2>Elevator Pitch: ${topic}</h2>
    <p>${pitch}</p>
    <img src="${imageUrl}" alt="Generated Image">
  `;

  return slide;
}

// Function to update the slides every 60 seconds
async function updateSlides()
{
    // Generate a new slide
    const slide = await generateSlide();
  
    // Insert the slide into the page
    const slidesContainer = document.getElementById("slides");
    slidesContainer.innerHTML = "";
    slidesContainer.appendChild(slide);
  
    // Schedule the next update
    setTimeout(updateSlides, 30000);
  }
  
  // Start the slide generation and updating process
  updateSlides();
