const IMG_URL =
  "https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/objects/";

export const correctObjects = [
  {
    sentence: "hat eine Sparbüchse.", //"has a piggy bank.",
    img: `${IMG_URL}piggy-bank.jpg`
  },
  {
    sentence: "hat einen Mülleimer.", //"has a trash can.",
    img: `${IMG_URL}trash-can.jpg`
  },
  {
    sentence: "hat ein Seil.", //"has a rope.",
    img: `${IMG_URL}rope.jpg`
  },
  {
    sentence: "hat einen Schlüssel.", //"has a key.",
    img: `${IMG_URL}key.jpg`
  },
  {
    sentence: "hat einen Regenschirm.", //"has an umbrella.",
    img: `${IMG_URL}umbrella.jpg`
  },
  {
    sentence: "hat eine Brille.", //"has glasses.",
    img: `${IMG_URL}glasses.jpg`
  },
  {
    sentence: "hat eine Banane.", //has a banana.",
    img: `${IMG_URL}banana.jpg`
  },
  {
    sentence: "hat einen Taschenrechner.", //"has a calculator.",
    img: `${IMG_URL}calculator.jpg`
  },
  {
    sentence: "hat eine Schere.", //"has scissors.",
    img: `${IMG_URL}scissors.jpg`
  },
  {
    sentence: "hat eine Haarbürste.", //"has a hairbrush.",
    img: `${IMG_URL}hairbrush.jpg`
  },
  {
    sentence: "has a magnifying glass.", 
    img: `${IMG_URL}magnifying-glass.jpg`, 
    correct_response: "a",
  },
  {
    sentence: "hat eine Haarbürste.", //"has a hairbrush.",
    img: `${IMG_URL}hairbrush.jpg`
  },
  { sentence: "hat eine Gitarre.", //"has a guitar.",
    img: `${IMG_URL}guitar.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat Honig.", //"has honey.", 
    img: `${IMG_URL}honey.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat ein Mikrofon.", //has a microphone.", 
    img: `${IMG_URL}microphone.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Hammer.", //has a hammer.", 
    img: `${IMG_URL}hammer.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat Milch.", //has milk.", 
    img: `${IMG_URL}milk.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat ein Ei.", //has an egg.", 
    img: `${IMG_URL}egg.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Hund.", //has a dog.", 
    img: `${IMG_URL}dog.jpg`, 
    correct_response: "a" },
  { 
    sentence: "hat eine Orange.", //has an orange.", 
    img: `${IMG_URL}orange.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat Brot.", //has bread.", 
    img: `${IMG_URL}bread.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat ein Fahrrad.", //has a bicycle.", 
    img: `${IMG_URL}bicycle.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat Kaffee.", //has coffee.", 
    img: `${IMG_URL}coffee.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Ballon.", //has a balloon.", 
    img: `${IMG_URL}balloon.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat eine Pizza.", //has a pizza.", 
    img: `${IMG_URL}pizza.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat eine Ananas.", //has a pineapple.", 
    img: `${IMG_URL}pineapple.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Computer.", //has a computer.", 
    img: `${IMG_URL}screen.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Ball.", //has a ball.", 
    img: `${IMG_URL}ball.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Schmetterling.", //has a butterfly.", 
    img: `${IMG_URL}butterfly.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat Schokolade.", //has chocolate.", 
    img: `${IMG_URL}chocolate.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat eine Münze.", //has a coin.", 
    img: `${IMG_URL}coin.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Bleistift.", //has a pencil.", 
    img: `${IMG_URL}pencil.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Stuhl.", //has a chair.", 
    img: `${IMG_URL}chair.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Gürtel.", //has a belt.", 
    img: `${IMG_URL}belt.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Löffel.", //has a spoon.", 
    img: `${IMG_URL}spoon.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Hut.", //has a hat.", 
    img: `${IMG_URL}hat.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat Käse.", //has cheese.", 
    img: `${IMG_URL}cheese.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Blumentopf.", //has a flowerpot.", 
    img: `${IMG_URL}flowerpot.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Milchshake.", //has a milkshake.", 
    img: `${IMG_URL}milkshake.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat eine Blume.", //has a flower.", 
    img: `${IMG_URL}flower.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat eine Uhr.", //has a watch.", 
    img: `${IMG_URL}watch.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat eine Tomate.", //has a tomato.", 
    img: `${IMG_URL}tomato.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Kürbis.", //has a pumpkin.", 
    img: `${IMG_URL}pumpkin.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Würfel.", //has a dice.", 
    img: `${IMG_URL}dice.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat eine Gießkanne.", //has a watering can.", 
    img: `${IMG_URL}watering-can.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat ein Notizbuch.", //has a notebook.", 
    img: `${IMG_URL}notebook.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat einen Apfel.", //has an apple.", 
    img: `${IMG_URL}apple.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "hat ein Lineal.", //has a ruler.", 
    img: `${IMG_URL}ruler.jpg`, 
    correct_response: "a" 
  },
];

export const incorrectObjects = [
  "hat eine Lampe.", //has a lamp.",
  "hat einen Teppich.", //has a rug.",
  "hat einen Kühlschrank.", //has a fridge.",
  "hat eine Pfanne.", //has a frying pan.",
  "hat ein Kissen.", //has a pillow.",
  "hat einen Käfig.", //has a cage.",
  "hat eine Leiter.", //has a ladder.",
  "hat einen Stock.", //has a cane.",
  "hat eine Flasche.", //has a bottle.",
  "hat einen Ventilator.", //has a fan.",
  "hat einen Koffer.", //has a suitcase.",
  "hat einen Drucker.", //has a printer.",
  "hat eine Geldbörse.", //has a wallet.",
  "hat eine Taschenlampe.", //has a flashlight.",
  "hat eine Krawatte.", //has a tie.",
  "hat ein Bügeleisen.", //has an iron.",
  "hat einen Helm.", //has a helmet.",
  "hat einen Rucksack.", //has a backpack.",
  "hat einen Spiegel.", //has a mirror.",
  "hat einen Hefter.", //has a stapler.",
  "hat ein Schloss.", //has a lock.",
  "hat einen Besen.", //has a broom.",
  "hat ein Auto.", //has a car.",
  "hat eine Schaufel.", //has a shovel.",
  "hat eine Karte.", //has a map.",
];
