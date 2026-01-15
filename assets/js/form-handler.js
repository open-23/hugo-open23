window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const button = document.getElementById("contact-form-button");
  const status = document.getElementById("contact-form-status");

  if (!form || !button || !status) {
    return;
  }

  const handleSuccess = () => {
    form.reset();
    button.style.display = "none";
    status.innerHTML = "Thanks! Your message has been sent successfully.";
    status.className = 'contact-form-status success';
  };

  const handleError = (errorMsg) => {
    status.innerHTML = `Oops! There was a problem. ${errorMsg || ''}`;
    status.className = 'contact-form-status error';
  };

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        handleSuccess();
      } else {
        const responseData = await response.json();
        if (Object.prototype.hasOwnProperty.call(responseData, 'errors')) {
          handleError(responseData.errors.map(error => error.message).join(", "));
        } else {
          handleError('An unknown error occurred.');
        }
      }
    } catch (error) {
      handleError('Please check your internet connection.');
    }
  });
});
