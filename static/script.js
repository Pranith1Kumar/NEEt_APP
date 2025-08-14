document.getElementById('predictForm')?.addEventListener('submit', async function(e) {
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const phone = this.phone.value.trim();

  // Name: only letters and spaces, no special characters
  if (!/^[A-Za-z ]+$/.test(name)) {
    alert('Name must contain only letters and spaces.');
    e.preventDefault();
    return false;
  }
  // Email: must contain @ and a dot after @
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert('Please enter a valid email address.');
    e.preventDefault();
    return false;
  }
  // Phone: exactly 10 digits
  if (!/^\d{10}$/.test(phone)) {
    alert('Phone number must be exactly 10 digits.');
    e.preventDefault();
    return false;
  }
  e.preventDefault();
  const form = e.target;
  const recaptchaToken = grecaptcha.getResponse();
  if (!recaptchaToken) return alert("Please complete reCAPTCHA");

  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    rank: form.rank.value,
    category: form.category.value,
    quota: form.quota.value,
    recaptchaToken
  };

  try {
    const res = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const output = document.getElementById("results");
    const result = await res.json();
    output.innerHTML = result.length
      ? result.map(c => `<p><b>${c.College}</b> - ${c.Branch} (${c["Available Seats"]} seats)</p>`).join('')
      : "<p>No eligible colleges found.</p>";
  } catch (err) {
    alert("Error retrieving data. Please try again later.");
  }
});
