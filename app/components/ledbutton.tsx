'use client'

const handleColorChange = () => {
  let red = 255;
  let green = 128;
  let blue = 0; 
  fetch(`http://192.168.86.101/led/color?r=${red}&g=${green}&b=${blue}`, {method: 'GET'})
    .then(response => response.text())
    .then(text => console.log(text))
    .catch(error => console.log('error', error));
}

const LedButton: React.FC = () => {
  return (
    <button onClick={handleColorChange}>Set colour</button>
  );
}
export default LedButton;