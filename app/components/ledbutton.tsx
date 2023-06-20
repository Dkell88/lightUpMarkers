'use client'

const handleColorChange = () => {
  let red = 255, green = 128, blue = 0; // replace with your RGB values
  fetch(`http://ESP_IP_ADDRESS/led/color?r=${red}&g=${green}&b=${blue}`, {method: 'GET'})
    .then(response => console.log(response))
    .catch(error => console.log('error', error));
}

export default function LedButton() {
  return (
    <button onClick={handleColorChange}>Set colour</button>
  );
}