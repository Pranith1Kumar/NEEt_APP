document.getElementById('predictForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();

  // Validate Name: only letters and spaces
  if (!/^[A-Za-z ]+$/.test(name)) {
    alert('Name must contain only letters and spaces.');
    return false;
  }
  // Validate Email: must contain @ and a dot after @
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }
  // Validate Phone: exactly 10 digits
  if (!/^\d{10}$/.test(phone)) {
    alert('Phone number must be exactly 10 digits.');
    return false;
  }

  // Get other inputs
  const rank = parseInt(form.rank.value, 10);
  const category = form.category.value.toUpperCase();
  const quota = form.quota.value;

  if (isNaN(rank) || rank <= 0) {
    alert('Please enter a valid positive number for rank.');
    return false;
  }
  if (!category) {
    alert('Please select a category.');
    return false;
  }
  if (!quota) {
    alert('Please select a quota.');
    return false;
  }

  // Prepare user details (you might want to store or send this somewhere)
  const userDetails = {
    name, email, phone, rank, category, quota
  };

  try {
    // Fetch cutoff data from static JSON (relative to index.html)
    const response = await fetch('static/cutoffs.json');
    if (!response.ok) throw new Error('Failed to load cutoff data');
    const colleges = await response.json();

    // Filter colleges based on rank, category and quota
    const results = [];
    colleges.forEach(clg => {
      clg.branches.forEach(branch => {
        const cut = branch.cutoffs[quota] || {};
        if (cut[category] && rank <= cut[category]) {
          results.push({
            College: clg.name,
            Branch: branch.name,
            "Available Seats": branch.seats || "N/A"
          });
        }
      });
    });

    // Display results
    const output = document.getElementById('results');
    if (results.length) {
      output.innerHTML = results.map(c => 
        `<p><b>${c.College}</b> - ${c.Branch} (${c["Available Seats"]} seats)</p>`
      ).join('');
    } else {
      output.innerHTML = '<p>No eligible colleges found.</p>';
    }

  } catch (error) {
    alert('Error retrieving data: ' + error.message);
  }
});
