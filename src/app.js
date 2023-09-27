const formValues = document.forms.namedItem("formulario")
    const response = document.querySelector("#response")
    const URL = "http://localhost:4343/verify-token"

    function getDataForSend(e, token) {
      e.preventDefault()

      return data = {
        user: e.target.user.value,
        email: e.target.email.value,
        token: token || ""
      }
    }

    function validateTokenReCaptcha(e, token) {
      const data = getDataForSend(e, token)

      const config = {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      }

      fetch(URL, config)
        .then(result => result.json())
        .then(result => response.innerText = result.message)
    }

    function onClick(e) {
      e.preventDefault();
      grecaptcha.ready(function () {
        grecaptcha.execute('6LcLAFsoAAAAAMHgr0aybFD4zVriKVo-vvSxfWTy', {
          action: 'submit'
        }).then(function (token) {
          validateTokenReCaptcha(e, token)
        });
      });
    }

    formValues.onsubmit = (e) => onClick(e)