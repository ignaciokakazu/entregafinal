// const urlOrigen = 'http://localhost:8080/';

const register = () => {
  const password = document.getElementById('password').value;
  const passwordConfirmation = document.getElementById('passwordConfirmation').value;

  if (password !== passwordConfirmation) {
    alert('password no es igual a su confirmación');
    return;
  }

  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const direction = document.getElementById('direction').value;
  const avatar = document.getElementById('avatar').files[0].name ? document.getElementById('avatar').files[0].name : '';
  const tel = document.getElementById('tel').value;
  const age = document.getElementById('age').value;
  const country = document.getElementById('country').value;

  const params = {
    email,
    name,
    password,
    passwordConfirmation,
    direction,
    avatar,
    tel,
    age,
    country,
  };

  console.log(params);
  // const options = {
  //     method: 'POST',
  //     body: JSON.stringify( params )
  // };
  // console.log(options)
  fetch(urlOrigen + 'api/login/register', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    // window.location.replace(data.url)
    })
    .catch((err) => {
      console.log(err);
    });

  /* .then( response => response.json() )
      .then( response => {
          // Do something with response.
      } ); */
};

const button = document.getElementById('send');
button.addEventListener('click', register);
