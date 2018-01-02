let key = "GVKGcVVeHQMMrVceka";

document.querySelector('input[type="submit"]').addEventListener('click', sendName);

function sendName(e) {
  let name = document.querySelector('input[type="text"]').value;
  if(name === "") {
    document.querySelector('h4.warning').style.display = 'block';
    document.querySelector('h4.output').style.display = 'none';
  }
  else {
    document.querySelector('h4.warning').style.display = 'none';
    document.querySelector('h4.output').style.display = 'none';

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://gender-api.com/get?name=${name}&key=${key}`, true);

    xhr.onload = function() {
      let output = document.querySelector('h4.output');
      if(this.status === 200) {
        let response = JSON.parse(this.response);
        if(response['gender'] == 'male') {
          output.textContent = `${name} - парень с точностью ${response['accuracy']}%.`;
          output.style.display = 'block';
        }
        else if(response['gender'] == 'female') {
          output.textContent = `${name} - девушка с точностью ${response['accuracy']}%.`;
          output.style.display = 'block';
        }
        else {
          output.textContent = "Некорректное имя.";
          output.style.display = 'block';
        }
      }
      else {        
        output.textContent = `Что-то пошло не так...`;
        output.style.display = 'block';
      }
    }

    xhr.send();
  }
  e.preventDefault();
}